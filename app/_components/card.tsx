import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface CardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  className?: string;
  loading?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  icon,
  value,
  className = "",
  loading = false,
}) => (
  <div
    className={`bg-card rounded-md border border-sidebar-border p-4 flex items-center ${className}`}
  >
    <div className="mr-4 text-2xl text-foreground">
      {loading ? <Skeleton className="w-8 h-8 rounded-full" /> : icon}
    </div>
    <div>
      <div className="text-sm font-semibold text-foreground">
        {loading ? <Skeleton className="h-4 w-24 mb-1" /> : title}
      </div>
      <div className="text-xl text-foreground">
        {loading ? <Skeleton className="h-6 w-16" /> : value}
      </div>
    </div>
  </div>
);
