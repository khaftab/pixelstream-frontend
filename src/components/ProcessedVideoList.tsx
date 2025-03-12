import { Check, Copy, Loader2, Play, Video } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { apiHandler } from "@/lib/api";
import { format, parseISO } from "date-fns";
import { PaginationControl } from "./PaginationControl";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VideoPlayer from "./VideoPlayer";
import { useAuth } from "@/context/AuthContext";

// Add new state variables at the top of the component

type Video = {
  id: string;
  updatedAt: string;
  fileSize: number;
  duration: number;
  hlsurl: string;
  originalFileName: string;
  safeFileName: string;
};

const ProcessedVideoList = ({ isComplete }: { isComplete: boolean }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFiles, setTotalFiles] = useState(0);
  // const [itemsPerPage] = useState(10); // You can make this configurable

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const handleCopy = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      toast({
        title: "URL copied to clipboard",
        variant: "default",
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  const toggleSortBy = () => {
    setSortBy((prevSortBy) => (prevSortBy === "asc" ? "desc" : "asc"));
  };

  const fetch = async () => {
    setLoading(true);
    const data = await apiHandler({
      method: "GET",
      url: `/api/users/files?sortBy=${sortBy}&page=${currentPage}`,
    });

    if (!data) {
      setLoading(false);
      return;
    }

    setLoading(false);
    setVideos(data.files);
    setTotalFiles(data.totalFiles); // Make sure your API returns totalPages
  };

  useEffect(() => {
    if (isComplete) fetch();
  }, [isComplete]);

  // Modify your useEffect to include pagination params
  useEffect(() => {
    fetch();
  }, [sortBy, currentPage]);

  function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return (
    <Card className="flex flex-col min-h-[31rem]">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Your Videos</CardTitle>
            <CardDescription className="mt-1">{totalFiles} processed files</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleSortBy}>
            Sort by Date ({sortBy === "asc" ? "Ascending" : "Descending"})
          </Button>
        </div>
      </CardHeader>
      <ScrollArea className="min-w-[12rem] whitespace-nowrap">
        <CardContent className="p-0 flex flex-col">
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center min-h-[20rem]">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : videos?.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center min-h-[20rem]">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No videos uploaded yet</h3>
                <p className="text-sm text-muted-foreground">
                  Get started by uploading your first video
                </p>
              </div>
            ) : (
              <div className="divide-y flex flex-col justify-start min-h-[20rem]">
                {videos?.map((video: Video) => (
                  <div
                    key={video.id}
                    className="flex-1 flex items-center justify-between p-4 hover:bg-muted/50 transition-colors max-h-[5rem]"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* <Button
                        size="icon"
                        variant="ghost"
                        className="shrink-0"
                        onClick={() => console.log("Play", video.hlsurl)}
                      >
                        <Play className="h-5 w-5" />
                      </Button> */}
                      <Dialog>
                        <DialogTrigger asChild>
                          {/* <Button variant="outline">Edit Profile</Button> */}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="shrink-0"
                            onClick={() => console.log("Play", video.hlsurl)}
                          >
                            <Play className="h-5 w-5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card">
                          <DialogHeader>
                            <DialogTitle>{video.originalFileName}</DialogTitle>
                          </DialogHeader>
                          <div className="aspect-w-16 aspect-h-9">
                            <VideoPlayer
                              src={`https://pub-edb9d66a566a409ab1bf346a0f47bb12.r2.dev/uploads/${
                                user?.id
                              }/${video.safeFileName.split(".")[0]}/master.m3u8`}
                              play={true}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{video.originalFileName}</p>
                        <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{format(parseISO(video.updatedAt), "dd-MM-yyyy hh:mm a")}</span>
                          {/* <span>{video.size}</span> */}
                          <span>{formatDuration(video.duration)}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0"
                      onClick={() => handleCopy(video.hlsurl, video.id)}
                    >
                      {copiedId === video.id ? (
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      Copy URL
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {videos && videos.length > 0 && (
            <div className="border-t py-4 px-8">
              <PaginationControl
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                totalCount={totalFiles}
              />
            </div>
          )}
        </CardContent>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
};

export default ProcessedVideoList;
