/**
 * Live preview component that renders HTML with Sandpack.
 * Features:
 * - Real-time preview updates
 * - Tailwind CSS support
 * - Theme-aware rendering
 * - Error handling
 *
 * By Dulapah Vibulsanti (https://dulapahv.dev)
 */

import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';

import { DISABLE_TAILWIND_CDN_WARN, SANDPACK_CDN } from '@/lib/constants';

import { HelpPopover } from './components/help-popover';

interface LivePreviewProps {
  value: string;
  language: string;
}

const buildHtml = (value: string, language: string) => {
  const lang = (language || '').toLowerCase();
  if (lang === 'html') {
    return `<!DOCTYPE html><html><head>${DISABLE_TAILWIND_CDN_WARN}${SANDPACK_CDN}</head><body class="h-screen">${value}</body></html>`;
  }
  if (lang === 'css') {
    return `<!DOCTYPE html><html><head>${DISABLE_TAILWIND_CDN_WARN}${SANDPACK_CDN}<style>${value}</style></head><body class="h-screen p-4"><div class="prose mx-auto"><h1>CSS Preview</h1><p>Your styles are applied to this page.</p></div></body></html>`;
  }
  if (lang === 'javascript') {
    return `<!DOCTYPE html><html><head>${DISABLE_TAILWIND_CDN_WARN}${SANDPACK_CDN}</head><body class="h-screen p-4"><div id="app" class="prose mx-auto"><h1>JavaScript Preview</h1></div><script type="module">${value}</script></body></html>`;
  }
  // Fallback: render as plain HTML content
  return `<!DOCTYPE html><html><head>${DISABLE_TAILWIND_CDN_WARN}${SANDPACK_CDN}</head><body class="h-screen">${value}</body></html>`;
};

const LivePreview = ({ value, language }: LivePreviewProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <SandpackProvider
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      template="static"
      className="!h-full"
      files={{
        'index.html': buildHtml(value, language),
      }}
      options={{
        initMode: 'user-visible',
      }}
    >
      <SandpackLayout className="!h-full !rounded-none !border-none">
        <SandpackPreview
          className="!h-full"
          showOpenInCodeSandbox={false}
          actionsChildren={<HelpPopover />}
        />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export { LivePreview };
