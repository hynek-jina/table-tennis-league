import * as Evolu from "@evolu/common";
import { EvoluIdenticon } from "@evolu/react-web";
import { IconKey, IconSparkles, IconTrash } from "@tabler/icons-react";
import { use, useState } from "react";

import {
  authResult,
  formatTypeError,
  ownerProfiles,
  useEvolu,
} from "../evolu/client";

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
      "Reset local data? This keeps your mnemonic but wipes the device copy."
    );
    if (!confirmed) return;
    void evolu.resetAppOwner();
  };

  return (
    <div className="space-y-6">
      <div className="rounded border border-black/10 bg-black/5 p-4">
        <div className="flex items-center gap-3">
          {appOwner && <EvoluIdenticon id={appOwner.id} />}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-black/50">
              Sync identity
            </p>
            <p className="mt-1 text-base font-medium text-black">
              {authResult?.username ?? "Guest"}
            </p>
            <p className="mt-1 truncate text-xs font-mono text-black/40">
              {appOwner?.id}
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm text-black/60">
          <p>
            Evolu keeps your data in device SQLite first and syncs end-to-end
            encrypted when you restore with the same mnemonic on another
            browser.
          </p>
          {ownerProfiles.length > 1 && (
            <p className="mt-3 rounded border border-black/10 bg-white px-3 py-2 text-black/70">
              This device has {ownerProfiles.length} registered profiles. Use
              passkeys to switch quickly.
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <button
          className="flex items-center justify-center gap-2 border border-black/20 bg-white px-3 py-3 text-sm font-medium text-black transition-colors hover:border-black hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A]/50"
          onClick={() => setShowMnemonic(!showMnemonic)}
          type="button"
        >
          <IconKey className="h-4 w-4" />
          <span className="hidden sm:inline">
            {showMnemonic ? "Hide mnemonic" : "Show mnemonic"}
          </span>
          <span className="sm:hidden">Mnemonic</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 border border-black/20 bg-white px-3 py-3 text-sm font-medium text-black transition-colors hover:border-black hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A]/50"
          onClick={handleRestoreClick}
          type="button"
        >
          <IconSparkles className="h-4 w-4" />
          <span className="hidden sm:inline">Restore data</span>
          <span className="sm:hidden">Restore</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 border border-black/20 bg-white px-3 py-3 text-sm font-medium text-black transition-colors hover:border-black hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A]/50"
          onClick={handleResetClick}
          type="button"
        >
          <IconTrash className="h-4 w-4" />
          <span className="hidden sm:inline">Reset device</span>
          <span className="sm:hidden">Reset</span>
        </button>
      </div>

      {showMnemonic && appOwner?.mnemonic && (
        <div className="rounded border border-black/10 bg-black/5 p-4 text-sm">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-black/60">
            Your mnemonic (store securely)
          </p>
          <p className="font-mono text-xs leading-relaxed text-black/80">
            {appOwner.mnemonic}
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="bg-[#F7931A] px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#F7931A]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A]/50"
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
              className="border border-black/20 bg-white px-4 py-1.5 text-xs font-medium text-black transition-colors hover:border-black hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A]/50"
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
