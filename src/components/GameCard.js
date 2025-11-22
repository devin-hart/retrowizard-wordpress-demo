import Link from "next/link";
import Image from "next/image";

export default function GameCard({ game, className = "", style = {} }) {
  return (
    <Link
      href={`/game/${game.slug}`}
      className={`group relative rounded-xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-300 overflow-hidden backdrop-blur-sm hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20 hover:shadow-2xl ${className}`}
      style={style}
    >
      {/* Box Art */}
      <div className="relative aspect-[3/4] bg-slate-950">
        {game.gameData?.boxArt?.node ? (
          <Image
            src={game.gameData.boxArt.node.sourceUrl}
            alt={game.gameData.boxArt.node.altText || `${game.title} box art`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs font-mono">
            NO IMAGE
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" aria-hidden="true"></div>
      </div>

      {/* Meta */}
      <div className="p-4 absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 to-transparent pt-12">
        <h3 className="font-bold text-white truncate group-hover:text-rw-orange transition text-lg drop-shadow-md">
          {game.title}
        </h3>
        <div className="text-xs text-slate-300 mt-1 flex justify-between font-medium">
          <time dateTime={game.gameData?.releaseYear}>
            {game.gameData?.releaseYear}
          </time>
          <span className="truncate max-w-[50%] text-right">{game.gameData?.developer}</span>
        </div>
      </div>
    </Link>
  );
}
