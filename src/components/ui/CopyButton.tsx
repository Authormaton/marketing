"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export const CopyButton = ({ textToCopy, className }: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = useState(false);
  const [showError, setShowError] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  const copyToClipboard = async () => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available.");
      setShowError(true);
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = window.setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setHasCopied(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
      setShowError(true);
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = window.setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayHide={200} delayShow={200}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className={className}
          >
            {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy to clipboard</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {showError ? "Failed to copy!" : (hasCopied ? "Copied!" : "Copy")}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
