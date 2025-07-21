import React from "react";
import { cn } from "@/utils/cn"; // Make sure you are using the alias

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Added dark mode classes for background and border
      "rounded-2xl border bg-white text-slate-900 shadow-sm",
      "dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-50",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      // Added dark mode class for text color
      "text-xl font-semibold leading-none tracking-tight text-slate-900",
      "dark:text-white",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      // Added dark mode class for text color
      "text-sm text-slate-600",
      "dark:text-slate-400",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export { Card, CardHeader, CardTitle, CardDescription };
