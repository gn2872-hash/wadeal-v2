import Link from "next/link";

import { SearchIcon } from "@/components/icons";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-wadeal-line bg-white/95 px-4 pb-3 pt-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <Link
          className="shrink-0 text-[22px] font-black tracking-[-0.02em] text-wadeal-red"
          href="/"
        >
          Wadeal
        </Link>
        <form
          action="/search"
          className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-gray-100 px-3 text-gray-500"
        >
          <SearchIcon className="h-4 w-4 shrink-0" />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-wadeal-ink outline-none placeholder:text-gray-400"
            name="q"
            placeholder="오늘의 공동구매 검색"
            type="search"
          />
        </form>
      </div>
    </header>
  );
}
