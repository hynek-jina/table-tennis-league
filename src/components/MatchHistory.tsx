import * as Evolu from "@evolu/common";
import { IconTrash } from "@tabler/icons-react";

import { formatTypeError, useEvolu } from "../evolu/client";
import type { MatchSummary } from "../hooks/useLeagueData";

interface MatchHistoryProps {
  readonly matches: ReadonlyArray<MatchSummary>;
}

export const MatchHistory = ({ matches }: MatchHistoryProps) => {
  const { update } = useEvolu();

  if (matches.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-black/50">
        Every match you record appears here with the STR rating changes.
      </p>
    );
  }

  const reversed = [...matches].sort((a, b) =>
    b.match.playedAt.localeCompare(a.match.playedAt),
  );

  const handleDelete = (matchId: string) => {
    const confirmed = window.confirm(
      "Delete this match? This will also revert rating calculations based on it.",
    );
    if (!confirmed) return;

    const result = update("match", {
      id: matchId,
      isDeleted: Evolu.sqliteTrue,
    });

    if (!result.ok) {
      alert(formatTypeError(result.error));
    }
  };

  return (
    <ol className="divide-y divide-black/5">
      {reversed.map((entry) => {
        const { match, players, delta, ratingAfter } = entry;
        const winner = players.a?.id === match.winnerId ? players.a : players.b;
        const loser = winner && winner.id === players.a?.id ? players.b : players.a;

        return (
          <li key={match.id} className="py-5 first:pt-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-black/50">
                  {new Date(match.playedAt).toLocaleString()}
                </p>
                <p className="mt-2 text-base font-medium text-black">
                  {winner?.name ?? "Winner"}
                  <span className="ml-2 text-sm font-normal text-black/60">
                    defeated {loser?.name ?? "Opponent"}
                  </span>
                </p>
              </div>
              <button
                className="flex-shrink-0 p-2 text-black/30 transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A]/50"
                onClick={() => handleDelete(match.id)}
                title="Delete match"
                type="button"
              >
                <IconTrash className="h-4 w-4" />
              </button>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded border border-black/10 bg-black/5 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-black/50">
                  {players.a?.name ?? "Player A"}
                </dt>
                <dd className="mt-1.5 font-mono text-sm text-black">
                  <span className={delta.a && delta.a > 0 ? "text-[#F7931A]" : ""}>
                    {formatDelta(delta.a)}
                  </span>{" "}
                  → {ratingAfter.a?.toFixed(1) ?? "-"}
                </dd>
              </div>
              <div className="rounded border border-black/10 bg-black/5 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-black/50">
                  {players.b?.name ?? "Player B"}
                </dt>
                <dd className="mt-1.5 font-mono text-sm text-black">
                  <span className={delta.b && delta.b > 0 ? "text-[#F7931A]" : ""}>
                    {formatDelta(delta.b)}
                  </span>{" "}
                  → {ratingAfter.b?.toFixed(1) ?? "-"}
                </dd>
              </div>
            </dl>

            {match.note && (
              <p className="mt-4 rounded border border-black/10 bg-black/5 px-3 py-2 text-sm text-black/70">
                {match.note}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
};

const formatDelta = (delta?: number): string => {
  if (delta == null || Number.isNaN(delta) || delta === 0) return "±0.0";
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta.toFixed(1)}`;
};
