import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { HiChevronUpDown } from "react-icons/hi2";
import { LuFilter, LuStar, LuRotateCcw } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface FilterProps {
  /** Called after a successful Apply (e.g. to close the mobile sheet). */
  onApply?: () => void;
}

/** URL / API genre (lowercase matches Prisma seed and queries) */
const GENRES: { label: string; value: string }[] = [
  { label: "All genres", value: "" },
  { label: "Science", value: "science" },
  { label: "History", value: "history" },
  { label: "Programming", value: "programming" },
  { label: "Religion", value: "religion" },
  { label: "Fiction", value: "fiction" },
];

const SORT_OPTIONS: { label: string; value: string }[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to high", value: "priceAsc" },
  { label: "Price: High to low", value: "priceDesc" },
  { label: "Rating", value: "ratingDesc" },
];

const PRICE_SLIDER_MAX = 500;

function sortLabelFromParam(param: string | null): string {
  const found = SORT_OPTIONS.find((o) => o.value === param);
  return found?.label ?? "Newest";
}

function genreLabelFromParam(param: string | null): string {
  if (!param) return "All genres";
  const found = GENRES.find(
    (g) => g.value.toLowerCase() === param.toLowerCase()
  );
  return found?.label ?? param;
}

const Filter = ({ onApply }: FilterProps = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genreValue, setGenreValue] = useState("");
  const [sortValue, setSortValue] = useState("newest");
  const [maxPrice, setMaxPrice] = useState(150);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const g = searchParams.get("genre") ?? "";
    setGenreValue(g);
    setSortValue(searchParams.get("sort") ?? "newest");
    const mp = searchParams.get("maxPrice");
    const mpNum = mp != null && mp !== "" ? Number(mp) : NaN;
    setMaxPrice(Number.isFinite(mpNum) ? mpNum : 150);
    const mr = searchParams.get("minRating");
    const mrNum = mr != null && mr !== "" ? Number(mr) : NaN;
    setMinRating(Number.isFinite(mrNum) ? mrNum : 0);
  }, [searchParams]);

  const applyFilter = () => {
    const next = new URLSearchParams();
    if (sortValue && sortValue !== "newest") next.set("sort", sortValue);
    if (genreValue) next.set("genre", genreValue);
    if (maxPrice < PRICE_SLIDER_MAX) next.set("maxPrice", String(maxPrice));
    if (minRating > 0) next.set("minRating", String(minRating));
    setSearchParams(next);
    onApply?.();
  };

  const resetFilter = () => {
    setGenreValue("");
    setSortValue("newest");
    setMaxPrice(150);
    setMinRating(0);
    setSearchParams({});
  };

  const hasActiveFilters =
    Boolean(genreValue) ||
    sortValue !== "newest" ||
    maxPrice < PRICE_SLIDER_MAX ||
    minRating > 0;

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <LuFilter size={20} />
          <span className="text-xl">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilter}
            className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800"
          >
            <LuRotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold text-foreground">Sort by</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-10 w-full items-center justify-between rounded-md border border-gray-200 px-3 text-sm hover:border-amber-300 cursor-pointer">
            {sortLabelFromParam(sortValue)}
            <HiChevronUpDown className="h-4 w-4 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
            {SORT_OPTIONS.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => setSortValue(opt.value)}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold text-foreground">Genre</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-10 w-full items-center justify-between rounded-md border border-gray-200 px-3 text-sm hover:border-amber-300 cursor-pointer">
            {genreLabelFromParam(genreValue)}
            <HiChevronUpDown className="h-4 w-4 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
            {GENRES.map((g) => (
              <DropdownMenuItem
                key={g.label}
                onClick={() => setGenreValue(g.value)}
              >
                {g.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold text-foreground">Price range</h2>
        <div className="flex flex-col gap-2 rounded-lg border border-primary/25 bg-primary/5 p-3 ring-1 ring-inset ring-primary/10">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium uppercase tracking-wide text-primary/80">
              Max price
            </span>
            <output
              htmlFor="filter-max-price"
              className="tabular-nums text-xl font-bold leading-none text-primary"
            >
              ${maxPrice}
            </output>
          </div>
          <Slider
            id="filter-max-price"
            value={[maxPrice]}
            onValueChange={(value) => setMaxPrice(value[0])}
            max={PRICE_SLIDER_MAX}
            step={10}
            className="cursor-pointer py-1 [&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:border-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="tabular-nums">$0</span>
            <span className="tabular-nums">${PRICE_SLIDER_MAX}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold text-foreground">
          Minimum rating
        </h2>
        <div className="flex flex-col gap-2 rounded-lg border border-primary/25 bg-primary/5 p-3 ring-1 ring-inset ring-primary/10">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium uppercase tracking-wide text-primary/80">
              {minRating === 0 ? "No minimum" : "At least"}
            </span>
            <output
              htmlFor="filter-min-rating"
              className="flex items-center gap-1 tabular-nums text-xl font-bold leading-none text-primary"
            >
              {minRating === 0 ? (
                <span className="text-base font-semibold">Any</span>
              ) : (
                <>
                  <span>{minRating}</span>
                  <LuStar
                    className="size-5 shrink-0 fill-primary text-primary"
                    aria-hidden
                  />
                  <span className="text-sm font-medium text-primary/80">
                    / 5
                  </span>
                </>
              )}
            </output>
          </div>
          <Slider
            id="filter-min-rating"
            value={[minRating]}
            onValueChange={(value) => setMinRating(value[0])}
            max={5}
            step={1}
            className="cursor-pointer py-1 [&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:border-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Any</span>
            <span>5 stars</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Button
          type="button"
          className="h-10 w-full cursor-pointer bg-amber-500 font-semibold text-white hover:bg-amber-600"
          onClick={applyFilter}
        >
          Apply Filters
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-10 w-full cursor-pointer"
          onClick={resetFilter}
          disabled={!hasActiveFilters}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Filter;
