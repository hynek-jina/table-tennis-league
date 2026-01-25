import { describe, expect, it, vi } from "vitest";

// Mock Evolu before any imports that use it
vi.mock("../evolu/client", () => ({
  useQuery: vi.fn(),
  playersQuery: { toString: () => "player" },
  matchesQuery: { toString: () => "match" },
}));

import { renderHook } from "@testing-library/react";
import type { MatchRow, PlayerId } from "../evolu/client";
import { useQuery } from "../evolu/client";
import { K_FACTOR, useLeagueData } from "./useLeagueData";
import { createMockMatch, createMockPlayer } from "../test/helpers";

describe("useLeagueData", () => {
  const mockPlayers = [
    createMockPlayer({
      id: "player1" as PlayerId,
      name: "Alice",
      initialRating: 1000,
    }),
    createMockPlayer({
      id: "player2" as PlayerId,
      name: "Bob",
      initialRating: 1000,
    }),
    createMockPlayer({
      id: "player3" as PlayerId,
      name: "Charlie",
      initialRating: 1200,
    }),
  ];

  it("should initialize players with their initial ratings", () => {
    vi.mocked(useQuery).mockImplementation((query: any) => {
      if (query.toString().includes("player")) return mockPlayers;
      return [];
    });

    const { result } = renderHook(() => useLeagueData());

    expect(result.current.players).toHaveLength(3);
    expect(result.current.ranking).toHaveLength(3);
    expect(result.current.ranking[0].rating).toBe(1200); // Charlie highest
    expect(result.current.ranking[1].rating).toBe(1000); // Alice or Bob
    expect(result.current.ranking[2].rating).toBe(1000);
  });

  it("should calculate rating changes correctly after a match", () => {
    const matches = [
      createMockMatch({
        id: "match1" as MatchRow["id"],
        playerAId: "player1" as PlayerId,
        playerBId: "player2" as PlayerId,
        winnerId: "player1" as PlayerId,
        playedAt: "2024-01-02T00:00:00.000Z",
      }),
    ];

    vi.mocked(useQuery).mockImplementation((query: any) => {
      if (query.toString().includes("player")) return mockPlayers;
      if (query.toString().includes("match")) return matches;
      return [];
    });

    const { result } = renderHook(() => useLeagueData());

    // Alice should gain rating, Bob should lose rating
    const aliceRanking = result.current.ranking.find(
      (r) => r.player.name === "Alice"
    );
    const bobRanking = result.current.ranking.find(
      (r) => r.player.name === "Bob"
    );

    expect(aliceRanking?.rating).toBeGreaterThan(1000);
    expect(bobRanking?.rating).toBeLessThan(1000);
    expect(aliceRanking?.matchCount).toBe(1);
    expect(bobRanking?.matchCount).toBe(1);
  });

  it("should apply K-factor of 16 for rating changes", () => {
    const matches = [
      createMockMatch({
        id: "match1" as MatchRow["id"],
        playerAId: "player1" as PlayerId, // Alice (1000)
        playerBId: "player2" as PlayerId, // Bob (1000)
        winnerId: "player1" as PlayerId, // Alice wins
        playedAt: "2024-01-02T00:00:00.000Z",
      }),
    ];

    vi.mocked(useQuery).mockImplementation((query: any) => {
      if (query.toString().includes("player")) return mockPlayers;
      if (query.toString().includes("match")) return matches;
      return [];
    });

    const { result } = renderHook(() => useLeagueData());

    const matchSummary = result.current.matches[0];

    // Expected score for equal ratings: 0.5 each
    // Actual score: winner gets 1, loser gets 0
    // Delta = K * (actual - expected) = 16 * (1 - 0.5) = 8 for winner
    // Delta = K * (actual - expected) = 16 * (0 - 0.5) = -8 for loser
    expect(matchSummary.delta.a).toBeCloseTo(8, 1);
    expect(matchSummary.delta.b).toBeCloseTo(-8, 1);
  });

  it("should calculate expected scores correctly for different ratings", () => {
    const matches = [
      createMockMatch({
        id: "match1" as MatchRow["id"],
        playerAId: "player1" as PlayerId, // Alice (1000)
        playerBId: "player3" as PlayerId, // Charlie (1200)
        winnerId: "player1" as PlayerId, // Alice wins (upset!)
        playedAt: "2024-01-02T00:00:00.000Z",
      }),
    ];

    vi.mocked(useQuery).mockImplementation((query: any) => {
      if (query.toString().includes("player")) return mockPlayers;
      if (query.toString().includes("match")) return matches;
      return [];
    });

    const { result } = renderHook(() => useLeagueData());

    const matchSummary = result.current.matches[0];

    // Alice (lower rating) wins, so should gain more points
    // Charlie (higher rating) loses, so should lose more points
    expect(matchSummary.delta.a).toBeGreaterThan(8); // Bigger gain for upset
    expect(matchSummary.delta.b).toBeLessThan(-8); // Bigger loss for upset
  });

  it("should process matches in chronological order", () => {
    const matches = [
      createMockMatch({
        id: "match2" as MatchRow["id"],
        playerAId: "player1" as PlayerId,
        playerBId: "player2" as PlayerId,
        winnerId: "player1" as PlayerId,
        playedAt: "2024-01-03T00:00:00.000Z", // Later
      }),
      createMockMatch({
        id: "match1" as MatchRow["id"],
        playerAId: "player1" as PlayerId,
        playerBId: "player2" as PlayerId,
        winnerId: "player2" as PlayerId,
        playedAt: "2024-01-02T00:00:00.000Z", // Earlier
      }),
    ];

    vi.mocked(useQuery).mockImplementation((query: any) => {
      if (query.toString().includes("player")) return mockPlayers;
      if (query.toString().includes("match")) return matches;
      return [];
    });

    const { result } = renderHook(() => useLeagueData());

    // First processed match should be the one with earlier playedAt
    expect(result.current.matches[0].match.id).toBe("match1");
    expect(result.current.matches[1].match.id).toBe("match2");
  });

  it("should calculate total delta from initial rating", () => {
    const matches = [
      createMockMatch({
        id: "match1" as MatchRow["id"],
        playerAId: "player1" as PlayerId, // Alice
        playerBId: "player2" as PlayerId, // Bob
        winnerId: "player1" as PlayerId,
        playedAt: "2024-01-02T00:00:00.000Z",
      }),
      createMockMatch({
        id: "match2" as MatchRow["id"],
        playerAId: "player1" as PlayerId, // Alice
        playerBId: "player2" as PlayerId, // Bob
        winnerId: "player1" as PlayerId,
        playedAt: "2024-01-03T00:00:00.000Z",
      }),
    ];

    vi.mocked(useQuery).mockImplementation((query: any) => {
      if (query.toString().includes("player")) return mockPlayers;
      if (query.toString().includes("match")) return matches;
      return [];
    });

    const { result } = renderHook(() => useLeagueData());

    const aliceRanking = result.current.ranking.find(
      (r) => r.player.name === "Alice"
    );
    const bobRanking = result.current.ranking.find(
      (r) => r.player.name === "Bob"
    );

    // Delta should be total change from initial rating
    expect(aliceRanking?.delta).toBe(
      aliceRanking!.rating - aliceRanking!.player.initialRating
    );
    expect(bobRanking?.delta).toBe(
      bobRanking!.rating - bobRanking!.player.initialRating
    );
    expect(aliceRanking?.delta).toBeGreaterThan(0);
    expect(bobRanking?.delta).toBeLessThan(0);
  });

  it("should sort ranking by rating (highest first)", () => {
    const matches = [
      createMockMatch({
        id: "match1" as MatchRow["id"],
        playerAId: "player1" as PlayerId, // Alice (1000)
        playerBId: "player3" as PlayerId, // Charlie (1200)
        winnerId: "player1" as PlayerId, // Alice wins, should overtake Charlie
        playedAt: "2024-01-02T00:00:00.000Z",
      }),
    ];

    vi.mocked(useQuery).mockImplementation((query: any) => {
      if (query.toString().includes("player")) return mockPlayers;
      if (query.toString().includes("match")) return matches;
      return [];
    });

    const { result } = renderHook(() => useLeagueData());

    // Rankings should be sorted descending by rating
    for (let i = 0; i < result.current.ranking.length - 1; i++) {
      expect(result.current.ranking[i].rating).toBeGreaterThanOrEqual(
        result.current.ranking[i + 1].rating
      );
    }
  });

  it("should track match count for each player", () => {
    const matches = [
      createMockMatch({
        id: "match1" as MatchRow["id"],
        playerAId: "player1" as PlayerId, // Alice
        playerBId: "player2" as PlayerId, // Bob
        winnerId: "player1" as PlayerId,
        playedAt: "2024-01-02T00:00:00.000Z",
      }),
      createMockMatch({
        id: "match2" as MatchRow["id"],
        playerAId: "player1" as PlayerId, // Alice
        playerBId: "player3" as PlayerId, // Charlie
        winnerId: "player3" as PlayerId,
        playedAt: "2024-01-03T00:00:00.000Z",
      }),
    ];

    vi.mocked(useQuery).mockImplementation((query: any) => {
      if (query.toString().includes("player")) return mockPlayers;
      if (query.toString().includes("match")) return matches;
      return [];
    });

    const { result } = renderHook(() => useLeagueData());

    const aliceRanking = result.current.ranking.find(
      (r) => r.player.name === "Alice"
    );
    const bobRanking = result.current.ranking.find(
      (r) => r.player.name === "Bob"
    );
    const charlieRanking = result.current.ranking.find(
      (r) => r.player.name === "Charlie"
    );

    expect(aliceRanking?.matchCount).toBe(2);
    expect(bobRanking?.matchCount).toBe(1);
    expect(charlieRanking?.matchCount).toBe(1);
  });

  it("should create playersById map for quick lookup", () => {
    vi.mocked(useQuery).mockImplementation((query: any) => {
      if (query.toString().includes("player")) return mockPlayers;
      return [];
    });

    const { result } = renderHook(() => useLeagueData());

    expect(result.current.playersById.size).toBe(3);
    expect(result.current.playersById.get("player1" as PlayerId)?.name).toBe(
      "Alice"
    );
    expect(result.current.playersById.get("player2" as PlayerId)?.name).toBe("Bob");
    expect(result.current.playersById.get("player3" as PlayerId)?.name).toBe(
      "Charlie"
    );
  });

  it("should return empty rankings when no players exist", () => {
    vi.mocked(useQuery).mockImplementation(() => []);

    const { result } = renderHook(() => useLeagueData());

    expect(result.current.players).toHaveLength(0);
    expect(result.current.ranking).toHaveLength(0);
    expect(result.current.matches).toHaveLength(0);
  });

  it("should verify K-factor constant is 16", () => {
    expect(K_FACTOR).toBe(16);
  });
});
