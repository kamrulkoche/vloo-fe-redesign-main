import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const InputSearch = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <>
      {props.label && (
        <p className="mb-[12px] text-[14px] font-medium leading-[20px] text-[#DEDEDE]">
          {props.label}
        </p>
      )}
      <div className="relative flex items-center">
        <input
          type={type}
          style={props.style}
          className={cn(
            "flex w-full rounded-[10px] border border-[#006988] bg-background px-10 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        <Search className="absolute left-3 h-[16px] w-[16px] text-[#006988]" />
      </div>
    </>
  );
});
InputSearch.displayName = "InputSearch";

export { InputSearch };
