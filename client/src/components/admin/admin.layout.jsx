import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* ADMIN SIDEBAR */}
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {/* header */}
        <AdminHeader />
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
