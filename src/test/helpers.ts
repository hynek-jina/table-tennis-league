/**
 * Test helpers for creating mock data with proper Evolu types.
 *
 * These helpers centralize the type assertions needed for test data,
 * accepting plain JavaScript types and returning properly typed Evolu rows.
 */

import type { MatchRow, PlayerId, PlayerRow } from "../evolu/client";

/**
 * Creates a mock PlayerRow for testing.
 * Accepts plain JavaScript types and handles branded type assertions internally.
 */
export function createMockPlayer(data: {
  id: PlayerId;
  name?: string;
  initialRating?: number;
  createdAt?: string;
}): PlayerRow {
  return {
    id: data.id,
    name: data.name ?? "Test Player",
    initialRating: data.initialRating ?? 1000,
    createdAt: data.createdAt ?? "2024-01-01T00:00:00.000Z",
  } as PlayerRow;
}

/**
 * Creates a mock MatchRow for testing.
 * Accepts plain JavaScript types and handles branded type assertions internally.
 */
export function createMockMatch(data: {
  id: MatchRow["id"];
  playerAId: PlayerId;
  playerBId: PlayerId;
  winnerId: PlayerId;
  playedAt?: string;
  note?: string | null;
  createdAt?: string;
}): MatchRow {
  return {
    id: data.id,
    playerAId: data.playerAId,
    playerBId: data.playerBId,
    winnerId: data.winnerId,
    playedAt: data.playedAt ?? "2024-01-02T00:00:00.000Z",
    note: data.note ?? null,
    createdAt: data.createdAt ?? "2024-01-02T00:00:00.000Z",
  } as MatchRow;
}
