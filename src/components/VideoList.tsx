import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Play, Copy, Check, AlertCircle, Video, Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Progress from "@/components/Progress";
import FileUpload from "./FileUpload";
import ProcessedVideoList from "./ProcessedVideoList";

const VideoManagementPage = () => {
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
    <div className="container mx-auto lg:p-8 max-w-7xl">
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

export default VideoManagementPage;
/** 
This is has inconsistent delay b/w stages.  The main reason we are adding those 600  ms delay to complete the bar and then wait a fraction then go to next stage.  initialupload => transcoding. This stage is perfect because intialUpload fulfills 100% bar because s3 returns 100% at the end of uploding. So, the time 600 is not used for complete the bar. Rather, holds the next stage (transcoding) for that amount of time.   Now, for the transcoding => uploading stage, this data comes from backend by polling redis db. Here, it is not necessary to returns 100% progress for transcoding. It maybe 20% then, before showing it to 100%, it sends uploding to 2%. Now, here the problem lies, in  600 ms it needs to complete the bar 20 to 100% and doing the it rans out of that time. That's why there is a instant movement of procedding to next stage barely completing the progress and a small pause.  Now, if I increase the time 600 to 1s, it will somehow solve the issue. But, not perfectly. because, then initialupload will always wait 1 sec before going to next stage. But, transcoding stage will have to wait less the 1 sec as it counts the time to complete the bar. So, the time gap will be inconsistent b/w the stages.  Now, the solution what I can think is that, the time it takes to complete the bar, should be calculated and added to 600 ms.That way it will be same pause b/w each stages. If, a stage has 100% from the serveer itself, then will no need to wait for only 600 ms. Same with if server send s 20% and move to next stage, it should add the time to take to 20% to 100% and then add 600 ms. That way it will be perfect. what you think?
*/
