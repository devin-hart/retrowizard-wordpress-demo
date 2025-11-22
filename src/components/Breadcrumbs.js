import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="mb-8 text-sm font-medium">
      <ol className="flex items-center gap-2 text-slate-400">
        <li>
          <Link href="/" className="hover:text-rw-orange transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-slate-600">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-rw-orange transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-200">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
