// src/app/game/[slug]/page.js
import { gql } from "@apollo/client";
import { client } from "../../../lib/client";
import Image from "next/image";
import ImageModal from "../../../components/ImageModal";
import Breadcrumbs from "../../../components/Breadcrumbs";

const GET_GAME_QUERY = gql`
  query GetGameBySlug($slug: ID!) {
    game(id: $slug, idType: SLUG) {
      title
      content(format: RENDERED)
      platforms {
        nodes { name slug }
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
`;

export default async function GameDetails({ params }) {
  const { slug } = await params;

  const { data } = await client.query({
    query: GET_GAME_QUERY,
    variables: { slug: slug },
    fetchPolicy: "no-cache",
  });

  const game = data?.game;

  if (!game) return <div className="p-20 text-center text-slate-500">Game cartridge not found.</div>;

  const boxArtUrl = game.gameData.boxArt?.node?.sourceUrl;
  const boxArtAlt = game.gameData.boxArt?.node?.altText || game.title;

  return (
    <main className="relative min-h-screen pb-20">
      {/* Ambient Background Blur */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
        {boxArtUrl && (
          <Image
            src={boxArtUrl}
            alt="Background"
            fill
            className="object-cover blur-[100px]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            ...(game.platforms?.nodes?.[0] ? [{ label: game.platforms.nodes[0].name, href: `/platform/${game.platforms.nodes[0].slug}` }] : []),
            { label: game.title }
          ]}
        />
        
        {/* Main Glass Card - THIS IS THE CONTAINER THAT NEEDS ROUNDING AND OVERFLOW */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          {/* The md:flex needs to be inside the overflow-hidden parent */}
          <div className="md:flex">
            
            {/* The ImageModal component will render its clickable preview here */}
            {/* It should now fit perfectly within the rounded parent container */}
            <ImageModal 
                src={boxArtUrl} 
                alt={boxArtAlt}
            />

            {/* Details Section */}
            <div className="p-8 md:w-7/12 flex flex-col">
              
              {/* Header */}
              <div className="mb-8">
                {/* Platform Logo */}
                {game.platforms?.nodes?.[0] && (
                  <div className="mb-4">
                    <Image
                      src={`/${game.platforms.nodes[0].slug}_logo.webp`}
                      alt={`${game.platforms.nodes[0].name} logo`}
                      width={260}
                      height={130}
                      className="w-[260px] h-[65px] object-contain"
                    />
                  </div>
                )}

                <h1 className="text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">
                  {game.title}
                </h1>

                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-xs font-bold uppercase tracking-widest">
                    {game.gameData.releaseYear}
                  </span>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-8 mb-10 border-y border-white/5 py-8">
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-widest font-bold mb-2">Developer</span>
                  <span className="font-medium text-white text-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    {game.gameData.developer}
                  </span>
                </div>
                 <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-widest font-bold mb-2">Region</span>
                  <span className="font-medium text-white text-lg">NTSC-U / PAL</span>
                </div>
              </div>

              {/* Description Section */}
              <div className="border-t border-white/5 pt-6">
                <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0 1 1 0 002 0zm-1 8a1 1 0 01-1-1v-4a1 1 0 00-1-1 1 1 0 112 0v4a1 1 0 01-1 1z"></path></svg>
                  Database Entry
                </h3>
                
                {game.content && (
                  <div 
                    className="wp-content prose prose-invert max-w-none text-slate-300 leading-relaxed font-light"
                    dangerouslySetInnerHTML={{ __html: game.content }} 
                  />
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}