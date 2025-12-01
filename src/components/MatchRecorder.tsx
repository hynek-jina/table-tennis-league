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
      <p className="rounded-xl border border-dashed border-zinc-400 bg-zinc-100 px-4 py-6 text-center text-sm text-zinc-600">
        Add at least two players to record a match.
      </p>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-medium text-zinc-700">
          Player A
          <select
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
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
        <label className="block text-sm font-medium text-zinc-700">
          Player B
          <select
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
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

      <fieldset className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
        <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Winner
        </legend>
        <div className="space-y-2">
          {[playerAId, playerBId]
            .map((id) => (id ? playersById.get(id) : undefined))
            .filter(Boolean)
            .map((player) => (
              <label
                key={player!.id}
                className="flex items-center gap-3 text-sm text-zinc-800"
              >
                <input
                  checked={winnerId === player!.id}
                  className="h-4 w-4 rounded-full border border-zinc-400 text-indigo-600 focus:ring-indigo-500"
                  name="winner"
                  onChange={() => setWinnerId(player!.id)}
                  type="radio"
                  value={player!.id}
                />
                {player!.name}
              </label>
            ))}
        </div>
      </fieldset>

      <label className="block text-sm font-medium text-zinc-700">
        Optional note
        <textarea
          className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          maxLength={1000}
          placeholder="Score, highlights, etc."
          rows={2}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>

      {preview && playerAId && playerBId && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-sm text-indigo-700">
          <p className="font-semibold">Projected change</p>
          <p>
            {playersById.get(playerAId as PlayerId)?.name ?? "Player A"}:
            <span className="ml-1 font-mono">
              {formatDelta(preview.deltaA)} ({preview.ratingA.toFixed(1)} →
              {(preview.ratingA + preview.deltaA).toFixed(1)})
            </span>
          </p>
          <p>
            {playersById.get(playerBId as PlayerId)?.name ?? "Player B"}:
            <span className="ml-1 font-mono">
              {formatDelta(preview.deltaB)} ({preview.ratingB.toFixed(1)} →
              {(preview.ratingB + preview.deltaB).toFixed(1)})
            </span>
          </p>
        </div>
      )}

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <div className="flex justify-end">
        <button
          className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-300/40 transition-colors hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
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
