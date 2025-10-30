/**
 * Showcase grid component for displaying feature highlights.
 * Features:
 * - Image grid layout
 * - Feature descriptions
 * - Icon integration
 *
 * By Dulapah Vibulsanti (https://dulapahv.dev)
 */

import type { ReactNode } from 'react';
import Image from 'next/image';

import {
  Code2,
  GitPullRequestCreateArrow,
  LayoutTemplate,
  NotebookPen,
  Terminal,
  Video,
} from 'lucide-react';

interface ShowcaseImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const showcaseImages: ShowcaseImage[] = [
  {
    src: '/images/showcase/collaborate.png',
    alt: 'Real-time collaboration',
    title: 'Real-time Collaboration',
    description:
      'Code together in real-time with cursor sharing, highlighting, and follow mode',
    icon: <Code2 className="size-4" />,
  },
  {
    src: '/images/showcase/terminal.png',
    alt: 'Shared terminal',
    title: 'Shared Terminal',
    description:
      'Execute code and see results together with over 80 supported languages',
    icon: <Terminal className="size-4" />,
  },
  {
    src: '/images/showcase/live-preview.png',
    alt: 'Live preview',
    title: 'Live Preview',
    description:
      'Preview UI changes instantly with loaded libraries like Tailwind CSS, and more',
    icon: <LayoutTemplate className="size-4" />,
  },
  {
    src: '/images/showcase/github.png',
    alt: 'GitHub integrated',
    title: 'GitHub Integrated',
    description: 'Save your work and open files from your repositories',
    icon: <GitPullRequestCreateArrow className="size-4" />,
  },
  {
    src: '/images/showcase/notepad.png',
    alt: 'Shared notepad',
    title: 'Shared Notepad',
    description:
      'Take notes together in real-time with rich text and markdown support',
    icon: <NotebookPen className="size-4" />,
  },
  {
    src: '/images/showcase/video.png',
    alt: 'Video and voice',
    title: 'Video & Voice',
    description: 'Communicate with your team using video and voice chat',
    icon: <Video className="size-4" />,
  },
];

const ShowcaseCard = ({ image }: { image: ShowcaseImage }) => (
  <div
    className="group relative min-h-[300px] w-full overflow-hidden rounded-xl border border-zinc-800/50
      bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm shadow-lg hover:shadow-xl
      hover:border-purple-500/30 transition-all duration-300 ease-in-out"
  >
    <div className="relative aspect-video w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60"></div>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="(min-width: 1189px) 33vw, (min-width: 560px) 50vw, 100vw"
        className="rounded-t-xl object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
      />
    </div>
    <div className="min-h-28 p-5 relative">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-full bg-purple-500/20 p-2.5 text-purple-400 shadow-sm shadow-purple-500/20">
          {image.icon}
        </span>
        <h1 className="text-white text-lg font-semibold tracking-tight">
          {image.title}
        </h1>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed">{image.description}</p>
    </div>
  </div>
);

const ShowcaseGrid = () => (
  <div className="grid w-full auto-rows-max gap-8">
    <div className="mb-4 text-center">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-3">
        Powerful Features
      </h2>
      <p className="text-zinc-400 max-w-2xl mx-auto">
        Everything you need for seamless collaborative coding in one platform
      </p>
    </div>
    
    {/* Mobile: Single column */}
    <div className="grid grid-cols-1 gap-8 px-4 min-[560px]:hidden">
      {showcaseImages.map((image) => (
        <ShowcaseCard key={image.title} image={image} />
      ))}
    </div>

    {/* Tablet: Two columns with stagger */}
    <div className="hidden grid-cols-2 gap-8 px-8 min-[560px]:grid min-[1189px]:hidden">
      <div className="space-y-8">
        {showcaseImages.slice(0, 3).map((image) => (
          <ShowcaseCard key={image.title} image={image} />
        ))}
      </div>
      <div className="mt-16 space-y-8">
        {showcaseImages.slice(3, 6).map((image) => (
          <ShowcaseCard key={image.title} image={image} />
        ))}
      </div>
    </div>

    {/* Desktop: Three columns with stagger */}
    <div className="hidden grid-cols-3 gap-8 min-[1189px]:grid">
      <div className="space-y-8">
        {showcaseImages.slice(0, 2).map((image) => (
          <ShowcaseCard key={image.title} image={image} />
        ))}
      </div>
      <div className="mt-16 space-y-8">
        {showcaseImages.slice(2, 4).map((image) => (
          <ShowcaseCard key={image.title} image={image} />
        ))}
      </div>
      <div className="mt-32 space-y-8">
        {showcaseImages.slice(4, 6).map((image) => (
          <ShowcaseCard key={image.title} image={image} />
        ))}
      </div>
    </div>
  </div>
);

export { ShowcaseGrid };
