"use client";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

const InputPassword = React.forwardRef(
  ({ className, type, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = (e) => {
      e.preventDefault(); // Prevent form submission
      setShowPassword((prev) => !prev);
    };

    const handleInputChange = (e) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-11 w-full rounded-[5px] bg-background px-[26px] py-[13px] text-[13px] font-[400] leading-[18px] placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          onChange={handleInputChange}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-3 flex cursor-pointer items-center focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={-1} // Prevent tab focus since it's just a visual toggle
        >
          {showPassword ? (
            <EyeIcon className="h-[20px] w-[20px] text-[#0A2A3C]" />
          ) : (
            <EyeOffIcon className="h-[20px] w-[20px] text-[#0A2A3C]" />
          )}
        </button>
      </div>
    );
  },
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
