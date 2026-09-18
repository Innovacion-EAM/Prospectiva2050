import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="23" cy="22" r="14.5" stroke="currentColor" strokeWidth="3.2" />
      <path
        d="M10.5 23.5c3.2-4.4 7-6.6 12.5-6.6 5.6 0 9.4 2.2 12.6 6.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 23.5c2.4 3.2 5.4 4.8 9 4.8s6.6-1.6 9-4.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="23" cy="20.2" r="2.1" fill="currentColor" />
      <path
        d="M32.2 32.5 38 40"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  variant = "light",
  compact = false,
}: {
  variant?: "light" | "dark";
  compact?: boolean;
}) {
  const light = variant === "light";
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 no-underline"
      aria-label="Horizonte Quindío — inicio"
    >
      <LogoMark
        className={cn("h-11 w-11", light ? "text-paper" : "text-ink")}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[0.7rem] font-extrabold tracking-[0.18em] uppercase sm:text-[0.78rem]",
            light ? "text-paper" : "text-ink",
          )}
        >
          Horizonte Quindío
        </span>
        {!compact ? (
          <span
            className={cn(
              "mt-1 font-display text-[0.58rem] font-semibold tracking-[0.28em] uppercase",
              light ? "text-lime" : "text-muted",
            )}
          >
            Prospectiva 2050
          </span>
        ) : null}
      </span>
    </Link>
  );
}
