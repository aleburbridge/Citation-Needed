import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Article, Link } from "@/types/wiki-game";

interface MistakeDialogProps {
  article: Article;
  mistakeLink: Link;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitCorrection: (correction: string) => void;
}

export const MistakeDialog: React.FC<MistakeDialogProps> = ({
  article,
  mistakeLink,
  open,
  onOpenChange,
  onSubmitCorrection,
}) => {
  const [correction, setCorrection] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!correction.trim()) {
      setError("Please enter your correction");
      return;
    }

    onSubmitCorrection(correction);
    setCorrection("");
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Good catch! What's the correct term?</DialogTitle>
            <DialogDescription>
              You found the mistake in this article! Now, enter what you think
              is the correct term to replace "{mistakeLink.text}".
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Input
              value={correction}
              onChange={(e) => {
                setCorrection(e.target.value);
                setError("");
              }}
              placeholder="Enter the correct term"
              className={error ? "border-red-500" : ""}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <DialogFooter>
            <Button type="submit">Submit Answer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
