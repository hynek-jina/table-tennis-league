import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { MatchHistory } from "../components/MatchHistory";
import { MatchRecorder } from "../components/MatchRecorder";
import { RankingList } from "../components/RankingList";
import type { PlayerId } from "../evolu/client";
import { useLeagueData } from "../hooks/useLeagueData";

const MatchPage = () => {
  const { players, ranking, matches } = useLeagueData();

  const ratingMap = useMemo(() => {
    const map = new Map<PlayerId, number>();
    ranking.forEach((entry) => {
      map.set(entry.player.id, entry.rating);
    });
    return map;
  }, [ranking]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-10">
        <h1 className="text-3xl font-light text-black sm:text-4xl">
          Record Match
        </h1>
      </header>

      <div className="space-y-6">
        <section className="rounded-lg border border-black/10 bg-white p-5 sm:p-6">
          <h2 className="mb-5 text-xs font-medium uppercase tracking-wider text-black/60">
            Record match
          </h2>
          <MatchRecorder currentRatings={ratingMap} players={players} />
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5 sm:p-6">
          <h2 className="mb-5 text-xs font-medium uppercase tracking-wider text-black/60">
            Match history
          </h2>
          <MatchHistory matches={matches} />
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xs font-medium uppercase tracking-wider text-black/60">
              Ranking
            </h2>
            <span className="text-xs font-mono text-black/40">STR</span>
          </div>
          <RankingList ranking={ranking} />
        </section>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/match")({
  component: MatchPage,
});
