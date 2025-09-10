"use client";
import useHeroAnimation from "@/components/useHeroAnimation";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from 'react';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import RotatingText from "@/components/RotatingText";
import Image from 'next/image';
import Link from 'next/link';
import { IconArrowUpRight } from '@tabler/icons-react';
import TextPressure from "@/components/TextPressure";

export default function Home() {
  const { heroRef, getRotationTime } = useHeroAnimation();
  const rotationInterval = getRotationTime();
  
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const rotatingTexts = [
    "Product Design", 
    "Design for Developers", 
    "Design Systems", 
    "User Experience", 
    "User Flow",
    "UI Engineering",
    "Accessibility",
    "Front-End Architecture",
    "Prototyping",
    "Interaction Design",
    "Web Animation",
    "Performance Optimization"
  ];

  return (
    <>
      <section ref={heroRef} className="hero-section w-full min-h-[80vh] flex items-center justify-center wave-border">
        <div className="flex flex-col items-center justify-center w-full max-w-7xl px-4 sm:px-6 lg:px-8" data-name="hero-container">
          <div className="w-full flex items-center justify-center" data-name="rotating-text-wrapper">
            <TextPressure 
              texts={rotatingTexts}
              rotationInterval={rotationInterval}
              className="text-4xl md:text-6xl text-center"
              textColor="#FFFFFF"
              width={true}
              weight={true}
              italic={false}
              minFontSize={32}
            />
          </div>
          <p className="text-lg text-center max-w-xl mt-6 mb-6">
            Sending you a virtual hug! Explore my work, skills, and experience. Scroll down to see more!
          </p>
          <Button size="lg">Get Started</Button>
        </div>
      </section>
      
      <section className="py-16 relative min-h-screen">
        <div className="mx-auto max-w-[2000px] px-4 sm:px-6 md:px-12 lg:px-16 flex justify-center items-center">
          {/* First testimonials block */}
          <div className="w-full rounded-3xl md:max-w-7xl bg-sky-100 overflow-hidden flex justify-center items-center">
            <div className="relative p-6 sm:p-8 lg:p-10 w-full flex flex-col items-center">
              <div className="flex items-center justify-between mb-6 w-full">
          <h2 className="text-4xl font-bold">What Our Clients Say</h2>
          <Button 
            asChild
            size="lg"
            variant="default"
            className="gap-1"
          >
            <Link href="/projects?project=client-testimonials">
              <span>See more</span>
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
              </div>
              <AnimatedTestimonials 
          testimonials={[
            {
              quote: "The attention to detail and the quality of the design work exceeded our expectations. We're extremely satisfied with the results.",
              name: "John Doe",
              designation: "Product Manager at TechCorp",
              src: "/ensready-1.png",
              figmaUrl: "https://figma.com/file/example1",
              websiteUrl: "https://example1.com"
            },
            {
              quote: "Working with this team has been an absolute pleasure. Their understanding of UX principles and ability to translate requirements into beautiful designs is remarkable.",
              name: "Sarah Williams",
              designation: "CTO at StartupInnovate",
              src: "/ensready-2.png",
              figmaUrl: "https://figma.com/file/example2",
              websiteUrl: "https://example2.com"
            },
            {
              quote: "The design system they created has streamlined our development process significantly. Our team is now much more efficient.",
              name: "Michael Chen",
              designation: "Lead Developer at WebSolutions",
              src: "/ensready-3.png",
              figmaUrl: "https://figma.com/file/example3",
              websiteUrl: "https://example3.com"
            },
            {
              quote: "Their approach to accessible design has made our product usable by a much wider audience. The ROI has been tremendous.",
              name: "Jessica Martinez",
              designation: "Accessibility Specialist",
              src: "/ensready-4.png",
              figmaUrl: "https://figma.com/file/example4",
              websiteUrl: "https://example4.com"
            },
            {
              quote: "Their approach to accessible design has made our product usable by a much wider audience. The ROI has been tremendous.",
              name: "Alex Johnson",
              designation: "UX Director",
              src: "/ensready-5.png",
              figmaUrl: "https://figma.com/file/example5",
              websiteUrl: "https://example5.com"
            },
            {
              quote: "Their approach to accessible design has made our product usable by a much wider audience. The ROI has been tremendous.",
              name: "Emily Turner",
              designation: "Product Designer",
              src: "/ensready-6.png",
              figmaUrl: "https://figma.com/file/example6",
              websiteUrl: "https://example6.com"
            },
            {
              quote: "Their approach to accessible design has made our product usable by a much wider audience. The ROI has been tremendous.",
              name: "Jessica Martinez",
              designation: "Accessibility Specialist",
              src: "/ensready-7.png",
              figmaUrl: "https://figma.com/file/example7",
              websiteUrl: "https://example.com/project7"
            }
          ]}
          autoplay={true}
          className="flex justify-center"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
