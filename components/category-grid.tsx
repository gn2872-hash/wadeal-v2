const categories = [
  { name: "식품", icon: "🥬" },
  { name: "생활", icon: "🧴" },
  { name: "뷰티", icon: "💄" },
  { name: "육아", icon: "🍼" },
  { name: "반려", icon: "🐾" },
  { name: "패션", icon: "👟" },
  { name: "디지털", icon: "🎧" },
  { name: "전체", icon: "⋯" },
];

export function CategoryGrid() {
  return (
    <section aria-label="카테고리" className="grid grid-cols-4 gap-y-4">
      {categories.map((category) => (
        <button
          className="flex min-h-[70px] flex-col items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-wadeal-ink active:bg-gray-50"
          key={category.name}
          type="button"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 text-[23px]">
            {category.icon}
          </span>
          <span>{category.name}</span>
        </button>
      ))}
    </section>
  );
}
