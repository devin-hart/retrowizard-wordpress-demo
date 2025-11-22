"use client";

import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

export default function PlatformGames({ games }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Minimum display time of 0.5 seconds for skeleton
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for fade-out animation to complete before showing content
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (games.length === 0 && !isLoading) {
    return (
      <div className="text-center py-20 text-slate-500 bg-slate-900/50 rounded-xl border border-dashed border-white/10 backdrop-blur-sm fade-in">
        No games found for this system yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {isLoading ? (
        // Show skeleton loaders
        Array.from({ length: 10 }).map((_, i) => (
          <GameCardSkeleton key={i} className={isFadingOut ? "fade-out" : ""} />
        ))
      ) : (
        // Show actual game cards with fade-in
        games.map((game, index) => (
          <GameCard
            key={game.slug}
            game={game}
            className="fade-in"
            style={{ animationDelay: `${index * 0.03}s` }}
          />
        ))
      )}
    </div>
  );
}
