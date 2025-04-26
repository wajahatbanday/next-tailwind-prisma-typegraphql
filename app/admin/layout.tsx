// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
import { AdminNavbar } from "./components/AdminNavbar";

import AdminProviderLayout from "./AdminLayout";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = cookies();
  // const token = (await cookieStore).get("token");

  // if (!token) {
  //   redirect("/auth");
  // }

  return (
    <div className="w-[100dvw] h-[100dvh] main-bg">
      <div className="w-full h-[8%]">
        <AdminNavbar />
      </div>
      <div className="w-full h-[92%]">
        <AdminProviderLayout>{children}</AdminProviderLayout>
      </div>
    </div>
  );
}
