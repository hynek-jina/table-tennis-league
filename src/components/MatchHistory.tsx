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
      <p className="rounded-xl border border-dashed border-zinc-400 bg-zinc-100 px-4 py-6 text-center text-sm text-zinc-600">
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
    <ol className="space-y-3">
      {reversed.map((entry) => {
        const { match, players, delta, ratingAfter } = entry;
        const winner = players.a?.id === match.winnerId ? players.a : players.b;
        const loser = winner && winner.id === players.a?.id ? players.b : players.a;

        return (
          <li
            key={match.id}
            className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  {new Date(match.playedAt).toLocaleString()}
                </p>
                <p className="text-base font-semibold text-zinc-900">
                  {winner?.name ?? "Winner"}
                  <span className="ml-2 text-sm font-normal text-zinc-500">
                    defeated {loser?.name ?? "Opponent"}
                  </span>
                </p>
              </div>
              <button
                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                onClick={() => handleDelete(match.id)}
                title="Delete match"
                type="button"
              >
                <IconTrash className="h-4 w-4" />
              </button>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-zinc-50 px-3 py-2">
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  {players.a?.name ?? "Player A"}
                </dt>
                <dd className="font-mono text-zinc-800">
                  {formatDelta(delta.a)} → {ratingAfter.a?.toFixed(1) ?? "-"}
                </dd>
              </div>
              <div className="rounded-lg bg-zinc-50 px-3 py-2">
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  {players.b?.name ?? "Player B"}
                </dt>
                <dd className="font-mono text-zinc-800">
                  {formatDelta(delta.b)} → {ratingAfter.b?.toFixed(1) ?? "-"}
                </dd>
              </div>
            </dl>

            {match.note && (
              <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
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
