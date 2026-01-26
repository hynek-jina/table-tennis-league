# Table Tennis League

A local-first Progressive Web App for tracking table tennis league ratings using the STR (Skill-based Team Ranking) system.

## Features

- Track players and their ratings
- Record match results with automatic rating calculations
- View rankings and statistics
- Works offline with local-first data sync
- Progressive Web App - install on any device

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- Yarn package manager

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev              # Start development server
yarn typecheck        # Run type checking
yarn test             # Run tests in watch mode
yarn lint             # Run ESLint
```

### Build

```bash
yarn build            # Build for production
yarn preview          # Preview production build
```

## Tech Stack

- **React** - UI framework
- **TanStack Router** - File-based routing
- **Evolu** - Local-first database with sync (Not ideal for this colaborative use-case, but I want to experiment with it to learn it more.)
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Vitest** - Testing framework

## Rating System

This app uses the STR (Skill-based Team Ranking) system based on Elo rating calculations.

### How It Works

1. **Initial Rating**: Each player starts with an initial rating (default: 1000)

2. **Expected Score Calculation**: Before each match, the system calculates the expected probability of each player winning using the Elo formula:
   ```
   Expected Score = 1 / (1 + 10^((Opponent Rating - Player Rating) / 400))
   ```

3. **Rating Update**: After a match, both players' ratings are updated based on the actual outcome:
   ```
   New Rating = Old Rating + K × (Actual Score - Expected Score)
   ```
   - **K-factor**: 16 (determines how much ratings change per match)
   - **Actual Score**: 1 for winner, 0 for loser

4. **Rating Deltas**: The winner gains rating points equal to what the loser loses, keeping the total rating points in the system constant

5. **Chronological Processing**: All matches are processed in chronological order to ensure accurate rating progression

6. **Ranking**: Players are ranked by their current rating (highest first), with ties broken alphabetically by name

### Example

If a 1200-rated player beats a 1400-rated player:
- Expected score for the 1200 player: ~24% (underdog)
- Actual score: 1 (won)
- Rating change: +12 for winner, -12 for loser
