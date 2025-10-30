/**
 * Home page component that displays the landing page with:
 * - Room access form
 * - Animated background
 * - Feature showcase grid
 * - About and latency test buttons
 * - Server status indicator
 *
 * By Dulapah Vibulsanti (https://dulapahv.dev)
 */

import { Suspense } from 'react';
import Image from 'next/image';

import { AboutButton } from '@/components/about-button';
import { AnimatedGridBackground } from '@/components/animated-grid-bg';
import { ContributeDropdown } from '@/components/contribute-dropdown';
import { LatencyTestButton } from '@/components/latency-test-button';
import { RoomAccessForm } from '@/components/room-access-form';
import { ShowcaseGrid } from '@/components/showcase-grid';
import { Status } from '@/components/status';

export default async function Page({ searchParams }: PageProps<'/'>) {
  const params = await searchParams;
  const roomId = params.room?.toString() || '';

  return (
    <>
      {/* Dark theme background with subtle noise texture */}
      <div
        aria-hidden="true"
        role="presentation"
        className="fixed inset-0 -z-10 bg-black"
      />
      <div
        aria-hidden="true"
        role="presentation"
        className="fixed inset-0 -z-10 bg-[url('/images/noise.png')] opacity-[0.03]"
      />
      <div
        aria-hidden="true"
        role="presentation"
        className="fixed inset-0 -z-10 bg-gradient-to-tr from-[#111] via-[#0f0f0f] to-[#151515]"
      />
      <div
        aria-hidden="true"
        role="presentation"
        className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent
          to-[#0c0c0c]/80"
      />
      <div className="dark fixed inset-0 -z-10">
        <AnimatedGridBackground />
      </div>

      {/* Accent glow effects */}
      <div
        aria-hidden="true"
        role="presentation"
        className="fixed -left-20 top-20 -z-10 h-72 w-72 rounded-full bg-purple-900/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        role="presentation"
        className="fixed -right-20 bottom-20 -z-10 h-72 w-72 rounded-full bg-blue-900/20
          blur-[100px]"
      />

      <main
        className="dark relative flex min-h-full w-full flex-col overflow-hidden
          min-[1189px]:flex-row"
      >
        {/* Left Section - Hero and Form */}
        <div
          className="my-2 flex min-h-[700px] w-full flex-col justify-center p-4 min-[560px]:p-8
            min-[1189px]:w-5/12 min-[1189px]:items-center"
        >
          <div className="w-full max-w-xl">
            <div className="mb-8 space-y-8">
              {/* Logo and Tagline */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br
                      from-purple-600 to-blue-600 shadow-lg shadow-purple-900/20"
                  >
                    <Image
                      src="/images/codex-logo.svg"
                      alt="CodeX Logo"
                      width={28}
                      height={28}
                      className="size-7"
                      priority
                    />
                  </div>
                  <h2
                    className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold
                      text-transparent"
                  >
                    LaughLogic Lab&apos;s
                  </h2>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Collaborative coding</span>
                <span
                  className="mt-1 block bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600
                    bg-clip-text text-transparent"
                >
                  for modern teams
                </span>
              </h1>

              {/* Value Proposition */}
              <p className="max-w-xl text-lg text-gray-400 sm:text-xl">
                Don&apos;t just code alone - code together in real-time.
                Seamless collaboration with powerful tools for pair programming
                and team productivity.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2">
                <span
                  className="inline-flex items-center rounded-full bg-purple-950/30 px-3 py-1 text-xs
                    font-medium text-purple-300"
                >
                  Real-time collaboration
                </span>
                <span
                  className="inline-flex items-center rounded-full bg-blue-950/30 px-3 py-1 text-xs
                    font-medium text-blue-300"
                >
                  Code execution
                </span>
                <span
                  className="inline-flex items-center rounded-full bg-indigo-950/30 px-3 py-1 text-xs
                    font-medium text-indigo-300"
                >
                  GitHub integration
                </span>
                <span
                  className="inline-flex items-center rounded-full bg-violet-950/30 px-3 py-1 text-xs
                    font-medium text-violet-300"
                >
                  Live preview
                </span>
              </div>
            </div>

            <Suspense fallback={null}>
              <RoomAccessForm roomId={roomId} />
            </Suspense>
          </div>
        </div>

        {/* Right Section - Showcase Grid */}
        <div
          className="dark relative flex w-full max-w-5xl flex-1 items-center justify-center
            min-[1189px]:w-7/12 min-[1189px]:pr-8"
        >
          <ShowcaseGrid />
        </div>

        <div className="dark fixed bottom-2.5 right-3 flex items-center gap-x-3">
          <ContributeDropdown />
          <Status />
          <LatencyTestButton />
          <AboutButton />
        </div>
      </main>
    </>
  );
}
