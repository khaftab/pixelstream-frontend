"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TranscodingProgress } from "./TranscodingProgress";

type FileData = {
  id: string;
  name: string;
  size: number;
  status: "pending" | "processing" | "completed";
};

export const FileList = () => {
  const [files, setFiles] = useState<FileData[]>([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
    const interval = setInterval(fetchFiles, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gray-800 border-gray-700 text-white mt-6">
      <CardHeader>
        <CardTitle>Uploaded Files</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {files.map((file) => (
          <div key={file.id} className="border-b border-gray-700 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{file.name}</h3>
                <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
              </div>
              <span className="text-sm capitalize">{file.status}</span>
            </div>
            {file.status === "processing" && <TranscodingProgress fileId={file.id} />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
