# -*- coding: utf-8 -*-
"""
Mitglied/Online tablosundan satırların ONCLICK'lerini toplayıp
/crazy_flirt/view_mykunde.php?id=...&h=... sayfalarına gider.
Profil akışında:
- SADECE GO/LOS: 'Eine Nachricht...' (onclick -> p_postfach.php...) ile yeni mesaj başlatır
                 veya GO/LOS ara sayfasına gidip sonra yine 'Eine Nachricht...' açar
- SADECE CHAT  : Profil sayfasındaki "Chat" butonlarından RASTGELE birini açar ve rastgele mesaj yollar
- İKİSİ DE     : Önce GO/LOS dener; yoksa CHAT’e düşer (profil sayfasındaki Chat butonları)
GO/LOS ve CHAT için ayrı mesaj kutusu kullanılır (karışmaz).
"""

import tkinter as tk
from tkinter import scrolledtext
from tkinter import ttk
import threading, random, time, re
from urllib.parse import urlparse, parse_qs, urljoin, urlunparse

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys


# ------------------ Global Durum ------------------
runner_thread = None
resume_event = threading.Event()

def wait_if_paused():
    while not resume_event.is_set():
        time.sleep(0.15)

def log_ekle(m):
    try:
        log_text.configure(state="normal")
        log_text.insert(tk.END, m + "\n"); log_text.see(tk.END)
        log_text.configure(state="disabled")
    except Exception:
        pass


# ------------------ Host Sabitleme ------------------
def origin_parts_from_url(u: str):
    p = urlparse(u)
    if not p.scheme or not p.netloc:
        raise ValueError("Başlangıç URL'si tam (https://host/...) olmalı!")
    origin = f"{p.scheme}://{p.netloc}"
    return p.scheme, p.netloc, origin

def same_origin_url(target: str, scheme: str, host: str, base: str):
    """target'ı origin'e sabitle. Göreliyse base ile birleştir, farklı host ise REWRITE."""
    if not target:
        return None
    absu = target if target.startswith("http") else urljoin(base, target)
    p = urlparse(absu)
    if p.netloc and p.netloc != host:
        rewritten = urlunparse((scheme, host, p.path, p.params, p.query, p.fragment))
        return rewritten
    return absu


# ------------------ Mesaj Yaz/Gönder ------------------
def fill_and_send_message(driver, text, wait_timeout=14):
    """
    #1 textarea#inhalt'ı bul, odakla, yaz.
    #2 JS fallback: value atayıp input/keyup event'lerini gönder.
    #3 'sendbutton2' (veya alternatif) tıkla.
    #4 Olası JS alert/confirm pencerelerini kapat.
    """
    try:
        # 1) Textarea
        ta = WebDriverWait(driver, wait_timeout).until(
            EC.presence_of_element_located((By.ID, "inhalt"))
        )
        driver.execute_script("arguments[0].scrollIntoView({block:'center'});", ta)
        ta.click()
        time.sleep(0.05)

        # Normal yazım
        try:
            ta.clear()
        except Exception:
            pass
        ta.send_keys(Keys.CONTROL, "a")
        ta.send_keys(text)

        # JS fallback + event dispatch
        driver.execute_script("""
            const ta = arguments[0], val = arguments[1];
            ta.value = val;
            ta.dispatchEvent(new Event('input', {bubbles:true}));
            ta.dispatchEvent(new KeyboardEvent('keyup', {bubbles:true, key:'a'}));
            if (typeof updAvCh !== 'undefined' && updAvCh && updAvCh.update) {
                try { updAvCh.update(); } catch(e){}
            }
        """, ta, text)

        time.sleep(0.05)

        # 2) Gönder butonu
        send_btn = None
        for xp in [
            "//*[@id='sendbutton2']",
            "//*[@id='sendbutton1']",
            "//input[@type='button' and contains(translate(@value,'SENDEN','senden'),'senden')]",
            "//input[@type='submit']",
        ]:
            try:
                send_btn = WebDriverWait(driver, 6).until(
                    EC.element_to_be_clickable((By.XPATH, xp))
                )
                if send_btn:
                    break
            except Exception:
                pass

        if not send_btn:
            return False

        # Bazı sayfalarda yeniden odak işe yarar
        try:
            ta.click()
        except Exception:
            pass

        driver.execute_script("arguments[0].scrollIntoView({block:'center'});", send_btn)
        time.sleep(0.05)
        send_btn.click()

        # 3) Olası alert/confirm
        try:
            WebDriverWait(driver, 2).until(EC.alert_is_present())
            driver.switch_to.alert.accept()
        except Exception:
            pass

        return True

    except Exception as e:
        log_ekle(f"⚠️ fill_and_send_message hatası: {e}")
        return False


