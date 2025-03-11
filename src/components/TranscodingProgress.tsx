"use client";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export const TranscodingProgress = ({ fileId }: { fileId: string }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:3002/api/files/${fileId}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setProgress(data.progress);
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [fileId]);

  return (
    <div className="mt-2">
      <p className="text-sm text-gray-400 mb-1">Transcoding Progress</p>
      <Progress value={progress} className="h-2 bg-gray-700" />
    </div>
  );
};
