"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IconArrowLeft } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  { src: "/ensready-1.png", alt: "Project Image 1", width: 1000, height: 1000 },
  { src: "/ensready-2.png", alt: "Project Image 2", width: 1000, height: 1000 },
  { src: "/ensready-3.png", alt: "Project Image 3", width: 1000, height: 1000 },
  { src: "/ensready-4.png", alt: "Project Image 4", width: 1000, height: 1000 },
  { src: "/ensready-5.png", alt: "Project Image 5", width: 1000, height: 1000 }
];

export default function ProjectsPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [api, setApi] = useState<any>(null);
  
  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setSelectedImageIndex(api.selectedScrollSnap());
    });
    return () => {
      api?.off("select");
    };
  }, [api]);

  return (
    <main className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="sticky top-0 z-50 bg-sky-100 py-4 px-4 wave-border">
        <div className="mx-auto md:max-w-7xl flex justify-between items-center">
          <Button 
            asChild
            variant="ghost" 
            className="flex items-center"
          >
            <Link href="/">
              <IconArrowLeft className="h-4 w-4" />
              <span className="ml-2 text-sm">Back To Main Page</span>
            </Link>
          </Button>
          
          <div className="flex justify-center">
            <Image
              src="/ens-ready-logo-horizontal.svg" // Replace with your actual logo
              alt="ENS Ready Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="text-xs px-4">
              Figma File
            </Button>
            <Button variant="secondary" size="sm" className="text-xs px-4">
              Website
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mx-auto md:max-w-7xl px-4 py-8">
        {/* Project Content */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Design System Success Stories</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">This comprehensive design system streamlined development processes and improved team efficiency. It includes a complete set of reusable components, guidelines, and documentation.</p>
                
                <div className="mb-4">
                  <p className="font-semibold">Client:</p>
                  <p className="text-gray-600">WebSolutions</p>
                </div>
                
                <div className="mb-6">
                  <p className="font-semibold">Role:</p>
                  <p className="text-gray-600">Design System Architect</p>
                </div>
                
                <div className="mb-6">
                  <p className="font-semibold mb-2">Technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Figma", "Storybook", "CSS Variables", "Component Design"].map((tech, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Carousel */}
            <div className="rounded-lg overflow-hidden">
              <Carousel className="w-full" setApi={setApi}>
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="overflow-hidden rounded-lg">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            className="w-full h-[400px] object-cover"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto py-2 px-4 hide-scrollbar">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all
                      ${selectedImageIndex === index 
                        ? "ring-2 ring-black" 
                        : "ring-1 ring-gray-200 opacity-70"}`}
                    onClick={() => {
                      if (api) api.scrollTo(index);
                      setSelectedImageIndex(index);
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-[80px] h-[50px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content Sections */}
          <div className="space-y-16">
            <div className="grid grid-cols-1 gap-8">
              <h3 className="text-2xl font-bold">Project Overview</h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur. Viverra sagittis eget justo lacus tortor nam dui. 
                Convallis leo quis egestas scelerisque dui elit. Eleifend facilisi odio id vestibulum sed imperdiet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Image
                  src="/ensready-1.png"
                  alt="Project Overview"
                  width={1000}
                  height={600}
                  className="rounded-lg border border-gray-200 w-full h-auto object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Design Process</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur. Viverra sagittis eget justo lacus tortor nam dui. 
                  Convallis leo quis egestas scelerisque dui elit.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Implementation</h3>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet consectetur. Viverra sagittis eget justo lacus tortor nam dui. 
                  Convallis leo quis egestas scelerisque dui elit.
                </p>
                <p className="text-gray-700">
                  Eleifend facilisi odio id vestibulum sed imperdiet. Viverra sagittis eget justo lacus tortor.
                </p>
              </div>
              <div>
                <Image
                  src="/ensready-2.png"
                  alt="Implementation"
                  width={1000}
                  height={600}
                  className="rounded-lg border border-gray-200 w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <Image
                src="/ensready-3.png"
                alt="Full Width Image"
                width={2000}
                height={1000}
                className="rounded-lg border border-gray-200 w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