# ------------------ Yardımcılar ------------------
def current_profile_id_from_url(driver):
    try:
        u = urlparse(driver.current_url); qs = parse_qs(u.query)
        if "id" in qs and qs["id"]:
            return qs["id"][0]
    except Exception:
        pass
    return None

def open_message_from_profile(driver, scheme, host, base):
    """
    Profil/ara sayfada 'Eine Nachricht ...' butonunu bulur.
    - Onclick içinde p_postfach.php?... linki varsa çıkarır, origin'e sabitleyip /crazy_flirt/ altında GET eder.
    - Onclick yoksa butona tıklar (fallback).
    """
    try:
        btns = driver.find_elements(
            By.XPATH,
            "//input[@type='button' and "
            "(starts-with(@value,'Eine Nachricht') or contains(@value,'Nachricht an'))]"
        )
        for b in btns:
            oc = (b.get_attribute("onclick") or "").strip()
            m = re.search(r"['\"](.*p_postfach\.php\?[^'\"]+)['\"]", oc)
            if m:
                rel = m.group(1)
                target = same_origin_url(rel, scheme, host, base)
                # kesin /crazy_flirt/ altında kullan
                pp = urlparse(target)
                path_last = pp.path.split("/")[-1]
                target = urljoin(base, path_last + ("?" + pp.query if pp.query else ""))
                driver.get(target)
                WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
                log_ekle(f"✉️ Nachricht sayfası açıldı (onclick): {target}")
                return True
            else:
                driver.execute_script("arguments[0].scrollIntoView({block:'center'});", b)
                b.click()
                WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
                log_ekle("✉️ Nachricht sayfası açıldı (click).")
                return True
    except Exception as e:
        log_ekle(f"⚠️ Nachricht açma hatası: {e}")
    return False

def go_via_onclick_url(driver, scheme, host, base, log=True):
    """
    GO/LOS/GİT: onclick içinden URL'yi çıkar, origin'e sabitle, driver.get ile git.
    Sonrasında profil/ara sayfada kalınır (mesaj açma ayrı fonksiyonla yapılır).
    """
    expected_id = current_profile_id_from_url(driver)
    candidates = driver.find_elements(By.XPATH, "//input[@type='button' and contains(@onclick,'p_profil.php')]")

    prioritized, fallback = [], []
    for el in candidates:
        oc = (el.get_attribute("onclick") or "")
        if expected_id and f"id={expected_id}" in oc:
            prioritized.append(el)
        else:
            fallback.append(el)
    ordered = prioritized + fallback

    for el in ordered:
        oc = el.get_attribute("onclick") or ""
        m = re.search(r"href\s*=\s*['\"]([^'\"]+)['\"]", oc) \
            or re.search(r"location\.href\s*=\s*['\"]([^'\"]+)['\"]", oc) \
            or re.search(r"location\s*=\s*['\"]([^'\"]+)['\"]", oc)
        if not m: continue

        raw = m.group(1)
        target = same_origin_url(raw, scheme, host, base)
        if target is None: continue

        # güvence: kesin aynı host
        p = urlparse(target)
        if p.netloc != host:
            target = urlunparse((scheme, host, p.path, '', p.query, ''))

        try:
            driver.get(target)
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
            if log: log_ekle(f"➡️ GO/LOS sayfasına geçildi: {target}")
            return True
        except Exception:
            continue

    return False


