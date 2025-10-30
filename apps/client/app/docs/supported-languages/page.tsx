/**
 * Page: Supported Execution Languages
 * Fetches Piston runtimes and lists supported languages and versions.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Supported Execution Languages',
  description:
    'Languages supported by the code execution engine (powered by Piston).',
};

type PistonRuntime = {
  language: string;
  version: string;
  aliases?: string[];
};

async function getRuntimes(): Promise<PistonRuntime[]> {
  const res = await fetch('https://emkc.org/api/v2/piston/runtimes', {
    // No-cache to keep list fresh, but fine to be static in production
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return (await res.json()) as PistonRuntime[];
}

export default async function Page() {
  const runtimes = await getRuntimes();
  const byLang = new Map<string, string[]>();

  for (const r of runtimes) {
    const key = r.language.toLowerCase();
    const arr = byLang.get(key) ?? [];
    arr.push(r.version);
    byLang.set(key, arr);
  }

  const items = Array.from(byLang.entries()).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">
        Supported Execution Languages
      </h1>
      <p className="text-foreground/70 mb-6 text-sm">
        This list is fetched from the Piston API at request time. For the most
        up-to-date details, see the Piston repository.
      </p>
      {items.length === 0 ? (
        <p>Unable to load runtimes at the moment. Please try again later.</p>
      ) : (
        <ul className="space-y-3">
          {items.map(([lang, versions]) => (
            <li key={lang} className="rounded border p-3">
              <div className="font-medium capitalize">{lang}</div>
              <div className="text-foreground/70 text-xs">
                Versions: {versions.sort().join(', ')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
