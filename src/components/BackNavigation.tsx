import { Link } from "@tanstack/react-router";
import { IconArrowLeft } from "@tabler/icons-react";

export const BackNavigation = () => {
  return (
    <nav className="sticky bottom-0 left-0 right-0 border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-center px-4">
        <Link
          to="/"
          className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium text-black/60 transition-colors hover:text-[#F7931A] active:text-[#F7931A]"
        >
          <IconArrowLeft size={20} stroke={1.5} />
          <span>Back to Home</span>
        </Link>
      </div>
    </nav>
  );
};
