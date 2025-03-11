import { useCallback, useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCopy } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const STAGE_MAP = {
  initialUpload: { label: "Uploading to S3", color: "bg-yellow-500" },
  transcoding: { label: "Processing", color: "bg-purple-500" },
  uploading: { label: "Uploading", color: "bg-green-500" },
  failed: { label: "Failed", color: "bg-red-500" },
};

type ProgressData = {
  stage: keyof typeof STAGE_MAP;
  progress: number;
  status: "uploading" | "processing" | "success" | "succeed" | "failed";
};

interface TranscodeProgressProps {
  initialUploadProgress?: number;
  setIsUploading: (val: boolean) => void;
  setIsComplete: (val: boolean) => void;
  isUploading: boolean;
  safeFilename: string;
  onReset?: () => void;
}

function TranscodeProgress({
  initialUploadProgress = 0,
  setIsUploading,
  setIsComplete,
  safeFilename,
  onReset,
}: TranscodeProgressProps) {
  const [progressData, setProgressData] = useState<ProgressData>({
    stage: "initialUpload",
    progress: 0,
    status: "uploading",
  });
  const lastValidFilename = useRef("");
  const [stageKey, setStageKey] = useState(0);
  const previousStageRef = useRef<string>("initialUpload");
  const [showSuccess, setShowSuccess] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  // @ts-ignore
  const animationTimeoutRef = useRef<NodeJS.Timeout>();
  const { user } = useAuth();
  const resetProgress = () => {
    // Cleanup existing connections and timeouts
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Reset state
    setProgressData({
      stage: "initialUpload",
      progress: 0,
      status: "uploading",
    });
    setStageKey(0);
    previousStageRef.current = "initialUpload";

    // Notify parent component
    if (onReset) {
      onReset();
    }
  };

  // Handle stage transitions with CSS animations
  const transitionToNextStage = async (nextStage: ProgressData) => {
    const currentProgress = progressData.progress;
    const timeToComplete = ((100 - currentProgress) / 100) * 300;

    // Complete current stage animation
    setProgressData((prev) => ({ ...prev, progress: 100 }));

    // Use requestAnimationFrame for smoother transitions
    await new Promise((resolve) => {
      animationTimeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          setStageKey((prev) => prev + 1);
          previousStageRef.current = nextStage.stage;
          setProgressData(nextStage);
          resolve(null);
        });
      }, timeToComplete + 500); // Matches CSS transition duration
    });
  };

  // Watch for initial upload progress changes
  useEffect(() => {
    if (initialUploadProgress !== 0 && initialUploadProgress !== 100) {
      setShowSuccess(false);
    }
    if (safeFilename) {
      lastValidFilename.current = safeFilename;
      transitionToNextStage({
        stage: "transcoding",
        progress: 0,
        status: "processing",
      });
      setIsUploading(false);
    } else {
      setProgressData((prev) => ({
        ...prev,
        progress: initialUploadProgress,
      }));
    }
  }, [initialUploadProgress, safeFilename]);

  // SSE connection for processing stages

  useEffect(() => {
    if (!safeFilename) return;
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/progress/${safeFilename}`
    );
    eventSourceRef.current = eventSource;

    eventSource.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.stage !== previousStageRef.current) {
          await transitionToNextStage({
            stage: data.stage,
            progress: data.progress,
            status: data.status,
          });
        } else {
          setProgressData({
            stage: data.stage,
            progress: data.progress,
            status: data.status,
          });
        }

        if (data.status === "success" || data.status === "failed") {
          eventSource.close();

          // Wait for progress bar to reach 100% before showing success view.
          // Within 600ms, the progress bar will reach from 0% to 100% and have a little pause, then show success view.
          animationTimeoutRef.current = setTimeout(() => {
            data.status === "success" && setShowSuccess(true);
            resetProgress();
            setIsComplete(true);
          }, 500);
        }
      } catch (error) {
        toast({
          title: "Error parsing SSE data",
          variant: "destructive",
        });
        console.error("Error parsing SSE data", error);
      }
    };

    eventSource.onerror = (error) => {
      // console.error("SSE Error:", error);
      eventSource.close();
      setProgressData((prev) => ({
        ...prev,
        status: "failed",
      }));
    };

    return () => {
      eventSource.close();
    };
  }, [safeFilename]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  if (showSuccess && initialUploadProgress === 0) {
    return (
      <Card className="w-full h-[12rem] flex flex-col justify-center max-w-mdd">
        <CardHeader>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Video Processing
            <Badge variant="success">Completed</Badge>
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Transcoding completed successfully</span>
              <span className="font-medium text-green-400">100%</span>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center gap-4">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 gap-1.5"
                  onClick={() => {
                    const filename = lastValidFilename.current;
                    navigator.clipboard.writeText(
                      `https://pub-edb9d66a566a409ab1bf346a0f47bb12.r2.dev/uploads/${user?.id}/${filename}/master.m3u8`
                    );
                    toast({
                      title: "URL copied to clipboard",
                      duration: 2000,
                      variant: "default",
                    });
                  }}
                >
                  <ClipboardCopy className="h-4 w-4" />
                  Copy hls URL
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[12rem] flex flex-col justify-center">
      <CardHeader>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Video Processing
          <Badge variant={progressData.status === "failed" ? "destructive" : "default"}>
            {progressData.status === "failed" ? "Failed" : STAGE_MAP[progressData.stage].label}
          </Badge>
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {progressData.status === "failed"
                ? "Error occurred"
                : `${STAGE_MAP[progressData.stage].label}...`}
            </span>
            <span className="font-medium">{progressData.progress}%</span>
          </div>

          <Progress
            key={stageKey}
            value={progressData.progress}
            className="h-2 bg-muted"
            indicatorClassName={`duration-500 ${STAGE_MAP[progressData.stage].color}`}
          />

          <div className="flex justify-between items-center">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step: {getStepNumber(progressData.stage)}/3</span>
              <span className="ml-4">
                {getStageDescription(progressData.stage, progressData.status)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  function getStageDescription(stage: string, status: string) {
    if (status === "failed") return "Process failed";

    switch (stage) {
      case "initialUpload":
        return "Uploading file to storage";
      case "transcoding":
        return progressData.progress === 0
          ? "Provisioning fargate task (approx 15 sec)"
          : "Processing video content";
      case "uploading":
        return "Saving processed file";
      default:
        return "Processing";
    }
  }
}

function getStepNumber(stage: string) {
  const stages = ["initialUpload", "transcoding", "uploading"];
  return stages.indexOf(stage) + 1 || 3;
}

export default TranscodeProgress;
