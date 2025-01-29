import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Integration from "@/components/home/Integration";
import WorkflowAnimated from "@/components/WorkFlowAnimated";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <Integration />
      <WorkflowAnimated />
      <Features />
    </div>
  );
}
