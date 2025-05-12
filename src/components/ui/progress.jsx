"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef(
  ({ className, value, label = "", ...props }, ref) => {
    // Convert value from 0-5 scale to percentage (0-100)
    const percentage = (value || 0) * 20;

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative mb-6 h-7 w-full overflow-hidden rounded-[5px] bg-[#DEDEDE] last:mb-0",
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "flex h-full w-full items-center rounded-[5px] pl-3 transition-all",
            value > 0 && "bg-[#006988]",
          )}
          style={{ width: `${percentage}%` }}
        >
          <p className="text-[16px] font-semibold leading-[22px] text-white">{`${label}`}</p>
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    );
  },
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
