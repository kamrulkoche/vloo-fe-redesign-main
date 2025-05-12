"use client";
import { useRef, useState } from "react";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      <video
        ref={videoRef}
        src="/assets/videos/how-it-works.mp4"
        className="h-full w-full object-cover"
        playsInline
        muted
        onClick={handlePlayPause} // Allow play/pause on video click
      />
      {!isPlaying && (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-colors duration-300 hover:bg-opacity-40"
        >
          <img
            src="/assets/icons/blog-play-icon.svg"
            alt="Play video"
            className="h-[50px] w-[50px]"
          />
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
