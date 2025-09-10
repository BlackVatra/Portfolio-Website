import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black border-2 border-black shadow-[0_6px_0_0_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-y-1.5 transition-all hover:bg-white/80 duration-150 pointer-events-auto z-10",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-black border-2 border-black/80 hover:bg-white/80 pointer-events-auto z-10 transition-all",
        secondary:
          "bg-white border-0 text-black transition-all duration-150 group-hover:translate-y-1 hover:bg-white/80 pointer-events-auto z-10",
        ghost:
          "text-black border-2 border-black/0 hover:border-black/80 hover:bg-white/80 pointer-events-auto z-10 transition-all",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  // Special case for default and secondary variants - wrap in a div for consistent hitbox
  if (variant === "secondary") {
    const buttonClass = cn(buttonVariants({ variant, size, className }));
    return (
      <div 
        className="bg-black/30 inline-flex relative pb-0 cursor-pointer group overflow-hidden rounded-md border-2 border-black/1"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const button = e.currentTarget.querySelector('[data-slot="button"]');
            if (button) {
              (button as HTMLButtonElement).click();
            }
          }
        }}
      >
        <Comp
          data-slot="button"
          className={buttonClass}
          {...props}
        />
      </div>
    );
  }
  if (variant === "default" || variant === undefined) {
    const buttonClass = cn(buttonVariants({ variant, size, className }));
    return (
      <div 
        className="inline-flex relative pb-[6px] cursor-pointer group"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const button = e.currentTarget.querySelector('[data-slot="button"]');
            if (button) {
              (button as HTMLButtonElement).click();
            }
          }
        }}
      >
        <Comp
          data-slot="button"
          className={buttonClass}
          {...props}
        />
        <div className="absolute inset-0 bottom-0" />
      </div>
    );
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
