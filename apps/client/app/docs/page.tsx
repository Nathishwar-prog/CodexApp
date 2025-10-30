/**
 * Docs Index Page
 */

import Link from 'next/link';

export default function DocsIndex() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Documentation</h1>
      <ul className="list-inside list-disc space-y-2">
        <li>
          <Link className="underline" href="/docs/supported-languages">
            Supported Execution Languages
          </Link>
        </li>
      </ul>
    </main>
  );
}
