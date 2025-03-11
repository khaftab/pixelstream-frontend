"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Note: using navigation, not router
import VideoList from "@/components/VideoList";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  // Get user from context
  const { user } = useAuth();
  const router = useRouter();

  // Use useEffect for navigation to avoid React hydration issues
  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  // Early return for non-authenticated users to prevent flash of content
  if (!user) {
    return null; // Or return a loading spinner
  }

  return (
    <div className="py-12 bg-black px-4">
      <VideoList />
    </div>
  );
}
