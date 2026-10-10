export type Platform = 'instagram' | 'facebook' | 'youtube';

export interface SocialVideo {
  id: string;
  platform: Platform;
  title: string; // The username for the post
  description?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  embedUrl?: string;
  // New fields for the design
  profileImageUrl?: string;
  followersCount?: string;
  isVerified?: boolean;
  likesCount?: string;
}

export const socialVideosData: SocialVideo[] = [
  {
    id: '1',
    platform: 'instagram',
    title: 'balajifinserv_emihaiinna',
    profileImageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    followersCount: '2.2M Followers',
    isVerified: true,
    likesCount: '4,447',
    description: "Slice through your worries with easy EMI's! 🍋 Fresh deals await. #EMIHahna #BalajiFinserv",
    thumbnailUrl: 'https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=800&auto=format&fit=crop', // Lemon image
    videoUrl: 'https://www.instagram.com/reels/DeSvUnty8RF/',
  },
  {
    id: '2',
    platform: 'facebook',
    title: 'tech_store_official',
    profileImageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop',
    followersCount: '1.5M Followers',
    isVerified: true,
    likesCount: '12,592',
    description: 'Unboxing the latest smartphone! 📱 Check out these incredible features.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.facebook.com/watch/?v=something',
  },
  {
    id: '3',
    platform: 'youtube',
    title: 'travel_diaries',
    profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    followersCount: '850K Subscribers',
    isVerified: false,
    likesCount: '8,304',
    description: 'Top 10 hidden beaches you MUST visit this summer 🏖️',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=iemsSO8q6SY',
    embedUrl: 'https://www.youtube.com/watch?v=iemsSO8q6SY',
  }
];
