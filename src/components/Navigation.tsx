import { Link } from "@tanstack/react-router";
import {
  IconChartBar,
  IconHome,
  IconTrophy,
} from "@tabler/icons-react";

export const Navigation = () => {
  return (
    <nav className="sticky bottom-0 left-0 right-0 border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-around px-4">
        <Link
          to="/"
          className="flex flex-1 flex-col items-center gap-1 py-3 text-black/60 transition-colors hover:text-[#F7931A] active:text-[#F7931A]"
          activeProps={{
            className:
              "flex flex-1 flex-col items-center gap-1 py-3 text-[#F7931A]",
          }}
        >
          <IconHome size={24} stroke={1.5} />
          <span className="text-xs font-medium">Home</span>
        </Link>

        <Link
          to="/match"
          className="flex flex-1 flex-col items-center gap-1 py-3 text-black/60 transition-colors hover:text-[#F7931A] active:text-[#F7931A]"
          activeProps={{
            className:
              "flex flex-1 flex-col items-center gap-1 py-3 text-[#F7931A]",
          }}
        >
          <IconTrophy size={24} stroke={1.5} />
          <span className="text-xs font-medium">Match</span>
        </Link>

        <Link
          to="/stats"
          className="flex flex-1 flex-col items-center gap-1 py-3 text-black/60 transition-colors hover:text-[#F7931A] active:text-[#F7931A]"
          activeProps={{
            className:
              "flex flex-1 flex-col items-center gap-1 py-3 text-[#F7931A]",
          }}
        >
          <IconChartBar size={24} stroke={1.5} />
          <span className="text-xs font-medium">Stats</span>
        </Link>
      </div>
    </nav>
  );
};
