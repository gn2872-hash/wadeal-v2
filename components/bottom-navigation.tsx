import { GridIcon, HeartIcon, HomeIcon, SearchIcon, UserIcon } from "@/components/icons";

const navItems = [
  { label: "홈", icon: HomeIcon, active: true },
  { label: "카테고리", icon: GridIcon, active: false },
  { label: "검색", icon: SearchIcon, active: false },
  { label: "찜", icon: HeartIcon, active: false },
  { label: "마이", icon: UserIcon, active: false },
];

export function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-[480px] border-t border-wadeal-line bg-white pb-[max(env(safe-area-inset-bottom),8px)] pt-2">
      <div className="grid grid-cols-5">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            className={`flex min-h-[50px] flex-col items-center justify-center gap-1 text-[11px] font-bold ${
              active ? "text-wadeal-red" : "text-gray-500"
            }`}
            key={label}
            type="button"
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
