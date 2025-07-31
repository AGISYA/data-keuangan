import type React from "react";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-gray-800 bg-gray-50">
      <div className="pb-20">{children}</div>
      <BottomNavigation />
    </div>
  );
}
