import React from "react";
import { Zap, Layout, Shield, Sliders, Cloud, Code2, HandCoins, MonitorPlay } from "lucide-react";

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-all duration-300">
    <div className="bg-gradient-to-br from-emerald-400/20 to-yellow-300/20 rounded-lg p-3 w-fit mb-4">
      <Icon className="w-6 h-6 text-emerald-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Transcode Fast",
      description: "Each video of 1GB or 1hr is transcoded in multiple formats within 30 minutes",
    },
    {
      icon: HandCoins,
      title: "Cost effective",
      description: "Transcode and stream videos at a fraction of the cost of other providers.",
    },
    {
      icon: MonitorPlay,
      title: "Stream at scale",
      description: "Stream the videos to millions of users without any hiccups.",
    },
  ];

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background Blur Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[20%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px] bg-emerald-500" />
        <div className="absolute -right-[10%] top-[40%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px] bg-yellow-300" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-4xl text-blue-100">What you get</span>
          </h2>
          {/* <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform your video content with our cutting-edge transcoding technology. Built for
            professionals, designed for everyone.
          </p> */}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex p-1 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-800">
            <button className="px-6 py-3 rounded-full text-sm font-medium text-gray-400 hover:text-white transition-colors">
              View Documentation
            </button>
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-yellow-300 text-black text-sm font-medium hover:opacity-90 transition-opacity">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
