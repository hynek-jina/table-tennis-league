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
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-black/60">
            Player name
          </span>
          <input
            autoComplete="off"
            className="w-full border-b border-black/20 bg-transparent px-1 py-2.5 text-base text-black placeholder:text-black/30 transition-colors focus:border-[#F7931A] focus:outline-none"
            maxLength={100}
            placeholder="e.g. Katarína"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-black/60">
            Initial rating
          </span>
          <input
            className="w-full border-b border-black/20 bg-transparent px-1 py-2.5 text-base text-black placeholder:text-black/30 transition-colors focus:border-[#F7931A] focus:outline-none"
            min="0"
            step="0.01"
            type="number"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          />
        </label>
      </div>
      {error && (
        <p className="text-sm text-black/60">{error}</p>
      )}
      <div className="flex justify-end pt-2">
        <button
          className="bg-[#F7931A] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#F7931A]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A]/50"
          type="submit"
        >
          Add player
        </button>
      </div>
    </form>
  );
};
