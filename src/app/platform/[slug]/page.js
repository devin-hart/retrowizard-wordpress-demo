import { gql } from "@apollo/client";
import { client } from "../../../lib/client";
import Image from "next/image";
import PlatformGames from "../../../components/PlatformGames";
import Breadcrumbs from "../../../components/Breadcrumbs";

const GET_PLATFORM_GAMES = gql`
  query GetPlatformGames($slug: ID!) {
    platform(id: $slug, idType: SLUG) {
      name
      platformDetails {
        platformDescription
        platformImage {
          node {
            sourceUrl
            altText
          }
        }
      }
      games {
        nodes {
          slug
          title
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
  }
`;

// Local console images mapping
const consoleImages = {
  'sega-genesis': '/sega-genesis.webp',
  'snes': '/snes.webp',
  'turbografx-16': '/turbografx-16.webp'
};

export default async function PlatformPage({ params }) {
  const { slug } = await params;

  const { data } = await client.query({
    query: GET_PLATFORM_GAMES,
    variables: { slug: slug },
    fetchPolicy: "no-cache",
  });

  const platform = data?.platform;
  const games = platform?.games?.nodes || [];

  // Extract ACF platform data for description, use local console images
  const platformInfo = {
    description: platform?.platformDetails?.platformDescription,
    image: consoleImages[slug], // Use local console images
    imageAlt: `${platform?.name} console`
  };

  if (!platform) return <div className="p-20 text-center text-slate-400">Platform not found.</div>;

  return (
    <main className="relative p-8 max-w-7xl mx-auto min-h-screen">
      <Breadcrumbs items={[{ label: platform.name }]} />

      {/* Hero Section */}
      {platformInfo.description && (
        <header className="relative mb-16 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          {/* Ambient Background Blur from console image */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20">
            <Image
              src={platformInfo.image}
              alt="Background"
              fill
              className="object-cover blur-[80px] scale-110"
            />
            <div className="absolute inset-0 bg-slate-900/90"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center relative z-10">
            {/* Description - Left on desktop, Bottom on mobile */}
            <div className="order-2 md:order-1 w-full md:w-1/2 p-8 md:p-12">
              {/* Platform Logo */}
              <div className="mb-6">
                <Image
                  src={`/${slug}_logo.webp`}
                  alt={`${platform.name} logo`}
                  width={320}
                  height={160}
                  className="w-[280px] md:w-[320px] h-auto object-contain"
                />
              </div>

              <h1 className="sr-only">
                {platform.name}
              </h1>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">
                {platformInfo.description}
              </p>

              {/* Game count badge */}
              <div className="mt-8 flex items-center gap-3">
                <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                  {games.length} {games.length === 1 ? 'Title' : 'Titles'}
                </span>
              </div>
            </div>

            {/* Image - Right on desktop, Top on mobile */}
            <div className="order-1 md:order-2 w-full md:w-1/2 flex items-center justify-center p-8 md:p-12" role="img" aria-label={`${platform.name} console`}>
              <div className="relative w-full max-w-[500px] aspect-[4/3]">
                <Image
                  src={platformInfo.image}
                  alt={platformInfo.imageAlt || `${platform.name} console`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Games Grid Title */}
      <section className="mb-8 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold text-white">
          Browse All Titles
        </h2>
        <p className="text-slate-400 mt-2">
          {games.length} {games.length === 1 ? 'game' : 'games'} in the archive
        </p>
      </section>

      <PlatformGames games={games} />
    </main>
  );
}