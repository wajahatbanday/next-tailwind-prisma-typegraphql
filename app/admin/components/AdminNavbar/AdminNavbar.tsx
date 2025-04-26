"use client";
import { Icon } from "@/components";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminNavbarLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "dashboard",
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: "user",
  },
];

export const AdminNavbar = () => {
  const pathname = usePathname();

  const getActiveRoute = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="glass p-2 rounded-sm gap-4 flex flex-row justify-center items-center">
        {AdminNavbarLinks.map((l, i) => {
          const isActiveRoute = getActiveRoute(l.href);
          return (
            <div
              key={i}
              className={`flex flex-row gap-2 rounded-sm justify-center items-center px-2 font-montserratRegular ${
                isActiveRoute ? "bg-white text-primary" : "text-white"
              }`}
            >
              <Link
                href={l.href}
                className="text-lg flex flex-row gap-2 justify-center items-center"
              >
                <Icon
                  name={l.icon}
                  className={`${isActiveRoute ? "text-primary" : "text-white"}`}
                />
                {l.label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
