"use client";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      return () => {
        hls.destroy();
      };
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      // For Safari
      videoRef.current.src = src;
    }
  }, [src]);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        className="w-full h-full object-cover"
        playsInline
        poster="/thumbnail.png"
      />
    </div>
  );
};

export default VideoPlayer;
