"use client";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Integration from "@/components/home/Integration";
import WorkflowAnimated from "@/components/WorkFlowAnimated";
import { toast } from "@/hooks/use-toast";
import { signin, signup } from "@/services/authService";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const fn = async () => {
      try {
        // const st = await signin({ email: "sdf@sddf.com", password: "hakasdfdsf" });
        // console.log(st, "st");
      } catch (error) {
        console.log(error, "error");
      }
    };
    fn();
  }, []);
  return (
    <>
      <Hero />
      <Integration />
      <WorkflowAnimated />
      <Features />
    </>
  );
}
