"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const DrawerContext = React.createContext({
  direction: "right",
});

const Drawer = ({
  shouldScaleBackground = true,
  direction = "right",
  ...props
}) => (
  <DrawerContext.Provider value={{ direction }}>
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      direction={direction}
      {...props}
    />
  </DrawerContext.Provider>
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

const drawerContentVariants = cva(
  "fixed z-50 flex h-auto flex-col border bg-background",
  {
    variants: {
      direction: {
        right: "ml-24 right-0 rounded-l-[10px] inset-y-0",
        top: "mb-24 top-0 rounded-b-[10px] inset-x-0",
        bottom: "mt-24 rounded-t-[10px] bottom-0 inset-x-0",
        left: "mr-24 left-0 rounded-r-[10px] inset-y-0",
      },
    },
    defaultVariants: {
      direction: "right",
    },
  },
);

const DrawerContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { direction } = React.useContext(DrawerContext);

    return (
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
          ref={ref}
          className={cn(drawerContentVariants({ direction, className }))}
          {...props}
        >
          <DrawerClose
            className="absolute right-4 top-4 cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="h-8 w-8 text-white" />
          </DrawerClose>
          <div className="pt-4">{children}</div>
        </DrawerPrimitive.Content>
      </DrawerPortal>
    );
  },
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