# ------------------ Online Tablosundan ONCLICK -> Profil Linkleri ------------------
def collect_profile_links_from_online_table(driver, scheme, host, base):
    """
    Online listedeki <tr onclick="window.location.href='view_mykunde.php?id=...&h=...'"> satırlarını bulur,
    onclick'teki linki çıkarır ve kesin olarak /crazy_flirt/view_mykkunde.php?... formatına çevirir.
    """
    links = []
    try:
        rows = driver.find_elements(By.XPATH, "//tr[contains(@onclick,'view_mykunde.php')]")
        for r in rows:
            oc = r.get_attribute("onclick") or ""
            m = re.search(r"['\"](.*view_mykunde\.php\?[^'\"]+)['\"]", oc)
            if not m:
                continue
            raw = m.group(1)

            # absolute yap ve origin'e sabitle
            prof_url = same_origin_url(raw, scheme, host, base)
            # kesinlikle /crazy_flirt/ altında kullan
            pp = urlparse(prof_url)
            if "/crazy_flirt/" not in pp.path:
                fixed_path = "/crazy_flirt/" + pp.path.split("/")[-1]
            else:
                fixed_path = pp.path
            prof_url = urlunparse((pp.scheme, pp.netloc, fixed_path, '', pp.query, ''))

            links.append(prof_url)

        # yinelenenleri sırayı koruyarak temizle
        links = list(dict.fromkeys(links))
    except Exception as e:
        log_ekle(f"⚠️ Online tablodan link toplarken hata: {e}")
    return links


# ------------------ (Fallback) Eski yöntemle ID toplama ------------------
def collect_ids_from_mitglied(driver):
    ids = []
    try:
        table = driver.find_element(By.XPATH, "//table[.//b[normalize-space()='Mitglied']]")
        header_td = table.find_element(By.XPATH, ".//b[normalize-space()='Mitglied']/ancestor::td[1]")
        col_index_0 = driver.execute_script("return arguments[0].cellIndex;", header_td) or 0
        col_index_1 = int(col_index_0) + 1

        rows = table.find_elements(By.XPATH, ".//tr[position()>1]")
        for r in rows:
            try:
                td = r.find_element(By.XPATH, f"./td[count(preceding-sibling::td) = {col_index_1 - 1}]")
            except Exception:
                continue

            links = td.find_elements(By.XPATH, ".//a[@href]")
            for a in links:
                href = a.get_attribute("href") or ""
                m = re.search(r"view_mykunde\.php\?id=(\d+)", href) or \
                    re.search(r"p_profil\.php\?p=(\d+)", href) or \
                    re.search(r"[?&]id=(\d+)", href)
                if m: ids.append(m.group(1))

            oc = r.get_attribute("onclick") or ""
            m = re.search(r"view_mykunde\.php\?id=(\d+)", oc) or re.search(r"[?&]id=(\d+)", oc)
            if m: ids.append(m.group(1))

        ids = list(dict.fromkeys(ids))
    except Exception as e:
        log_ekle(f"⚠️ Mitglied sütunu taranırken hata: {e}")
    return ids


