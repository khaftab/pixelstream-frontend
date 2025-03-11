"use client";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

type VideoPlayerProps = {
  src: string;
  play?: boolean;
  poster?: string;
  aspectRatio?: string; // Add aspect ratio prop
};

const VideoPlayer = ({ src, play, poster, aspectRatio = "16/9" }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  // @ts-ignore
  const [levels, setLevels] = useState<Hls.Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let hls: Hls | null = null;
    setIsLoading(true);

    if (Hls.isSupported() && videoRef.current) {
      hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        if (data.levels.length > 0) {
          setLevels(data.levels);
          setIsLoading(false);
        }
      });
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
      setLevels([
        { height: 720, width: 1280, bitrate: 0, name: "720p" },
        { height: 480, width: 854, bitrate: 0, name: "480p" },
      ]);
      setIsLoading(false);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = parseInt(e.target.value, 10);
    setSelectedLevel(level);

    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
    } else if (videoRef.current && level >= 0 && levels[level]) {
      const height = levels[level].height;
      const qualitySrc = src.replace("master.m3u8", `${height}p.m3u8`);
      videoRef.current.src = qualitySrc;
      const currentTime = videoRef.current.currentTime;
      const wasPlaying = !videoRef.current.paused;

      videoRef.current.load();
      videoRef.current.currentTime = currentTime;
      if (wasPlaying) {
        videoRef.current.play();
      }
    }
  };

  return (
    <div className="relative group">
      {/* Add wrapper div with fixed aspect ratio */}
      <div className={`relative w-full ${isLoading ? "bg-gray-900" : ""}`} style={{ aspectRatio }}>
        <video
          ref={videoRef}
          controls
          className="w-full h-full object-cover absolute top-0 left-0"
          playsInline
          poster={poster}
          autoPlay={play}
          onLoadedData={() => setIsLoading(false)}
        />
      </div>
      {levels.length > 0 && (
        <div className="absolute bottom-[70px] right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center bg-[#1a1a1a] rounded-md shadow-lg">
            <span className="text-white text-xs px-2">Quality</span>
            <select
              value={selectedLevel}
              onChange={handleQualityChange}
              className="text-white text-sm bg-transparent border-none outline-none px-2 py-1.5 appearance-none cursor-pointer hover:bg-black/30 rounded-r-md focus:outline-none"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
              }}
            >
              <option value={-1} className="bg-[#1a1a1a]">
                Auto
              </option>
              {levels.map((level, index) => (
                <option key={index} value={index} className="bg-[#1a1a1a]">
                  {level.height}p
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
