/**
 * API route handler for executing code submissions.
 * Makes requests to Piston API for code execution with:
 * - Input validation
 * - Request cancellation support
 * - Execution metadata
 * - Error handling
 *
 * By Dulapah Vibulsanti (https://dulapahv.dev)
 */

import { NextResponse } from 'next/server';

// export const runtime = 'edge';

const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

interface RequestBody {
  code: string;
  language: string;
  args?: string[];
  stdin?: string;
}

// Map editor language IDs/aliases to Piston language keys
const LANGUAGE_MAP: Record<string, string> = {
  // Common mappings
  js: 'javascript',
  javascript: 'javascript',
  node: 'javascript',
  nodejs: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  py: 'python',
  python: 'python',
  python3: 'python',
  csharp: 'csharp',
  'c#': 'csharp',
  cpp: 'cpp',
  c: 'c',
  java: 'java',
  go: 'go',
  golang: 'go',
  rust: 'rust',
  php: 'php',
  ruby: 'ruby',
  swift: 'swift',
  kotlin: 'kotlin',
  r: 'r',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  powershell: 'powershell',
  ps1: 'powershell',
  lua: 'lua',
  julia: 'julia',
  zig: 'zig',
  haskell: 'haskell',
  ocaml: 'ocaml',
  nim: 'nim',
  elixir: 'elixir',
  erlang: 'erlang',
};

const normalizeLanguage = (lang: string): string => {
  const key = lang.trim().toLowerCase();
  return LANGUAGE_MAP[key] || key;
};

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    // Validate request body
    if (!body.code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    if (!body.language) {
      return NextResponse.json(
        { error: 'Language is required' },
        { status: 400 },
      );
    }

    const controller = new AbortController();
    request.signal.addEventListener('abort', () => {
      controller.abort();
    });

    const response = await fetch(PISTON_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: normalizeLanguage(body.language),
        version: '*',
        files: [{ content: body.code }],
        stdin: body.stdin || '',
        args: Array.isArray(body.args) ? body.args : [],
        run_timeout: 30000, // 30 seconds timeout
        compile_timeout: 30000,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      let details: unknown = undefined;
      try {
        // Piston may return JSON body with error info; fall back to text
        const raw = await response.text();
        try {
          details = JSON.parse(raw);
        } catch {
          details = raw;
        }
      } catch {}

      return NextResponse.json(
        { error: 'Piston API error', details },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Add execution metadata to response
    const metadata = {
      args: body.args || [],
      stdin: body.stdin || '',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      ...data,
      metadata,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Code execution cancelled' },
        { status: 499 }, // Using 499 Client Closed Request
      );
    }

    console.error('Code execution error:', error);
    return NextResponse.json(
      { error: 'Failed to execute code' },
      { status: 500 },
    );
  }
}
