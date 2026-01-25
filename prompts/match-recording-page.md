prompt:
Add new page /match for easy and quick recording of the result of one match. Put "Record match" section on top, "Match history" below that and current "Ranking" at the bottom. Keep the main page look the same for now. But reuse the components so you can update them later and it will be changed on both pages.

plan:
# Add Match Recording Page

## Overview

Create a new `/match` page optimized for quick match recording. The existing components are already designed to be reusable with props, so the implementation is straightforward.

## Current Structure

- Routes use TanStack Router with file-based routing in `src/routes/`
- Existing components in `src/components/`:
  - `MatchRecorder` - accepts `players` and `currentRatings` props
  - `MatchHistory` - accepts `matches` and optional `readonly` prop
  - `RankingList` - accepts `ranking` prop
- Data provided by `useLeagueData()` hook

## Implementation

### Create New Route File

Create [src/routes/match.tsx](src/routes/match.tsx) with this structure:

```tsx
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
        {/* 1. Record match - TOP */}
        <section className="...">
          <MatchRecorder currentRatings={ratingMap} players={players} />
        </section>

        {/* 2. Match history - MIDDLE */}
        <section className="...">
          <MatchHistory matches={matches} />
        </section>

        {/* 3. Ranking - BOTTOM */}
        <section className="...">
          <RankingList ranking={ranking} />
        </section>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/match")({
  component: MatchPage,
});
```

### Auto-Generated Route Tree

The TanStack Router plugin will automatically update [src/routeTree.gen.ts](src/routeTree.gen.ts) when the new route file is created. No manual changes needed.

## Key Points

- Main page (`/`) remains unchanged
- All three components are already reusable - they receive data via props
- `MatchHistory` will have delete buttons enabled (no `readonly` prop) since this is for active match management
- The `ratingMap` computation is duplicated from index.tsx - this is acceptable for now but could be refactored into the `useLeagueData` hook later if needed