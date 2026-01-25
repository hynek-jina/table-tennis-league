import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { AddPlayerForm } from "../components/AddPlayerForm";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { MatchHistory } from "../components/MatchHistory";
import { MatchRecorder } from "../components/MatchRecorder";
import { Navigation } from "../components/Navigation";
import { OwnerSection } from "../components/OwnerSection";
import { RankingList } from "../components/RankingList";
import type { PlayerId } from "../evolu/client";
import { useLeagueData } from "../hooks/useLeagueData";

const LeagueDashboard = () => {
  const { players, ranking, matches } = useLeagueData();

  const ratingMap = useMemo(() => {
    const map = new Map<PlayerId, number>();
    ranking.forEach((entry) => {
      map.set(entry.player.id, entry.rating);
    });
    return map;
  }, [ranking]);

  const matchCount = matches.length;

  return (
    <>
      <div className="mx-auto w-full max-w-4xl px-4 py-6 pb-20 sm:px-6 sm:py-8">
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
        <CollapsibleSection
          storageKey="section-home-add-player"
          title="Add player"
          defaultOpen={false}
        >
          <AddPlayerForm />
        </CollapsibleSection>

        <CollapsibleSection
          storageKey="section-home-record-match"
          title="Record match"
          defaultOpen={true}
        >
          <MatchRecorder currentRatings={ratingMap} players={players} />
        </CollapsibleSection>

        <CollapsibleSection
          storageKey="section-home-ranking"
          title="Ranking"
          defaultOpen={true}
          headerRight="STR"
        >
          <RankingList ranking={ranking} />
        </CollapsibleSection>

        <CollapsibleSection
          storageKey="section-home-match-history"
          title="Match history"
          defaultOpen={false}
        >
          <MatchHistory matches={matches} />
        </CollapsibleSection>

        <CollapsibleSection
          storageKey="section-home-account"
          title="Account & sync"
          defaultOpen={false}
        >
          <OwnerSection />
        </CollapsibleSection>
      </div>
      </div>
      <Navigation />
    </>
  );
};

export const Route = createFileRoute("/")({
  component: LeagueDashboard,
});
