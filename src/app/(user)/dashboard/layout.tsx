import { auth } from "@/auth";

import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  const user = session.user as any;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-black">
      {/* Sidebar - Side-by-side flex item */}
      <Sidebar user={user} />

      {/* Main Content Area - Flex Grow */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden relative min-w-0">
           {/* Header */}
           <Header />

           {/* Content Wrapper */}
           <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
             <div className="max-w-[1400px] mx-auto">
               {children}
             </div>
           </main>
      </div>
    </div>
  );
}
