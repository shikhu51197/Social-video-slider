import React from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { SocialVideo } from '../data/socialVideos';

interface VideoCardProps {
  video: SocialVideo;
  onClick: (video: SocialVideo) => void;
}

const VerifiedIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.59L6.7 12.3l1.41-1.41L11 13.76l6.88-6.88 1.41 1.41L11 16.59z" />
  </svg>
);

const VerifiedBadge = () => (
  <svg aria-label="Verified" className="ml-1 w-4 h-4 text-blue-500" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12.001 2.006c-1.1 0-2.1.2-3.1.6-.9-.6-2-.9-3.2-.9-2.3 0-4.3 1.6-4.9 3.8-.2.7-.6 1.4-1.2 2-1.2 1.3-1.6 3.3-1 5 .2.7.5 1.3.5 2 0 .7-.3 1.3-.5 2-.6 1.7-.2 3.7 1 5 .6.6 1 1.3 1.2 2 .6 2.2 2.6 3.8 4.9 3.8 1.2 0 2.3-.3 3.2-.9 1 .4 2 .6 3.1.6s2.1-.2 3.1-.6c.9.6 2 .9 3.2.9 2.3 0 4.3-1.6 4.9-3.8.2-.7.6-1.4 1.2-2 1.2-1.3 1.6-3.3 1-5-.2-.7-.5-1.3-.5-2 0-.7.3-1.3.5-2 .6-1.7.2-3.7-1-5-.6-.6-1-1.3-1.2-2-.6-2.2-2.6-3.8-4.9-3.8-1.2 0-2.3.3-3.2.9-1-.4-2-.6-3.1-.6z"></path>
    <path fill="#fff" d="M10.8 17.5l-4.5-4.5 1.5-1.5 3 3 6.8-6.8 1.5 1.5-8.3 8.3z"></path>
  </svg>
);


export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div 
      className="flex flex-col w-[400px] max-w-full bg-white rounded-xl border border-zinc-200 overflow-hidden shrink-0 shadow-sm"
      role="article"
      aria-label={`Post by ${video.title}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          {/* Profile Image with Instagram-style gradient border */}
          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 cursor-pointer">
            <div className="bg-white p-0.5 rounded-full">
              <img
                src={video.profileImageUrl || 'https://via.placeholder.com/150'}
                alt={video.title}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center cursor-pointer">
              <span className="font-semibold text-sm text-zinc-900 mr-1">{video.title}</span>
              {video.isVerified && <VerifiedBadge />}
            </div>
            {video.followersCount && (
              <span className="text-xs text-zinc-500">{video.followersCount}</span>
            )}
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-4 py-1.5 rounded-md transition-colors">
          View profile
        </button>
      </div>

      {/* Media (Image/Video) */}
      <div 
        className="relative w-full aspect-square bg-zinc-100 cursor-pointer group shrink-0 overflow-hidden"
        onClick={() => onClick(video)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(video);
          }
        }}
      >
        <img
          src={video.thumbnailUrl}
          alt={`Thumbnail for ${video.title}'s post`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Footer */}
      <div className="p-4 flex flex-col gap-3">
        {/* Actions Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button aria-label="Like" className="hover:opacity-60 transition-opacity">
              <Heart className="w-6 h-6 text-zinc-900" />
            </button>
            <button aria-label="Comment" className="hover:opacity-60 transition-opacity">
              <MessageCircle className="w-6 h-6 text-zinc-900" />
            </button>
            <button aria-label="Share" className="hover:opacity-60 transition-opacity">
              <Send className="w-6 h-6 text-zinc-900" />
            </button>
          </div>
          <button aria-label="Save" className="hover:opacity-60 transition-opacity">
            <Bookmark className="w-6 h-6 text-zinc-900" />
          </button>
        </div>

        {/* Likes Count */}
        {video.likesCount && (
          <div className="font-semibold text-sm text-zinc-900">
            {video.likesCount} Likes
          </div>
        )}

        {/* Description */}
        <div className="text-sm text-zinc-900 h-10 line-clamp-2">
          <span className="font-semibold mr-2">{video.title}</span>
          <span>{video.description}</span>
        </div>

        {/* View more link */}
        <div className="mt-2 text-sm">
          <a
            href={video.videoUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-semibold hover:underline"
          >
            View more on {video.platform}
          </a>
        </div>
      </div>
    </div>
  );
}
