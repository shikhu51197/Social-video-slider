'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SocialVideo, socialVideosData } from '../data/socialVideos';
import VideoCard from './VideoCard';

export default function SocialVideoSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeDots, setActiveDots] = useState(0);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);

      const firstChild = scrollContainerRef.current.firstElementChild as HTMLElement;
      if (firstChild) {
        const cardWidth = firstChild.clientWidth + 24; // width + gap
        const index = Math.round(scrollLeft / cardWidth);
        setActiveDots(Math.min(socialVideosData.length - 1, Math.max(0, index)));
      }
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.firstElementChild as HTMLElement;
      const scrollAmount = firstChild ? firstChild.clientWidth + 24 : scrollContainerRef.current.clientWidth;
      
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleVideoClick = (video: SocialVideo) => {
    // This will open in a new browser tab.
    // On mobile devices, the OS will automatically intercept this URL and open the native app if installed.
    const targetUrl = video.videoUrl || video.embedUrl || '#';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-black tracking-tight">
          Latest from social
        </h2>
      </div>

      {/* Slider Container with Absolute Controls */}
      <div className="relative -mx-4 sm:mx-0 group">
        
        {/* Previous Button */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300 ${
            canScrollLeft
              ? 'bg-white text-zinc-900 hover:bg-zinc-100 opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scroll Track */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4 sm:px-0 pb-6 pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {socialVideosData.map((video) => (
            <div key={video.id} className="snap-start shrink-0">
              <VideoCard video={video} onClick={handleVideoClick} />
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300 ${
            canScrollRight
              ? 'bg-white text-zinc-900 hover:bg-zinc-100 opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        <style dangerouslySetInnerHTML={{
          __html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {socialVideosData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (scrollContainerRef.current) {
                const firstChild = scrollContainerRef.current.firstElementChild as HTMLElement;
                const cardWidth = firstChild ? firstChild.clientWidth + 24 : 0;
                scrollContainerRef.current.scrollTo({
                  left: cardWidth * index,
                  behavior: 'smooth'
                });
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeDots ? 'w-8 bg-blue-600' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
