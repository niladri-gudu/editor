"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolButtonProps {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function ToolButton({ active, icon, label, onClick }: ToolButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      title={label}
      onClick={onClick}
      className={cn(
        "h-12 w-12 rounded-lg border",
        active && "bg-primary text-primary-foreground",
      )}
    >
      {icon}
    </Button>
  );
}
