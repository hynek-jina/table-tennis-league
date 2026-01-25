import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { BackNavigation } from "../components/BackNavigation";
import { CollapsibleSection } from "../components/CollapsibleSection";
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
    <>
      <div className="mx-auto w-full max-w-4xl px-4 py-6 pb-20 sm:px-6 sm:py-8">
      <header className="mb-10">
        <h1 className="text-3xl font-light text-black sm:text-4xl">
          Record Match
        </h1>
      </header>

      <div className="space-y-6">
        <CollapsibleSection
          storageKey="section-match-record-match"
          title="Record match"
          defaultOpen={true}
        >
          <MatchRecorder currentRatings={ratingMap} players={players} />
        </CollapsibleSection>

        <CollapsibleSection
          storageKey="section-match-match-history"
          title="Match history"
          defaultOpen={false}
        >
          <MatchHistory matches={matches} />
        </CollapsibleSection>

        <CollapsibleSection
          storageKey="section-match-ranking"
          title="Ranking"
          defaultOpen={false}
          headerRight="STR"
        >
          <RankingList ranking={ranking} />
        </CollapsibleSection>
      </div>
      </div>
      <BackNavigation />
    </>
  );
};

export const Route = createFileRoute("/match")({
  component: MatchPage,
});
