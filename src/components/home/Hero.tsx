import React from "react";
import VideoPlayer from "../VideoPlayer";

const Hero = () => {
  return (
    <div className="min-h-screen bg-blackk flex items-center justify-center py-16 relative overflow-hidden">
      {/* Blur effect background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[20%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px] bg-emerald-500" />
        <div className="absolute -right-[10%] top-[40%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px] bg-yellow-300" />
      </div>

      {/* Main Content */}
      <div className="w-full  px-4  max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10 mt-10 lg:mt-0">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-20% from-emerald-400 to-yellow-300 bg-clip-text text-transparent">
              Transcode and Stream videos at scale
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
            Delivering affordable and scalable media transcoding and streaming solutions for modern
            needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-gradient-to-r from-emerald-400 to-yellow-300 text-black font-bold text-lg py-4 px-8 rounded-lg hover:opacity-90 transition-all duration-300">
              Start Free Trial
            </button>
            <button className="border border-gray-800 text-gray-300 font-semibold text-lg py-4 px-8 rounded-lg hover:bg-gray-900 transition-all duration-300">
              View Pricing
            </button>
          </div>

          <div className="mt-8 flex items-center gap-8 text-sm text-gray-400 justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Right Content - Video Preview */}
        <div className="flex-1 w-full max-w-xl">
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-sm text-gray-400">demo-video.mp4</div>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              {/* <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Sample Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              /> */}
              <VideoPlayer src="https://cdn.streamscale.aksdev.me/666d55ed785875a3ffe67865/BigBunnyTrailer/master.m3u8" />
            </div>
            <div className="p-4 bg-gray-900">
              {/* <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-gradient-to-r from-emerald-400 to-yellow-300" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
