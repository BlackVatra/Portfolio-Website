'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCascadeProps {
  images: string[];
  interval?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}

const ImageCascade = ({ 
  images, 
  interval = 3000, 
  title, 
  subtitle,
  className = "" 
}: ImageCascadeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    if (!images || images.length < 2) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setNextIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`relative w-full min-h-[500px] lg:min-h-[600px] ${className}`}>
      <div className="absolute inset-0 w-full h-full px-0 sm:px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="relative w-full h-full flex flex-col">
          {/* Text content - adaptive height */}
          {(title || subtitle) && (
            <div className="w-full lg:w-1/2 xl:w-[45%] flex-shrink-0">
              {title && <h2 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h2>}
              {subtitle && <p className="text-base lg:text-lg text-muted-foreground">{subtitle}</p>}
            </div>
          )}

          {/* Image cascade - fixed position on desktop, fluid on mobile */}
          <div className="w-full lg:w-1/2 xl:w-[55%] lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 
            h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
            <div className="relative w-full h-full">
              <AnimatePresence mode="popLayout">
                {/* Next image (peeking from behind) */}
                <motion.div
                  key={`next-${nextIndex}`}
                  className="absolute w-full h-full z-20 origin-center"
                  initial={{ scale: 0.7, x: "40%", opacity: 0, rotate: 5 }}
                  animate={{ scale: 0.8, x: "20%", opacity: 0.6, rotate: 3 }}
                  exit={{ scale: 1, x: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={images[nextIndex]}
                      alt={`Next slide ${nextIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>

                {/* Main (current) image */}
                <motion.div
                  key={`main-${currentIndex}`}
                  className="absolute w-full h-full z-30 origin-center"
                  initial={{ scale: 0.8, x: "20%", opacity: 0.6, rotate: 3 }}
                  animate={{ scale: 1, x: 0, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.8, x: "-20%", opacity: 0, rotate: -3 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={images[currentIndex]}
                      alt={`Slide ${currentIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCascade;