import type { RankingEntry } from "../hooks/useLeagueData";

interface RankingListProps {
  readonly ranking: ReadonlyArray<RankingEntry>;
}

export const RankingList = ({ ranking }: RankingListProps) => {
  if (ranking.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-black/50">
        Add players and record a match to see the live table.
      </p>
    );
  }

  return (
    <ol className="divide-y divide-black/5">
      {ranking.map((entry, index) => (
        <li key={entry.player.id} className="flex items-center gap-4 py-4 first:pt-0">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded border border-black/20 bg-black/5 font-mono text-sm font-medium text-black">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-medium text-black">
              {entry.player.name}
            </p>
            <p className="mt-0.5 text-xs text-black/50">
              {entry.matchCount} matches • Start {entry.player.initialRating.toFixed(1)}
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="font-mono text-lg font-medium text-black">
              {entry.rating.toFixed(1)}
            </p>
            <p className={`font-mono text-xs ${entry.delta > 0 ? "text-[#F7931A]" : "text-black/50"}`}>
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
