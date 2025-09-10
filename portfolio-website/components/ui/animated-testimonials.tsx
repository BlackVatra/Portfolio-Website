"use client";

import { IconArrowLeft, IconArrowRight, IconBrandFigma, IconWorldWww, IconArrowUpRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  figmaUrl?: string;
  websiteUrl?: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full relative grid grid-cols-1 md:grid-cols-[minmax(0,364px)_1fr] gap-8 md:gap-12">
        <div className="h-[140px] md:h-[240px] relative overflow-visible w-full">
            <AnimatePresence mode="popLayout">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    x: -50,
                    y: 100,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0,
                    scale: isActive(index) ? 1 : 0.9,
                    x: isActive(index) ? 0 : -50,
                    y: isActive(index) ? 0 : 100,
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    x: 50,
                    y: -50,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-[-40px] left-[-40px]"
                  style={{
                    transformOrigin: "bottom left",
                    height: "116.66%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start"
                  }}
                >
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={1000}
                      height={1000}
                      priority
                      draggable={false}
                      className="h-full w-auto object-contain object-left-bottom"
                      style={{ 
                        maxHeight: "100%",
                        transformOrigin: "bottom left"
                      }}
                    />
                </motion.div>
              ))}
            </AnimatePresence>
        </div>
        <div className="flex justify-between flex-col flex-grow w-full">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="flex flex-col gap-3 w-full"
          >
            <h3 className="text-2xl font-bold text-foreground">
              {testimonials[active].name}
            </h3>
            <p className="text-lg text-muted-foreground mt-4 max-w-prose">
              {testimonials[active].quote}
            </p>
          </motion.div>
          <div className="flex items-center justify-between pt-12 md:pt-6">
            <div className="flex gap-2">
              <Button 
                onClick={handlePrev}
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-md"
              >
                <IconArrowLeft className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleNext}
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-md"
              >
                <IconArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                asChild
                size="sm"
                variant="secondary"
              >
                <Link href={testimonials[active].figmaUrl || "#"} target="_blank">
                  <IconBrandFigma className="h-4 w-4" />
                  <span>Figma</span>
                </Link>
              </Button>
              <Button 
                asChild
                size="sm"
                variant="secondary"
              >
                <Link href={testimonials[active].websiteUrl || "#"} target="_blank">
                  <IconWorldWww className="h-4 w-4" />
                  <span>Website</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
