"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { GridIcon, HeartIcon, HomeIcon, SearchIcon, UserIcon } from "@/components/icons";

const navItems = [
  { label: "홈", icon: HomeIcon, href: "/", match: "/" },
  { label: "카테고리", icon: GridIcon, href: "/categories", match: "/categor" },
  { label: "검색", icon: SearchIcon, href: "/search", match: "/search" },
  { label: "찜", icon: HeartIcon, href: "/favorites", match: "/favorites" },
  { label: "마이", icon: UserIcon, href: "/my", match: "/my" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-[480px] border-t border-wadeal-line bg-white pb-[max(env(safe-area-inset-bottom),8px)] pt-2">
      <div className="grid grid-cols-5">
        {navItems.map(({ label, icon: Icon, href, match }) => {
          const active = match === "/" ? pathname === "/" : pathname.startsWith(match);

          return (
            <Link
              className={`flex min-h-[50px] flex-col items-center justify-center gap-1 text-[11px] font-bold ${
                active ? "text-wadeal-red" : "text-gray-500"
              }`}
              href={href}
              key={label}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
