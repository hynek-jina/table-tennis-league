import { createFileRoute } from "@tanstack/react-router";

import { MatchHistory } from "../components/MatchHistory";
import { RankingList } from "../components/RankingList";
import { useLeagueData } from "../hooks/useLeagueData";

const StatsPage = () => {
  const { players, ranking, matches } = useLeagueData();

  const matchCount = matches.length;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-10">
        <h1 className="text-3xl font-light text-black sm:text-4xl">
          Table Tennis League
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-black/50">
          <span>{players.length} players</span>
          <span className="text-black/20">•</span>
          <span>{matchCount} matches</span>
        </div>
      </header>

      <div className="space-y-6">
        <section className="rounded-lg border border-black/10 bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xs font-medium uppercase tracking-wider text-black/60">
              Ranking
            </h2>
            <span className="text-xs font-mono text-black/40">STR</span>
          </div>
          <RankingList ranking={ranking} />
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5 sm:p-6">
          <h2 className="mb-5 text-xs font-medium uppercase tracking-wider text-black/60">
            Match history
          </h2>
          <MatchHistory matches={matches} readonly />
        </section>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/stats")({
  component: StatsPage,
});
