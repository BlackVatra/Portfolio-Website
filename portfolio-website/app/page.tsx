"use client";
import useHeroAnimation from "@/components/useHeroAnimation";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from 'react';
import ImageCascade from "@/components/ImageCascade";

export default function Home() {
  const { heroRef } = useHeroAnimation();
  
  const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
    // Using placeholder images from Unsplash for demonstration
    setImageUrls([
      '/image1.jpg',
      '/image2.jpg',
      '/image3.jpg',
      '/image4.jpg',
    ]);

  }, []);
  return (
    <>
      <section ref={heroRef} className="hero-section w-full min-h-[80vh] flex items-center justify-center wave-border">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-5xl font-bold text-center mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg text-center max-w-xl mb-6">
          Explore my work, skills, and experience. Scroll down to see more!
        </p>
        <Button size="lg">Get Started</Button>
      </div>
      </section>
      
      <section className="py-16 relative min-h-screen">
        <div className="mx-auto max-w-[2000px] px-0 sm:px-6 md:px-12 lg:px-16">
          <div className="w-full rounded-3xl bg-[#f6f8e9] overflow-hidden">
            <div className="relative h-[500px] lg:h-[600px] p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="lg:max-w-xl flex-shrink-0">
                <h2 className="text-4xl sm:text-3xl font-bold mb-4">
                  Title with long name
                </h2>
                <p className="text-lg sm:text-base text-gray-700">
                  subtitle
                </p>
              </div>
              <div className="w-full">
                <div className="relative">
                  <ImageCascade images={imageUrls} interval={3000} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
