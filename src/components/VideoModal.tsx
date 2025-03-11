import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import VideoPlayer from "./VideoPlayer";
type VideoModalProps = {
  src: string;
  title: string;
};
const VideoModal = ({ src, title }: VideoModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-w-16 aspect-h-9">
          <VideoPlayer src={src} play={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
