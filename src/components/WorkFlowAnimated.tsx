"use client";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import React, { forwardRef, useRef } from "react";
import Image from "next/image";

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `z-10 flex h-14 w-14 items-center justify-center rounded-full
          border-2 bg-white p-3
          shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]`,
          className
        )}
      >
        {children}
      </div>
    );
  }
);

export default function WorkflowAnimated({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-black flex justify-center items-center flex-col px-4 w-full">
      <h1 className="text-blue-100 text-4xl mb-14 text-center">Quick solutions, less cost</h1>
      <div
        className={cn(
          `relative flex w-full max-w-[600px] items-center
          justify-center overflow-hidden rounded-lg border border-gray-800 p-4 md:p-10 md:shadow-xl`,
          className
        )}
        ref={containerRef}
      >
        <div
          className="flex h-full w-full flex-row items-stretch justify-between
          gap-2 md:gap-10"
        >
          <div className="flex flex-col justify-center">
            <Circle ref={div1Ref} className="h-12 w-12 md:h-14 md:w-14">
              <Icons.user className="scale-95 md:scale-100" />
            </Circle>
          </div>
          <div className="flex flex-col justify-center">
            <Circle ref={div2Ref} className="h-12 w-12 md:h-14 md:w-14">
              <Icons.nodejs className="scale-95 md:scale-100" />
            </Circle>
          </div>
          <div className="flex flex-col justify-center gap-1 md:gap-2">
            <Circle ref={div3Ref} className="h-12 w-12 md:h-14 md:w-14">
              <Icons.awss3 className="scale-95 md:scale-100" />
            </Circle>
            <Circle ref={div4Ref} className="h-12 w-12 md:h-14 md:w-14">
              <Icons.awsEcr className="scale-95 md:scale-100" />
            </Circle>
            <Circle ref={div5Ref} className="h-12 w-12 md:h-14 md:w-14">
              <Icons.awsEcs className="scale-95 md:scale-100" />
            </Circle>
            <Circle ref={div6Ref} className="h-12 w-12 md:h-14 md:w-14">
              <Icons.cloudflare className="scale-95 md:scale-100" />
            </Circle>
          </div>
        </div>

        {/* AnimatedBeams */}
        <AnimatedBeam
          containerRef={containerRef as React.RefObject<HTMLElement>}
          fromRef={div1Ref as React.RefObject<HTMLElement>}
          toRef={div2Ref as React.RefObject<HTMLElement>}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef as React.RefObject<HTMLElement>}
          fromRef={div3Ref as React.RefObject<HTMLElement>}
          toRef={div2Ref as React.RefObject<HTMLElement>}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef as React.RefObject<HTMLElement>}
          fromRef={div3Ref as React.RefObject<HTMLElement>}
          toRef={div4Ref as React.RefObject<HTMLElement>}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef as React.RefObject<HTMLElement>}
          fromRef={div4Ref as React.RefObject<HTMLElement>}
          toRef={div5Ref as React.RefObject<HTMLElement>}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef as React.RefObject<HTMLElement>}
          fromRef={div5Ref as React.RefObject<HTMLElement>}
          toRef={div6Ref as React.RefObject<HTMLElement>}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef as React.RefObject<HTMLElement>}
          fromRef={div6Ref as React.RefObject<HTMLElement>}
          toRef={div2Ref as React.RefObject<HTMLElement>}
          duration={3}
        />
      </div>
    </div>
  );
}

const Icons = {
  awss3: ({ className }: { className?: string }) => (
    <Image
      width={40}
      height={40}
      src="/s3.png"
      className={cn("rounded-full", className)}
      alt="Amazon S3"
    />
  ),
  awsEcr: ({ className }: { className?: string }) => (
    <Image
      width={40}
      height={40}
      src="/ecr.png"
      className={cn("rounded-full", className)}
      alt="Amazon ECR"
    />
  ),
  awsSqs: ({ className }: { className?: string }) => (
    <Image
      width={40}
      height={40}
      src="/sqs.png"
      className={cn("rounded-full", className)}
      alt="Amazon SQS"
    />
  ),
  awsEcs: ({ className }: { className?: string }) => (
    <Image
      width={40}
      height={40}
      src="/ecs.png"
      className={cn("rounded-full", className)}
      alt="Amazon ECS"
    />
  ),
  nodejs: ({ className }: { className?: string }) => (
    <Image
      width={40}
      height={40}
      src="/nodejs.png"
      className={cn("rounded-full", className)}
      alt="Node.js"
    />
  ),
  cloudflare: ({ className }: { className?: string }) => (
    <Image
      width={40}
      height={40}
      src="/cloudflare.png"
      className={cn("rounded-full", className)}
      alt="Cloudflare"
    />
  ),
  // Apply similar pattern to other icon components
  // ...
  user: ({ className }: { className?: string }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};
