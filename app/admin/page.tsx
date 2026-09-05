import AdminShell from "@/components/admin/AdminShell";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return <AdminShell />;
}