# ------------------ Ana İş Parçası ------------------
def worker():
    resume_event.set()
    start_url = starturl_entry.get().strip()
    email = email_entry.get().strip()
    password = password_entry.get().strip()
    phpsessid = phpsessid_entry.get().strip()

    mode = mode_var.get()  # "GOLOS", "CHAT", "BOTH"

    golos_msgs = [ln.strip() for ln in golos_text.get("1.0", "end").splitlines() if ln.strip()]
    chat_msgs  = [ln.strip() for ln in chat_text.get("1.0", "end").splitlines() if ln.strip()]
    foto_ekle = foto_var.get()

    if not start_url:
        log_ekle("⚠️ Başlangıç URL'si zorunlu! (Mitglied/Online tablosunun olduğu sayfayı girin)")
        return

    # Mesaj listesi validasyonu
    if mode == "GOLOS" and not golos_msgs:
        log_ekle("⚠️ SADECE GO/LOS modunda 'GO/LOS Kalıpları' boş olamaz."); return
    if mode == "CHAT" and not chat_msgs:
        log_ekle("⚠️ SADECE CHAT modunda 'CHAT Kalıpları' boş olamaz."); return
    if mode == "BOTH" and (not golos_msgs or not chat_msgs):
        log_ekle("⚠️ İKİSİ DE modunda her iki mesaj kutusu da dolu olmalı."); return

    while True:
        try:
            try:
                scheme, host, origin = origin_parts_from_url(start_url)
            except Exception as e:
                log_ekle(f"❌ Başlangıç URL hatalı: {e}"); break

            base = f"{origin}/crazy_flirt/"
            browser = None
            msg_count = 0

            try:
                log_ekle(f"🌐 Origin sabitlendi: {origin}")
                options = Options()
                options.add_argument("--disable-gpu")
                options.add_argument("--no-sandbox")
                options.add_argument("--disable-dev-shm-usage")
                browser = webdriver.Chrome(options=options)
                wait = WebDriverWait(browser, 12)

                # --- GİRİŞ ---
                if phpsessid:
                    browser.get(origin)
                    wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
                    browser.delete_all_cookies()
                    browser.add_cookie({"name": "PHPSESSID", "value": phpsessid})
                    log_ekle("🍪 PHPSESSID cookie eklendi.")
                else:
                    if not email or not password:
                        log_ekle("⚠️ E-posta/Şifre veya PHPSESSID girilmelidir!"); break
                    login_url = f"{base}login.php"
                    log_ekle(f"🔐 Giriş sayfası: {login_url}")
                    browser.get(login_url)
                    wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
                    wait.until(EC.presence_of_element_located((By.NAME, "email")))
                    browser.find_element(By.NAME, "email").send_keys(email)
                    browser.find_element(By.XPATH, "//input[@type='password']").send_keys(password)
                    submit = browser.find_element(By.XPATH, "//input[@type='submit' or @type='button' or @value='Login' or @value='Einloggen']")
                    submit.click()
                    wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
                    log_ekle("✅ Giriş başarılı.")

                # --- BAŞLANGIÇ SAYFASI ---
                log_ekle(f"📄 Başlangıç URL açılıyor: {start_url}")
                browser.get(start_url)
                wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
                time.sleep(0.6)

                # --- PROFİL LİNKLERİ ---
                prof_links = collect_profile_links_from_online_table(browser, scheme, host, base)
                if not prof_links:
                    log_ekle("⚠️ Online listedeki onclick linkleri bulunamadı. Eski yöntemle ID toplamayı deniyorum...")
                    ids = collect_ids_from_mitglied(browser)
                    if ids:
                        prof_links = [urljoin(base, f"view_mykunde.php?id={pid}") for pid in ids]
                    else:
                        log_ekle("❌ Hiçbir profil referansı bulunamadı."); break

                log_ekle(f"🔎 Toplanan profil sayısı: {len(prof_links)}")

                # --- PROFİL DÖNGÜSÜ ---
                for i, prof_url in enumerate(prof_links, start=1):
                    wait_if_paused()
                    try:
                        log_ekle(f"[{i}/{len(prof_links)}] Profil: {prof_url}")
                        browser.get(prof_url)
                        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))

                        path_used = None
                        if mode == "GOLOS":
                            if open_message_from_profile(browser, scheme, host, base):
                                path_used = "GOLOS"
                            else:
                                if go_via_onclick_url(browser, scheme, host, base) and \
                                   open_message_from_profile(browser, scheme, host, base):
                                    path_used = "GOLOS"
                                else:
                                    log_ekle("⚠️ Mesaj sayfası açılamadı, atlanıyor.")
                                    continue
                        elif mode == "CHAT":
                            chat_buttons = browser.find_elements(By.XPATH, "//input[@type='button' and normalize-space(@value)='Chat']")
                            if not chat_buttons:
                                log_ekle("⚠ Chat butonu bulunamadı, atlanıyor.")
                                continue
                            btn = random.choice(chat_buttons)
                            browser.execute_script("arguments[0].scrollIntoView({block:'center'});", btn)
                            btn.click()
                            wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
                            path_used = "CHAT"
                        else: # BOTH
                            if open_message_from_profile(browser, scheme, host, base):
                                path_used = "GOLOS"
                            else:
                                chat_buttons = browser.find_elements(By.XPATH, "//input[@type='button' and normalize-space(@value)='Chat']")
                                if chat_buttons:
                                    btn = random.choice(chat_buttons)
                                    browser.execute_script("arguments[0].scrollIntoView({block:'center'});", btn)
                                    btn.click()
                                    wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
                                    path_used = "CHAT"
                                else:
                                    log_ekle("⚠️ Hiçbir iletişim yolu bulunamadı, atlanıyor.")
                                    continue

                        msg = random.choice(golos_msgs if path_used == "GOLOS" else chat_msgs)
                        if fill_and_send_message(browser, msg):
                            msg_count += 1
                            log_ekle(f"✅ [{path_used}] Gönderildi: {msg[:40]}...")
                        
                        if foto_ekle == "Evet":
                            # (Fotoğraf mantığı aynı kalabilir veya basitleştirilebilir)
                            pass

                        time.sleep(1)
                    except Exception as e:
                        log_ekle(f"⚠️ Profil hatası: {e}")

                log_ekle("🏁 Tur tamamlandı.")
            except Exception as e:
                log_ekle(f"❌ Hata: {e}")
            finally:
                if browser: browser.quit()
                log_ekle("🔒 Tarayıcı kapatıldı.")

            if not loop_var.get():
                break

            log_ekle("💤 8 saat bekleniyor (Tekrar modu aktif)...")
            # 8 saat beklerken durdur/tekrar kapatılmasını kontrol et
            for _ in range(8 * 60): # 8 saat, 1 dakika aralıklarla kontrol
                if not loop_var.get(): break
                wait_if_paused()
                time.sleep(60)
            
            if not loop_var.get(): break
            log_ekle("🔄 Yeni tur başlıyor...")

        except Exception as e:
            log_ekle(f"❌ Kritik hata: {e}")
            break


