import * as Evolu from "@evolu/common";
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
            className="w-full border-b border-black/20 bg-transparent px-1 py-2.5 text-base text-black transition-colors focus:border-[#F7931A] focus:outline-none"
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
            className="w-full border-b border-black/20 bg-transparent px-1 py-2.5 text-base text-black transition-colors focus:border-[#F7931A] focus:outline-none"
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

      <fieldset className="border-t border-black/10 pt-5">
        <legend className="mb-4 px-0 text-xs font-medium uppercase tracking-wide text-black/60">
          Winner
        </legend>
        <div className="space-y-3">
          {[playerAId, playerBId]
            .map((id) => (id ? playersById.get(id) : undefined))
            .filter(Boolean)
            .map((player) => (
              <label
                key={player!.id}
                className="flex cursor-pointer items-center gap-3 text-sm text-black"
              >
                <input
                  checked={winnerId === player!.id}
                  className="h-4 w-4 border-2 border-black/30 text-[#F7931A] transition-colors focus:ring-2 focus:ring-[#F7931A]/50"
                  name="winner"
                  onChange={() => setWinnerId(player!.id)}
                  type="radio"
                  value={player!.id}
                />
                <span className={winnerId === player!.id ? "font-medium" : ""}>
                  {player!.name}
                </span>
              </label>
            ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-black/60">
          Optional note
        </span>
        <textarea
          className="w-full border-b border-black/20 bg-transparent px-1 py-2.5 text-base text-black placeholder:text-black/30 transition-colors focus:border-[#F7931A] focus:outline-none"
          maxLength={1000}
          placeholder="Score, highlights, etc."
          rows={2}
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
          className="bg-[#F7931A] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#F7931A]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A]/50"
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
