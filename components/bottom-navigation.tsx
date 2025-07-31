"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiHome, HiClipboardDocumentList, HiUser } from "react-icons/hi2";

export function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
      icon: HiHome,
    },
    {
      href: "/transactions",
      label: "Transaksi",
      active: pathname === "/transactions",
      icon: HiClipboardDocumentList,
    },
    {
      href: "/profile",
      label: "Profile",
      active: pathname === "/profile",
      icon: HiUser,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                item.active
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
