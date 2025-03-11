import React, { useCallback, useState } from "react";
import { Upload, Loader2, File, VideoIcon } from "lucide-react";
import { apiHandler } from "@/lib/api";
import axios from "axios";
import { Card, CardContent } from "./ui/card";
import { toast } from "@/hooks/use-toast";

interface FileWithPreview extends File {
  preview: string;
}

type FileUploadProps = {
  setProgress: (progress: number) => void;
  setSafeFilename: (val: string) => void;
  setIsUploading: (isUploading: boolean | null) => void;
  isUploading: boolean | null;
  setIsComplete: (val: boolean) => void;
  isComplete: boolean;
};

export default function FileUpload({
  setProgress,
  setIsUploading,
  setSafeFilename,
  setIsComplete,
  isUploading,
  isComplete,
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(Math.round(video.duration));
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const handleUpload = useCallback(async (selectedFiles: File[]) => {
    if (!selectedFiles.length) return;

    setIsUploading(true);
    setIsComplete(false);
    const file = selectedFiles[0];
    console.log("Uploading file:", file);
    const duration = await getVideoDuration(file);

    try {
      const initResponse = await apiHandler({
        method: "POST",
        url: "/api/uploads/url",
        data: {
          fileName: file.name,
          fileType: file.type,
          duration,
        },
      });

      if (!initResponse) {
        setIsUploading(null);
        setIsComplete(true);
        return;
      }

      const { url, fields, uploadId } = initResponse;

      try {
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        formData.append("file", file);

        await axios.post(url, formData, {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
            setProgress(percent);
          },
          // Axios automatically sets Content-Type with boundary!
        });

        // Confirm completion
        const data = await apiHandler({
          method: "PATCH",
          url: `/api/uploads/confirm/${uploadId}`,
        });
        if (!data) {
          toast({
            title: "Upload Failed",
            description: "Failed to confirm upload completion",
            variant: "destructive",
          });
          return;
        }

        setSafeFilename(data.safeFileName);
      } catch (error: any) {
        setIsUploading(null);
        setIsComplete(true);
        toast({
          title: "Upload Failed",
          description: error.message || "Failed to upload file",
          variant: "destructive",
        });
      }
      setProgress(0);
    } catch (error) {
      console.error("Upload failed:", error);

      setIsUploading(false);
      setFiles([]);
      // setUploadProgress(0);
      setProgress(0);
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(filesWithPreview);
      handleUpload(acceptedFiles);
    },
    [handleUpload]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files?.length) {
        onDrop(Array.from(e.dataTransfer.files));
      }
    },
    [onDrop]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files?.length) {
        onDrop(Array.from(e.target.files));
      }
    },
    [onDrop]
  );

  // Function to get a truncated filename if too long
  const getDisplayFilename = (filename: string) => {
    if (filename.length > 30) {
      const extension = filename.split(".").pop();
      const name = filename.substring(0, 20);
      return `${name}...${extension}`;
    }
    return filename;
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className="w-full"
    >
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="video/*"
      />
      <label htmlFor="file-upload" className="cursor-pointer block w-full">
        <Card
          className={`w-full h-[17rem] flex flex-col justify-center border-dashed border-2 hover:border-primary/50 transition-colors group ${
            isDragging ? "border-primary bg-primary/10" : ""
          }`}
        >
          <CardContent className="flex flex-col items-center justify-center p-4 h-full">
            {(!isComplete || isUploading) && files.length ? (
              <>
                <div className="p-4 bg-muted rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
                  <VideoIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">File Selected</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {getDisplayFilename(files[0].name)}
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  Processing video, please wait...
                </p>
              </>
            ) : (
              <>
                <div className="p-4 bg-muted rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
                  <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">Upload Video</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Drag & drop or click to browse (max size: 50MB)
                </p>
                <p className="text-xs text-muted-foreground text-center">MP4, MOV, AVI up to 4K</p>
              </>
            )}
          </CardContent>
        </Card>
      </label>
    </div>
  );
}
