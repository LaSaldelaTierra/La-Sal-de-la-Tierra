import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminGuard } from "@/components/admin/AdminGuard";

export const metadata: Metadata = {
  title: "Administración",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AuthProvider>
  );
}
