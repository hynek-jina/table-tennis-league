import { useMemo } from "react";

import { matchesQuery, playersQuery, useQuery } from "../evolu/client";
import type { MatchRow, PlayerRow } from "../evolu/client";

export const K_FACTOR = 16;

export interface MatchSummary {
  readonly match: MatchRow;
  readonly players: {
    readonly a?: PlayerRow;
    readonly b?: PlayerRow;
  };
  readonly ratingBefore: {
    readonly a?: number;
    readonly b?: number;
  };
  readonly ratingAfter: {
    readonly a?: number;
    readonly b?: number;
  };
  readonly delta: {
    readonly a?: number;
    readonly b?: number;
  };
}

export interface RankingEntry {
  readonly player: PlayerRow;
  readonly rating: number;
  readonly delta: number;
  readonly matchCount: number;
}

export interface LeagueData {
  readonly players: ReadonlyArray<PlayerRow>;
  readonly playersById: Map<PlayerRow["id"], PlayerRow>;
  readonly matches: ReadonlyArray<MatchSummary>;
  readonly ranking: ReadonlyArray<RankingEntry>;
}

export const useLeagueData = (): LeagueData => {
  const players = useQuery(playersQuery);
  const matches = useQuery(matchesQuery);

  return useMemo(() => {
    const playersById = new Map<PlayerRow["id"], PlayerRow>();
    players.forEach((player) => {
      playersById.set(player.id, player);
    });

    const ratingState = new Map<
      PlayerRow["id"],
      { rating: number; initial: number; matchCount: number }
    >();

    players.forEach((player) => {
      ratingState.set(player.id, {
        rating: player.initialRating,
        initial: player.initialRating,
        matchCount: 0,
      });
    });

    const sortedMatches = [...matches].sort((a, b) =>
      a.playedAt.localeCompare(b.playedAt),
    );

    const summaries: MatchSummary[] = [];

    sortedMatches.forEach((match) => {
      const playerA = playersById.get(match.playerAId);
      const playerB = playersById.get(match.playerBId);
      if (!playerA || !playerB) return;

      const stateA = ratingState.get(playerA.id);
      const stateB = ratingState.get(playerB.id);
      if (!stateA || !stateB) return;

      const ratingA = stateA.rating;
      const ratingB = stateB.rating;

      const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
      const expectedB = 1 - expectedA;

      const actualA = match.winnerId === playerA.id ? 1 : 0;
      const actualB = 1 - actualA;

      const newRatingA = ratingA + K_FACTOR * (actualA - expectedA);
      const newRatingB = ratingB + K_FACTOR * (actualB - expectedB);

      stateA.rating = newRatingA;
      stateA.matchCount += 1;

      stateB.rating = newRatingB;
      stateB.matchCount += 1;

      summaries.push({
        match,
        players: { a: playerA, b: playerB },
        ratingBefore: { a: ratingA, b: ratingB },
        ratingAfter: { a: newRatingA, b: newRatingB },
        delta: { a: newRatingA - ratingA, b: newRatingB - ratingB },
      });
    });

    const ranking: RankingEntry[] = players
      .map((player) => {
        const state = ratingState.get(player.id);
        const rating = state?.rating ?? player.initialRating;
        const initial = state?.initial ?? player.initialRating;
        const delta = rating - initial;
        const matchCount = state?.matchCount ?? 0;
        return { player, rating, delta, matchCount };
      })
      .sort((a, b) => b.rating - a.rating || a.player.name.localeCompare(b.player.name));

    return {
      players,
      playersById,
      matches: summaries,
      ranking,
    } satisfies LeagueData;
  }, [matches, players]);
};
