import { Suspense, useMemo } from "react";

import { AddPlayerForm } from "./components/AddPlayerForm";
import { MatchHistory } from "./components/MatchHistory";
import { MatchRecorder } from "./components/MatchRecorder";
import { OwnerSection } from "./components/OwnerSection";
import { RankingList } from "./components/RankingList";
import { EvoluProvider, evolu, PlayerId } from "./evolu/client";
import { useLeagueData } from "./hooks/useLeagueData";

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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-emerald-500 px-6 py-8 text-white shadow-lg shadow-indigo-700/30">
        <p className="text-xs uppercase tracking-[0.25em] text-indigo-100/80">
          Simplified Table Tennis Ranking (STR)
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Table Tennis League
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-indigo-100/90 sm:text-base">
          Local-first, Evolu-synced ratings that stay accurate even offline.
          Record matches on any device, sync via mnemonic, and keep your club
          standings fair.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <Badge label={`${players.length} players`} />
          <Badge label={`${matchCount} matches`} />
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">Add player</h2>
            <p className="mt-1 text-sm text-zinc-600">
              New players start with the baseline rating you provide here.
            </p>
            <div className="mt-4">
              <AddPlayerForm />
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">Record match</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Select opponents, pick the winner, and STR will handle the rest.
            </p>
            <div className="mt-4">
              <MatchRecorder currentRatings={ratingMap} players={players} />
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">Account & sync</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Your mnemonic is the key to sync the league between browsers.
            </p>
            <div className="mt-4">
              <OwnerSection />
            </div>
          </article>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">Ranking</h2>
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Live STR
              </span>
            </div>
            <div className="mt-4">
              <RankingList ranking={ranking} />
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">
                Match history
              </h2>
            </div>
            <div className="mt-4">
              <MatchHistory matches={matches} />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

const Badge = ({ label }: { label: string }) => (
  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide">
    {label}
  </span>
);

const App = () => {
  return (
    <EvoluProvider value={evolu}>
      <Suspense fallback={<div className="p-6 text-center text-zinc-500">Loading league…</div>}>
        <LeagueDashboard />
      </Suspense>
    </EvoluProvider>
  );
};

export default App;
