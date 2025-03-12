import { Metadata } from "next";
import DashboardPage from "@/components/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard - Pixelstream",
  description: "Pixelstream dashboard",
};

export default function Home() {
  return <DashboardPage />;
}