# ------------------ UI ------------------
def ui_baslat():
    global runner_thread
    if runner_thread and runner_thread.is_alive():
        log_ekle("ℹ️ Zaten çalışıyor. 'Durdur'/'Devam Et' kullanın."); return
    log_ekle("🚀 Başlatılıyor...")
    resume_event.set()
    runner_thread = threading.Thread(target=worker, daemon=True)
    runner_thread.start()

def ui_durdur():
    resume_event.clear(); log_ekle("⏸️ Duraklatıldı.")

def ui_devam():
    if not (runner_thread and runner_thread.is_alive()):
        log_ekle("ℹ️ Henüz başlatılmadı veya tamamlandı. Önce 'Başlat'."); return
    resume_event.set(); log_ekle("▶️ Devam ediyor...")


# ---- Tk/ttk (hafif modern görünüm) ----
root = tk.Tk()
root.title("Mitglied (Sabit Host) – Onclick Toplayıcı & Mesaj Gönderici")

# Tema
style = ttk.Style()
try:
    style.theme_use("clam")
except Exception:
    pass

style.configure("TLabel", font=("Segoe UI", 10))
style.configure("TButton", font=("Segoe UI", 10, "bold"), padding=6)
style.configure("TRadiobutton", font=("Segoe UI", 10))
style.configure("Card.TFrame", relief="groove", borderwidth=1)
style.configure("Header.TLabel", font=("Segoe UI Semibold", 11))
style.configure("Title.TLabel", font=("Segoe UI", 11, "bold"))

container = ttk.Frame(root, padding=10)
container.pack(fill="both", expand=True)

frm_top = ttk.Frame(container)
frm_top.pack(fill="x", pady=(0,8))

ttk.Label(frm_top, text="Başlangıç URL (Online/Mitglied tablosu olan sayfa):", style="Title.TLabel").grid(row=0, column=0, sticky="w")
starturl_entry = ttk.Entry(frm_top, width=80); starturl_entry.grid(row=0, column=1, sticky="we", padx=(6,0))
frm_top.columnconfigure(1, weight=1)

ttk.Label(frm_top, text="Kullanıcı Adı:").grid(row=1, column=0, sticky="w", pady=(6,0))
email_entry = ttk.Entry(frm_top, width=40); email_entry.grid(row=1, column=1, sticky="w", pady=(6,0))

