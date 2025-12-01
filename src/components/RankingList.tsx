import clsx from "clsx";

import type { RankingEntry } from "../hooks/useLeagueData";

interface RankingListProps {
  readonly ranking: ReadonlyArray<RankingEntry>;
}

export const RankingList = ({ ranking }: RankingListProps) => {
  if (ranking.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-400 bg-zinc-100 px-4 py-6 text-center text-sm text-zinc-600">
        Add players and record a match to see the live table.
      </p>
    );
  }

  return (
    <ol className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white shadow-sm">
      {ranking.map((entry, index) => (
        <li key={entry.player.id} className="flex items-center gap-4 px-4 py-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-600">
            {index + 1}
          </span>
          <div className="flex-1">
            <p className="text-base font-semibold text-zinc-900">
              {entry.player.name}
            </p>
            <p className="text-xs text-zinc-500">
              {entry.matchCount} matches • Start {entry.player.initialRating.toFixed(1)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-lg font-semibold text-zinc-900">
              {entry.rating.toFixed(1)}
            </p>
            <p
              className={clsx(
                "font-mono text-sm",
                entry.delta > 0
                  ? "text-emerald-600"
                  : entry.delta < 0
                    ? "text-rose-600"
                    : "text-zinc-500",
              )}
            >
              {formatDelta(entry.delta)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
};

const formatDelta = (delta: number): string => {
  if (Number.isNaN(delta) || delta === 0) return "±0.0";
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta.toFixed(1)}`;
};
