import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import Progress from "@/components/Progress";
import FileUpload from "./FileUpload";
import ProcessedVideoList from "./ProcessedVideoList";

const VideoManagement = () => {
  const [isUploading, setIsUploading] = useState<null | boolean>(null);
  const [s3UploadProgress, setS3UploadProgress] = useState<number>(0);
  const [safeFilename, setSafeFilename] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const handleReset = () => {
    if (document) {
      // reset file input as browser does not count same file upload again.
      (document.getElementById("file-upload") as HTMLInputElement).value = "";
    }
    setIsUploading(false);
    setSafeFilename("");
    setS3UploadProgress(0);
    setIsComplete(false);
  };

  return (
    <div className="container mx-auto lg:p-8 max-w-7xl p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Upload and Progress */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <FileUpload
              setProgress={(val) => setS3UploadProgress(val)}
              isUploading={isUploading}
              setIsUploading={(val) => setIsUploading(val)}
              setSafeFilename={(val) => setSafeFilename(val)}
              isComplete={isComplete}
              setIsComplete={(val) => setIsComplete(val)}
            />
          </div>
          <div>
            {isUploading !== null ? (
              <Progress
                initialUploadProgress={s3UploadProgress}
                setIsUploading={(val) => setIsUploading(val)}
                isUploading={isUploading}
                setIsComplete={(val) => setIsComplete(val)}
                safeFilename={safeFilename}
                onReset={handleReset}
              />
            ) : (
              <Card className="space-y-3 p-4 min-h-[12rem] flex flex-col justify-center items-start">
                <div>
                  <h3 className="font-medium mb-4">How It Works</h3>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    {/* <li>• Automatic format conversion begins</li> */}
                    <li>• Streams at 720p and 480p resolution</li>
                    <li>• Link available when complete</li>
                    <li>
                      •{" "}
                      <a
                        href="https://haka-s3.s3.ap-south-1.amazonaws.com/pixel-stream-demo.mp4"
                        className="text-blue-500 underline"
                        download
                        target="_blank"
                      >
                        Download
                      </a>{" "}
                      demo video for upload
                    </li>
                  </ul>
                </div>
              </Card>
            )}
          </div>
        </div>
        {/* Right Column - Video List */}
        <div className="lg:col-span-2">
          <ProcessedVideoList isComplete={isComplete} />
        </div>
      </div>
    </div>
  );
};

export default VideoManagement;
