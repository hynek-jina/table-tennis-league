import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import { EvoluProvider, evolu } from "../evolu/client";

export const Route = createRootRoute({
  component: () => (
    <EvoluProvider value={evolu}>
      <Suspense
        fallback={
          <div className="p-6 text-center text-black/40">Loading…</div>
        }
      >
        <Outlet />
      </Suspense>
    </EvoluProvider>
  ),
});
