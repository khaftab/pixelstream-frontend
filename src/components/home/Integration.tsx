"use client";
import React, { useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import "../../themes/prism-holi-theme.css";

const IntegrationSection = () => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [isPrismLoaded, setIsPrismLoaded] = React.useState(false);

  // Load Prism.js dynamically on the client side
  useEffect(() => {
    // importing here to avoid SSR hydration issues
    const loadPrism = async () => {
      const Prism = (await import("prismjs")).default;
      // @ts-ignore
      await import("prismjs/components/prism-jsx");
      // @ts-ignore
      await import("prismjs/components/prism-markup");
      // @ts-ignore
      await import("prismjs/components/prism-javascript");
      setIsPrismLoaded(true);
      Prism.highlightAll();
    };

    loadPrism();
  }, []);

  // Highlight code when tab changes and Prism is loaded
  useEffect(() => {
    if (isPrismLoaded) {
      const Prism = require("prismjs");
      Prism.highlightAll();
    }
  }, [activeTab, isPrismLoaded]);

  const codeExamples = [
    {
      title: "HTML",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HLS Video Player</title>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"><\/script>
</head>
<body>
  <div style="max-width: 800px; margin: 0 auto;">
    <video id="video" controls style="width: 100%;"><\/video>
  </div>

  <script>
    const video = document.getElementById('video');
    const videoSrc = 'https://cdn.streamscale.aksdev.me/666d55ed785875a3ffe67865/BigBunnyTrailer/master.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  <\/script>
</body>
</html>`,
    },
    {
      title: "React",
      code: `import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const videoSrc = "https://cdn.streamscale.aksdev.me/666d55ed785875a3ffe67865/BigBunnyTrailer/master.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    }

    return () => {
      if (Hls.isSupported()) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <video ref={videoRef} controls style={{ width: "100%" }} />
    </div>
  );
};

export default VideoPlayer;`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-black pb-16 px-4 relative overflow-hidden">
      {/* Background Blur Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[20%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px] bg-emerald-500" />
        <div className="absolute right-[10%] top-[40%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px] bg-yellow-300" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-100">Simple Integration</h2>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto">
            Choose your preferred integration method. Our player works seamlessly with both HTML and
            React.
          </p>
        </div>

        {/* Code Examples */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden mb-8">
            {/* Code Header */}
            <div className="border-b border-gray-800">
              <div className="flex items-center gap-2 px-4">
                {codeExamples.map((example, index) => (
                  <button
                    key={index}
                    className={`px-4 py-3 text-sm transition-colors ${
                      activeTab === index
                        ? "text-white border-b-2 border-emerald-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {example.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Content */}
            <ScrollArea className="w-full h-[445px] relative">
              <pre className="p-4 text-gray-300 font-mono text-sm bg-gray-950/50 overflow-x-auto">
                <code className={`language-${activeTab === 0 ? "html" : "jsx"}`}>
                  {codeExamples[activeTab].code}
                </code>
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                aria-label={copied ? "Copied!" : "Copy code"}
              >
                {copied ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                title: "Responsive",
                description: "Automatically adapts to any screen size",
              },
              {
                title: "Customizable",
                description: "Easy to style and customize to match your brand",
              },
              {
                title: "Cross-Platform",
                description: "Works on all modern browsers and devices",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4 md:p-6"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400/20 to-yellow-300/20 flex items-center justify-center mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <h4 className="text-white font-medium mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
