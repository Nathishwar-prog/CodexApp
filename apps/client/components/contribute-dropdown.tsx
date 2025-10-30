/**
 * Dropdown component for contribution information.
 * Features:
 * - GitHub contribution instructions
 * - Creator information
 * - Social media links
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';

import { ChevronDown, Github, Linkedin } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ContributeDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-black/40 px-3 py-2
            text-sm font-medium text-white transition-all hover:bg-black/60"
          aria-label="Open contribution information"
        >
          Open to Contribute
          <ChevronDown
            className={`ml-1 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[300px] border border-zinc-800 bg-zinc-900 p-4 text-white"
      >
        <div className="mb-3">
          <h3
            className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-lg font-bold
              text-transparent"
          >
            Contribute on GitHub
          </h3>
          <p className="mt-2 text-sm text-zinc-300">
            This project is open source. Star the repository and follow these
            steps to contribute:
          </p>
          <ol className="ml-4 mt-2 list-decimal text-sm text-zinc-300">
            <li>Fork the repository</li>
            <li>Create a feature branch</li>
            <li>Make your changes</li>
            <li>Submit a pull request</li>
          </ol>
          <Link
            href="https://github.com/Nathishwar-prog/codexapp"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm
              font-medium text-white transition-colors hover:bg-zinc-700"
          >
            <Github className="h-4 w-4" />
            Star on GitHub
          </Link>
        </div>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <div className="mt-3">
          <h3 className="text-lg font-bold">Meet the Creator</h3>
          <p className="mt-2 text-sm text-zinc-300">
            Nathishwar - AI Full Stack Developer
          </p>
          <div className="mt-3 flex gap-2">
            <Link
              href="https://github.com/Nathishwar-prog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm font-medium
                text-white transition-colors hover:bg-zinc-700"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/nathishwar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm font-medium
                text-white transition-colors hover:bg-zinc-700"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Link>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
