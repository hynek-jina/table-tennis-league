import * as Evolu from "@evolu/common";
import { createUseEvolu, EvoluProvider, useQuery } from "@evolu/react";
import { evoluReactWebDeps, localAuth } from "@evolu/react-web";

const service = "str-pwa-react-20251201";

export const PlayerId = Evolu.id("Player");
export type PlayerId = typeof PlayerId.Type;

export const MatchId = Evolu.id("Match");
export type MatchId = typeof MatchId.Type;

const Schema = {
  player: {
    id: PlayerId,
    name: Evolu.NonEmptyTrimmedString100,
    initialRating: Evolu.NonNegativeNumber,
  },
  match: {
    id: MatchId,
    playerAId: PlayerId,
    playerBId: PlayerId,
    winnerId: PlayerId,
    playedAt: Evolu.DateIso,
    note: Evolu.nullOr(Evolu.NonEmptyTrimmedString1000),
  },
};

type Schema = typeof Schema;

export const ownerProfiles = await localAuth.getProfiles({ service });
export const authResult = await localAuth.getOwner({ service });

export const evolu = Evolu.createEvolu(evoluReactWebDeps)(Schema, {
  name: Evolu.SimpleName.orThrow(
    `${service}-${authResult?.owner?.id ?? "guest"}`
  ),
  encryptionKey: authResult?.owner?.encryptionKey,
  externalAppOwner: authResult?.owner,
});

export const useEvolu = createUseEvolu(evolu);

export const formatTypeError = Evolu.createFormatTypeError<
  | Evolu.MinLengthError
  | Evolu.MaxLengthError
  | Evolu.TrimmedError
  | Evolu.NumberError
  | Evolu.NonNegativeError
  | Evolu.DateIsoError
>((error): string => {
  switch (error.type) {
    case "MinLength":
      return `Value must be at least ${error.min} characters.`;
    case "MaxLength":
      return `Value cannot exceed ${error.max} characters.`;
    case "Trimmed":
      return "Remove leading or trailing spaces.";
    case "Number":
      return "Provide a valid number.";
    case "NonNegative":
      return "Value must be zero or positive.";
    case "DateIso":
      return "Invalid date.";
  }
});

evolu.subscribeError(() => {
  const error = evolu.getError();
  if (!error) return;
  alert(`Evolu error occurred. ${error}`);
  // eslint-disable-next-line no-console
  console.error(error);
});

export const playersQuery = evolu.createQuery((db) =>
  db
    .selectFrom("player")
    .select(["id", "name", "initialRating", "createdAt"])
    .where("isDeleted", "is not", Evolu.sqliteTrue)
    .where("name", "is not", null)
    .$narrowType<{ name: Evolu.kysely.NotNull }>()
    .where("initialRating", "is not", null)
    .$narrowType<{ initialRating: Evolu.kysely.NotNull }>()
    .orderBy("createdAt")
);

export type PlayerRow = typeof playersQuery.Row;

export const matchesQuery = evolu.createQuery((db) =>
  db
    .selectFrom("match")
    .select([
      "id",
      "playerAId",
      "playerBId",
      "winnerId",
      "playedAt",
      "note",
      "createdAt",
    ])
    .where("isDeleted", "is not", Evolu.sqliteTrue)
    .where("playerAId", "is not", null)
    .$narrowType<{ playerAId: Evolu.kysely.NotNull }>()
    .where("playerBId", "is not", null)
    .$narrowType<{ playerBId: Evolu.kysely.NotNull }>()
    .where("winnerId", "is not", null)
    .$narrowType<{ winnerId: Evolu.kysely.NotNull }>()
    .where("playedAt", "is not", null)
    .$narrowType<{ playedAt: Evolu.kysely.NotNull }>()
    .orderBy("playedAt")
    .orderBy("createdAt")
);

export type MatchRow = typeof matchesQuery.Row;

export { EvoluProvider, useQuery };
