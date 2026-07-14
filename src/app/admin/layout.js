import AdminSidebar from "@/components/AdminSidebar";

export const metadata = {
  title: "Admin — ConsignDrop",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream">
      <AdminSidebar />
      <div className="lg:pl-64">
        <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </div>
    </div>
  );
}