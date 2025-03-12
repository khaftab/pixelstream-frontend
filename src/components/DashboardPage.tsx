"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; // Changed from next/router
import { useEffect } from "react";
import VideoManagement from "./VideoManagement";

const DashboardPage = () => {
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

  return <VideoManagement />;
};

export default DashboardPage;
