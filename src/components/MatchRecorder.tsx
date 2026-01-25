import * as Evolu from "@evolu/common";
import { IconTrophy } from "@tabler/icons-react";
import { FormEvent, useMemo, useState } from "react";

import { formatTypeError, useEvolu } from "../evolu/client";
import type { PlayerId } from "../evolu/client";
import { K_FACTOR } from "../hooks/useLeagueData";
import type { PlayerRow } from "../evolu/client";

interface MatchRecorderProps {
  readonly players: ReadonlyArray<PlayerRow>;
  readonly currentRatings: ReadonlyMap<PlayerId, number>;
}

export const MatchRecorder = ({
  players,
  currentRatings,
}: MatchRecorderProps) => {
  const { insert } = useEvolu();
  const [playerAId, setPlayerAId] = useState<PlayerId | "">(
    players[0]?.id ?? "",
  );
  const [playerBId, setPlayerBId] = useState<PlayerId | "">(
    players[1]?.id ?? "",
  );
  const [winnerId, setWinnerId] = useState<PlayerId | "">(
    players[0]?.id ?? "",
  );
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  const playersById = useMemo(() => {
    const map = new Map<PlayerId, PlayerRow>();
    players.forEach((player) => map.set(player.id, player));
    return map;
  }, [players]);

  const preview = useMemo(() => {
    if (!playerAId || !playerBId || playerAId === playerBId) {
      return null;
    }

    const ratingA = currentRatings.get(playerAId);
    const ratingB = currentRatings.get(playerBId);
    if (ratingA == null || ratingB == null) return null;

    const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
    const expectedB = 1 - expectedA;

    if (winnerId !== playerAId && winnerId !== playerBId) {
      return { expectedA, expectedB, ratingA, ratingB, deltaA: 0, deltaB: 0 };
    }

    const actualA = winnerId === playerAId ? 1 : 0;
    const actualB = 1 - actualA;

    const deltaA = K_FACTOR * (actualA - expectedA);
    const deltaB = K_FACTOR * (actualB - expectedB);

    return { expectedA, expectedB, ratingA, ratingB, deltaA, deltaB };
  }, [currentRatings, playerAId, playerBId, winnerId]);

  const resetForm = () => {
    setNote("");
    setError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!playerAId || !playerBId) {
      setError("Choose two players.");
      return;
    }

    if (playerAId === playerBId) {
      setError("Players must be different.");
      return;
    }

    if (winnerId !== playerAId && winnerId !== playerBId) {
      setError("Winner must be one of the selected players.");
      return;
    }

    const playedAtResult = Evolu.dateToDateIso(new Date());
    if (!playedAtResult.ok) {
      setError(formatTypeError(playedAtResult.error));
      return;
    }

    const trimmedNote = note.trim();

    const insertResult = insert(
      "match",
      {
        playerAId,
        playerBId,
        winnerId: winnerId as PlayerId,
        playedAt: playedAtResult.value,
        note: trimmedNote.length > 0 ? trimmedNote : null,
      },
      { onComplete: resetForm },
    );

    if (!insertResult.ok) {
      setError(formatTypeError(insertResult.error));
    }
  };

  if (players.length < 2) {
    return (
      <p className="py-8 text-center text-sm text-black/50">
        Add at least two players to record a match.
      </p>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-black/60">
            Player A
          </span>
          <select
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-base text-black shadow-sm transition-all focus:border-[#F7931A] focus:outline-none focus:ring-2 focus:ring-[#F7931A]/20"
            value={playerAId}
            onChange={(event) => {
              const value = event.target.value as PlayerId | "";
              setPlayerAId(value);
              if (value && value === playerBId) {
                const alternative = players.find((p) => p.id !== value)?.id ?? "";
                setPlayerBId(alternative);
              }
              if (winnerId && winnerId !== value && winnerId !== playerBId) {
                setWinnerId(value);
              }
            }}
          >
            <option value="">Select player</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-black/60">
            Player B
          </span>
          <select
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-base text-black shadow-sm transition-all focus:border-[#F7931A] focus:outline-none focus:ring-2 focus:ring-[#F7931A]/20"
            value={playerBId}
            onChange={(event) => {
              const value = event.target.value as PlayerId | "";
              setPlayerBId(value);
              if (value && value === playerAId) {
                const alternative = players.find((p) => p.id !== value)?.id ?? "";
                setPlayerAId(alternative);
              }
              if (winnerId && winnerId !== value && winnerId !== playerAId) {
                setWinnerId(value);
              }
            }}
          >
            <option value="">Select player</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="border-t border-black/10 pt-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-black/60">
          Winner
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[playerAId, playerBId]
            .map((id) => (id ? playersById.get(id) : undefined))
            .filter(Boolean)
            .map((player) => {
              const isSelected = winnerId === player!.id;
              return (
                <button
                  key={player!.id}
                  type="button"
                  onClick={() => setWinnerId(player!.id)}
                  className={`
                    relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 px-4 py-5 text-center transition-all
                    ${
                      isSelected
                        ? "border-[#F7931A] bg-[#F7931A]/10 shadow-lg shadow-[#F7931A]/20"
                        : "border-black/10 bg-white hover:border-black/20 hover:bg-black/5"
                    }
                  `}
                >
                  <div
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-full transition-all
                      ${
                        isSelected
                          ? "bg-[#F7931A] text-white"
                          : "bg-black/5 text-black/30"
                      }
                    `}
                  >
                    <IconTrophy size={22} stroke={2} />
                  </div>
                  <span
                    className={`
                      text-lg transition-all
                      ${
                        isSelected
                          ? "font-bold text-[#F7931A]"
                          : "font-medium text-black/70"
                      }
                    `}
                  >
                    {player!.name}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#F7931A]">
                      Winner
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      </div>

      <label className="block">
        <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-black/60">
          Optional note
        </span>
        <textarea
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-base text-black shadow-sm placeholder:text-black/40 transition-all focus:border-[#F7931A] focus:outline-none focus:ring-2 focus:ring-[#F7931A]/20"
          maxLength={1000}
          placeholder="Score, highlights, etc."
          rows={3}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>

      {preview && playerAId && playerBId && (
        <div className="rounded border border-black/10 bg-black/5 p-4 text-sm">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-black/60">
            Projected change
          </p>
          <div className="space-y-2 font-mono text-xs text-black/80">
            <p>
              {playersById.get(playerAId as PlayerId)?.name ?? "Player A"}:{" "}
              <span className={preview.deltaA > 0 ? "text-[#F7931A]" : ""}>
                {formatDelta(preview.deltaA)}
              </span>{" "}
              ({preview.ratingA.toFixed(1)} → {(preview.ratingA + preview.deltaA).toFixed(1)})
            </p>
            <p>
              {playersById.get(playerBId as PlayerId)?.name ?? "Player B"}:{" "}
              <span className={preview.deltaB > 0 ? "text-[#F7931A]" : ""}>
                {formatDelta(preview.deltaB)}
              </span>{" "}
              ({preview.ratingB.toFixed(1)} → {(preview.ratingB + preview.deltaB).toFixed(1)})
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-black/60">{error}</p>
      )}

      <div className="flex justify-end pt-2">
        <button
          className="rounded-full bg-[#F7931A] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#F7931A]/90 hover:shadow-lg active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A]/50"
          type="submit"
        >
          Record match
        </button>
      </div>
    </form>
  );
};

const formatDelta = (delta: number): string => {
  if (Number.isNaN(delta)) return "+0.0";
  const sign = delta >= 0 ? "+" : "";
  return `${sign}${delta.toFixed(1)}`;
};