ttk.Label(frm_top, text="Şifre:").grid(row=2, column=0, sticky="w", pady=(6,0))
password_entry = ttk.Entry(frm_top, show="*", width=40); password_entry.grid(row=2, column=1, sticky="w", pady=(6,0))

ttk.Label(frm_top, text="PHPSESSID (opsiyonel):").grid(row=3, column=0, sticky="w", pady=(6,0))
phpsessid_entry = ttk.Entry(frm_top, width=40); phpsessid_entry.grid(row=3, column=1, sticky="w", pady=(6,0))

# ---- Mod seçimi
frm_mode = ttk.LabelFrame(container, text="Çalışma Modu (Zorunlu)", padding=8)
frm_mode.pack(fill="x", pady=(0,8))
mode_var = tk.StringVar(value="GOLOS")
ttk.Radiobutton(frm_mode, text="SADECE GO/LOS", variable=mode_var, value="GOLOS").grid(row=0, column=0, padx=8, pady=2, sticky="w")
ttk.Radiobutton(frm_mode, text="SADECE CHAT",   variable=mode_var, value="CHAT").grid(row=0, column=1, padx=8, pady=2, sticky="w")
ttk.Radiobutton(frm_mode, text="İKİSİ DE",      variable=mode_var, value="BOTH").grid(row=0, column=2, padx=8, pady=2, sticky="w")

# ---- Mesaj kutuları
frm_msg = ttk.Frame(container)
frm_msg.pack(fill="both", expand=True, pady=(0,8))

left = ttk.LabelFrame(frm_msg, text="GO/LOS Kalıpları (her satır bir mesaj)", padding=6)
left.pack(side="left", fill="both", expand=True, padx=(0,6))
right = ttk.LabelFrame(frm_msg, text="CHAT Kalıpları (her satır bir mesaj)", padding=6)
right.pack(side="left", fill="both", expand=True, padx=(6,0))

golos_text = scrolledtext.ScrolledText(left, width=48, height=8, font=("Consolas", 10))
golos_text.pack(fill="both", expand=True)
golos_text.insert("1.0", "Merhaba 😊\nSelam, nasılsın?\nBu akşam uygun musun?")

chat_text = scrolledtext.ScrolledText(right, width=48, height=8, font=("Consolas", 10))
chat_text.pack(fill="both", expand=True)
chat_text.insert("1.0", "Hey 😊\nNasılsın?\nŞu an yazışmaya açık mısın?")

# ---- Seçenekler
frm_opts = ttk.LabelFrame(container, text="Seçenekler", padding=8)
frm_opts.pack(fill="x", pady=(0,8))
ttk.Label(frm_opts, text="Fotoğraf eklemek ister misiniz?").grid(row=0, column=0, sticky="w")
foto_var = tk.StringVar(value="Hayır")
ttk.Radiobutton(frm_opts, text="Evet", variable=foto_var, value="Evet").grid(row=0, column=1, padx=6)
ttk.Radiobutton(frm_opts, text="Hayır", variable=foto_var, value="Hayır").grid(row=0, column=2, padx=6)

loop_var = tk.BooleanVar(value=False)
ttk.Checkbutton(frm_opts, text="8 Saatte Bir Tekrarla", variable=loop_var).grid(row=0, column=3, padx=20)

# ---- Çalıştırma
frm_run = ttk.Frame(container)
frm_run.pack(fill="both", expand=True)

btn_start = ttk.Button(frm_run, text="▶ Başlat", command=ui_baslat)
btn_pause = ttk.Button(frm_run, text="⏸ Durdur", command=ui_durdur)
btn_resume = ttk.Button(frm_run, text="⏵ Devam Et", command=ui_devam)
btn_start.pack(side="left", padx=4, pady=4)
btn_pause.pack(side="left", padx=4, pady=4)
btn_resume.pack(side="left", padx=4, pady=4)

log_frame = ttk.LabelFrame(frm_run, text="Kayıtlar", padding=6)
log_frame.pack(fill="both", expand=True, padx=(8,0), pady=4)
log_text = scrolledtext.ScrolledText(log_frame, width=110, height=18, font=("Consolas", 10), state="disabled")
log_text.pack(fill="both", expand=True)

root.mainloop()




