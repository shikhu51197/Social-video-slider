import React from 'react';
import SocialVideoSlider from '../components/SocialVideoSlider';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center p-4">
      {/* 
        This is a clean page containing ONLY the requested component, 
        centered on the screen just like a design preview. 
      */}
      <SocialVideoSlider />
    </div>
  );
}
