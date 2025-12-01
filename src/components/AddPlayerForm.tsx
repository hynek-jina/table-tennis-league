import { FormEvent, useState } from "react";

import { formatTypeError, useEvolu } from "../evolu/client";

const DEFAULT_RATING = "1000";

export const AddPlayerForm = () => {
  const { insert } = useEvolu();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const parsedRating = Number.parseFloat(rating);

    if (!Number.isFinite(parsedRating)) {
      setError("Please enter a valid initial rating.");
      return;
    }

    const insertResult = insert(
      "player",
      {
        name: trimmedName,
        initialRating: parsedRating,
      },
      {
        onComplete: () => {
          setName("");
          setRating(DEFAULT_RATING);
        },
      },
    );

    if (!insertResult.ok) {
      setError(formatTypeError(insertResult.error));
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-medium text-zinc-700">
          Player name
          <input
            autoComplete="off"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            maxLength={100}
            placeholder="e.g. Katarína"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-zinc-700">
          Initial rating
          <input
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            min="0"
            step="0.01"
            type="number"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          />
        </label>
      </div>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="flex justify-end">
        <button
          className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-300/40 transition-colors hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
          type="submit"
        >
          Add player
        </button>
      </div>
    </form>
  );
};
