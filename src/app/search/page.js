import { gql } from "@apollo/client";
import { client } from "../../lib/client";
import Link from "next/link";
import GameCard from "../../components/GameCard";

// GraphQL query to fetch a buffer of games (max 100)
const SEARCH_GAMES_QUERY = gql`
  query SearchGames {
    games(first: 100) { 
      nodes {
        slug
        title
        platforms {
          nodes { name }
        }
        gameData {
          releaseYear
          developer
          boxArt {
            node { sourceUrl altText }
          }
        }
      }
    }
  }
`;

// This Next.js page component receives search parameters from the URL
export default async function SearchPage({ searchParams }) {
  // --- FIX: AWAIT searchParams to resolve the Promise ---
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams.q || ''; // Access property after unwrapping
  const lowerCaseQuery = searchQuery.toLowerCase();

  let games = [];
  let filteredGames = [];
  
  if (searchQuery) { 
    const { data } = await client.query({
      query: SEARCH_GAMES_QUERY,
      fetchPolicy: "no-cache", 
    });
    
    games = data?.games?.nodes || [];

    // --- FRONTEND FILTERING LOGIC ---
    filteredGames = games.filter(game => 
      game.title.toLowerCase().includes(lowerCaseQuery)
    );
  } else {
    filteredGames = []; 
  }


  return (
    <main className="p-8 max-w-7xl mx-auto min-h-screen">
      <nav className="text-sm font-medium mb-8">
        <Link href="/" className="text-slate-400 hover:text-rw-orange transition-colors">
          Home
        </Link>
        <span className="text-slate-600 mx-2">/</span>
        <span className="text-slate-200">Results for: <span className="font-bold text-white">"{searchQuery}"</span></span>
      </nav>

      <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-rw-orange to-purple-500 mb-8 tracking-tight pb-2">
        Search Results ({filteredGames.length})
      </h1>

      {searchQuery ? (
        filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-lg mt-10">No games found matching your search. Try a different term.</p>
        )
      ) : (
        <p className="text-slate-400 text-lg mt-10">Please enter a search query in the navigation bar to begin.</p>
      )}
    </main>
  );
}