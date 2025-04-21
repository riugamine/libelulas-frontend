import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      {/* Main content */}
      <div className="md:pl-64 pt-16 md:pt-0">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}