import { gql } from "@apollo/client";
import { client } from "../lib/client";
import Image from "next/image";
import FeaturedGames from "../components/FeaturedGames";

// Systems to feature on the homepage (4 total * 2 games = 8)
const FEATURED_PLATFORMS = ['sega-genesis', 'snes', 'turbografx-16', 'sega-master-system'];

// Fisher-Yates shuffle implementation
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  const newArray = [...array]; 
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]
    ];
  }
  return newArray;
}

const GET_GAMES_QUERY = gql`
  query GetGames {
    games(first: 50) { 
      nodes {
        slug
        title
        platforms {
          nodes { 
            name
            slug
          }
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

export default async function Home() {
  const { data } = await client.query({
    query: GET_GAMES_QUERY,
    fetchPolicy: "no-cache",
  });

  const allGames = data?.games?.nodes || [];
  let finalFeaturedGames = [];

  // --- Filter and Combine Logic (Pulls 3 from SNES to ensure 8 total) ---
  for (const targetSlug of FEATURED_PLATFORMS) {
    const limit = 4; 
    
    const platformGames = allGames.filter(game => 
      game.platforms.nodes.some(p => p.slug === targetSlug)
    );

    const selected = shuffle(platformGames).slice(0, limit); 
    
    finalFeaturedGames = finalFeaturedGames.concat(selected);
  }
  // --- End Logic ---


  return (
    <main className="p-8 max-w-7xl mx-auto">

      {/* Hero Section - Image Background */}
      <header className="relative overflow-hidden rounded-xl shadow-2xl mb-16 w-full crt-effect">
        <Image
          src="/rw-hero.webp"
          alt="Retro Wizard - Your gateway to classic gaming history"
          width={1280}
          height={400}
          className="w-full h-auto"
          priority
        />
      </header>

      {/* Info Section */}
      <section className="mb-16 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Image - Left on desktop, Top on mobile */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
            <Image
              src="/rw-info.webp"
              alt="16-bit gaming era"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Text Content - Right on desktop, Bottom on mobile */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6 tracking-tight">
              The Golden Age of 16-Bit
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                The 16-bit era wasn&apos;t just a technological leap—it was a cultural revolution. From 1988 to 1996, gaming transcended its 8-bit roots and exploded into vibrant worlds of Mode 7 graphics, blast processing, and CD-quality sound.
              </p>
              <p>
                Retro Wizard is a digital shrine to this pivotal moment in gaming history. We&apos;ve meticulously catalogued the legendary titles that defined a generation: from the breakneck speed of Sonic to the epic adventures of Link, from the brutal combos of Street Fighter to the atmospheric horror of Castlevania.
              </p>
              <p className="text-rw-orange font-semibold">
                This is more than nostalgia—it&apos;s preservation. Every pixel, every cartridge, every memory, immortalized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <FeaturedGames games={finalFeaturedGames} />
    </main>
  );
}