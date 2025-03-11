import { cn } from "@/lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import React from "react";

// Modify your Progress component like this:
export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string;
    resetKey?: string | number;
  }
>(({ className, value, indicatorClassName, resetKey, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(0);

  React.useEffect(() => {
    setInternalValue(value || 0);
  }, [value, resetKey]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-neutral-200", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all duration-500 ease-out",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - internalValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
