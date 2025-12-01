import * as Evolu from "@evolu/common";
import { EvoluIdenticon } from "@evolu/react-web";
import { IconKey, IconSparkles, IconTrash } from "@tabler/icons-react";
import { use, useState } from "react";

import { authResult, formatTypeError, ownerProfiles, useEvolu } from "../evolu/client";

export const OwnerSection = () => {
  const evolu = useEvolu();
  const appOwner = use(evolu.appOwner);
  const [showMnemonic, setShowMnemonic] = useState(false);

  const handleRestoreClick = () => {
    const mnemonic = window.prompt("Enter the mnemonic from another device:");
    if (mnemonic == null) return;

    const parsed = Evolu.Mnemonic.from(mnemonic.trim());
    if (!parsed.ok) {
      alert(formatTypeError(parsed.error));
      return;
    }

    void evolu.restoreAppOwner(parsed.value);
  };

  const handleExportDatabase = () => {
    void evolu.exportDatabase().then((array) => {
      const blob = new Blob([array], { type: "application/x-sqlite3" });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "table-tennis-league.sqlite3";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const handleResetClick = () => {
    const confirmed = window.confirm(
      "Reset local data? This keeps your mnemonic but wipes the device copy.",
    );
    if (!confirmed) return;
    void evolu.resetAppOwner();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          {appOwner && <EvoluIdenticon id={appOwner.id} />}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              Sync identity
            </p>
            <p className="text-base font-semibold text-zinc-900">
              {authResult?.username ?? "Guest"}
            </p>
            <p className="text-xs font-mono text-zinc-500">{appOwner?.id}</p>
          </div>
        </div>
        <div className="mt-4 space-y-3 text-sm text-zinc-600">
          <p>
            Evolu keeps your data in device SQLite first and syncs end-to-end
            encrypted when you restore with the same mnemonic on another
            browser.
          </p>
          {ownerProfiles.length > 1 && (
            <p className="rounded-lg bg-indigo-50/70 px-3 py-2 text-indigo-700">
              This device has {ownerProfiles.length} registered profiles. Use
              passkeys to switch quickly.
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <button
          className="flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-100"
          onClick={() => setShowMnemonic(!showMnemonic)}
          type="button"
        >
          <IconKey className="h-4 w-4" />
          {showMnemonic ? "Hide mnemonic" : "Show mnemonic"}
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-100"
          onClick={handleRestoreClick}
          type="button"
        >
          <IconSparkles className="h-4 w-4" />
          Restore data
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-3 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100"
          onClick={handleResetClick}
          type="button"
        >
          <IconTrash className="h-4 w-4" />
          Reset device
        </button>
      </div>

      {showMnemonic && appOwner?.mnemonic && (
        <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
          <p className="mb-2 font-semibold">Your mnemonic (store securely)</p>
          <p className="font-mono text-xs leading-relaxed">{appOwner.mnemonic}</p>
          <div className="mt-3 flex justify-end gap-2">
            <button
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
              onClick={() => {
                if (appOwner?.mnemonic) {
                  void navigator.clipboard.writeText(appOwner.mnemonic);
                }
              }}
              type="button"
            >
              Copy
            </button>
            <button
              className="rounded-lg bg-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-300"
              onClick={handleExportDatabase}
              type="button"
            >
              Export backup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
