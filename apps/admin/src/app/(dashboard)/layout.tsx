import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* <Sidebar /> */}

      <div>
        <Header />

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
