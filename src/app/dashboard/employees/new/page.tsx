"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createEmployee } from "@/app/actions/employees";

export default function NewEmployeePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tcNo: "",
    email: "",
    phone: "",
    position: "",
    branchId: "",
    departmentId: "",
    startDate: "",
  });

  useEffect(() => {
    async function fetchBranches() {
      const res = await fetch("/api/branches");
      if (res.ok) {
        const data = await res.json();
        setBranches(data);
        // Automatically set departments for first branch if available
        if (data.length > 0) {
          setDepartments(data[0].departments);
        }
      }
    }
    fetchBranches();
  }, []);

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const branchId = e.target.value;
    const branch = branches.find(b => b.id === branchId);
    setFormData({ ...formData, branchId, departmentId: "" });
    setDepartments(branch?.departments || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!formData.branchId || !formData.departmentId) {
        alert("Lütfen şube ve departman seçiniz");
        return;
      }

      await createEmployee(formData);
      router.push("/dashboard/employees");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Çalışan kaydedilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/employees" className="btn btn-outline" style={{ padding: "0.5rem" }}>
          <ArrowLeft size={20} />
        </Link>
        <h2 style={{ marginBottom: 0 }}>Yeni Çalışan Kaydı</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <div className="glass-card">
            <h3 style={{ marginBottom: "1.5rem" }}>Kişisel Bilgiler</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Ad</label>
                <input type="text" name="firstName" className="input" placeholder="Örn: Ahmet" required onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Soyad</label>
                <input type="text" name="lastName" className="input" placeholder="Örn: Yılmaz" required onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>TC Kimlik No</label>
                <input type="text" name="tcNo" className="input" placeholder="11 haneli TC No" maxLength={11} onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>E-posta</label>
                <input type="email" name="email" className="input" placeholder="ahmet@sirket.com" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ marginBottom: "1.5rem" }}>Görev ve Lokasyon</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Şube</label>
                <select name="branchId" className="input" required onChange={handleBranchChange} value={formData.branchId}>
                  <option value="">Seçiniz</option>
                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Departman</label>
                <select name="departmentId" className="input" required onChange={handleChange} value={formData.departmentId}>
                  <option value="">Seçiniz</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Görev / Unvan</label>
                <input type="text" name="position" className="input" placeholder="Örn: Forklift Operatörü" onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>İşe Giriş Tarihi</label>
                <input type="date" name="startDate" className="input" onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card">
             <h3 style={{ marginBottom: "1.5rem" }}>Kaydet</h3>
             <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
                <Save size={20} />
                {loading ? "Kaydediliyor..." : "Çalışanı Kaydet"}
             </button>
          </div>
        </div>
      </form>
    </div>
  );
}
