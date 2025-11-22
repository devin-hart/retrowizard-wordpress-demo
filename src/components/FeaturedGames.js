"use client";

import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

export default function FeaturedGames({ games }) {
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

  return (
    <section aria-labelledby="featured-games">
      <h2 id="featured-games" className="sr-only">Featured Games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Show skeleton loaders
          Array.from({ length: 16 }).map((_, i) => (
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
    </section>
  );
}
