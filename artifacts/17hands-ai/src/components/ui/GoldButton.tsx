import { forwardRef } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { motion } from "framer-motion";

interface GoldButtonProps extends ButtonProps {
  href?: string;
}

export const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, href, children, ...props }, ref) => {
    const buttonContent = (
      <Button
        ref={ref}
        className={cn(
          "bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] border border-primary/50 font-medium tracking-wide",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );

    if (href) {
      return (
        <Link href={href} className="inline-block">
          {buttonContent}
        </Link>
      );
    }

    return buttonContent;
  }
);
GoldButton.displayName = "GoldButton";
