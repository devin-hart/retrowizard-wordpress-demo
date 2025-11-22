import { gql } from "@apollo/client";
import { client } from "../../../lib/client";
import Image from "next/image";
import PlatformGames from "../../../components/PlatformGames";
import Breadcrumbs from "../../../components/Breadcrumbs";

const GET_PLATFORM_GAMES = gql`
  query GetPlatformGames($slug: ID!) {
    platform(id: $slug, idType: SLUG) {
      name
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

// Platform metadata mapping
const platformData = {
  'sega-genesis': {
    image: '/sega-genesis.webp',
    description: 'The Sega Genesis (known as Mega Drive outside North America) revolutionized 16-bit gaming with its blast processing power and iconic library. Home to Sonic the Hedgehog, Streets of Rage, and countless other classics, the Genesis defined cool in the early 90s console wars.'
  },
  'snes': {
    image: '/snes.webp',
    description: 'The Super Nintendo Entertainment System set the gold standard for 16-bit gaming with its Mode 7 graphics, rich color palette, and legendary first-party titles. From Super Mario World to The Legend of Zelda: A Link to the Past, the SNES delivered timeless masterpieces that still resonate today.'
  },
  'turbografx-16': {
    image: '/turbografx-16.webp',
    description: 'The TurboGrafx-16 (PC Engine in Japan) brought cutting-edge technology to the console market with its unique HuCard format and impressive library of shooters and RPGs. Though underrated in the West, it became a powerhouse in Japan with classics like Bonk\'s Adventure and legendary arcade ports.'
  }
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
  const platformInfo = platformData[slug];

  if (!platform) return <div className="p-20 text-center text-slate-400">Platform not found.</div>;

  return (
    <main className="p-8 max-w-7xl mx-auto min-h-screen">
      <Breadcrumbs items={[{ label: platform.name }]} />

      {/* Hero Section */}
      {platformInfo && (
        <header className="mb-16 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-center">
            {/* Description - Left on desktop, Bottom on mobile */}
            <div className="order-2 md:order-1 w-full md:w-1/2 p-8 md:p-12">
              <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-6 tracking-tight">
                {platform.name}
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                {platformInfo.description}
              </p>
            </div>

            {/* Image - Right on desktop, Top on mobile */}
            <div className="order-1 md:order-2 w-full md:w-1/2" role="img" aria-label={`${platform.name} console`}>
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src={platformInfo.image}
                  alt={`${platform.name} console`}
                  fill
                  className="object-contain"
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