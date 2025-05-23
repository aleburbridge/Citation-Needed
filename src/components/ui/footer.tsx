import * as React from "react";
import { cn } from "@/lib/utils";

const Footer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <footer
    ref={ref}
    className={cn(
      "fixed bottom-2 w-full px-4 py-2 text-center text-muted-foreground custom-font",
      className
    )}
    {...props}
  >
    A game by{" "}
    <a
      href="https://github.com/aleburbridge"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary hover:underline"
    >
      Alex Bridgeman
    </a>
  </footer>
));
Footer.displayName = "Footer";

export { Footer };
