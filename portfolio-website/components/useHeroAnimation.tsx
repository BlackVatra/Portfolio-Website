"use client";

import { useEffect, useRef } from "react";

export default function useHeroAnimation() {
  const heroRef = useRef<HTMLElement | null>(null);
  const targetPos = useRef({ x: 50, y: 50 });
  const currentPos = useRef({ x: 50, y: 50 });
  const animationFrame = useRef<number | null>(null);
  const rotationAngle = useRef(0);
  const lastTime = useRef<number | null>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt;

    const animate = (time: number) => {
      // Handle mouse tracking animation
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.12);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.12);
      
      // Update mouse tracking gradient
      heroElement.style.setProperty("--noise-x", `${currentPos.current.x}%`);
      heroElement.style.setProperty("--noise-y", `${currentPos.current.y}%`);

      // Handle conic gradient rotation
      if (lastTime.current === null) {
        lastTime.current = time;
        rotationAngle.current = 0;
      }
      
      // Calculate time passed
      const deltaTime = time - lastTime.current;
      lastTime.current = time;
      
      // Slower rotation: 30 seconds per full rotation (360 / 30000 = 0.012 degrees per millisecond)
      rotationAngle.current = (rotationAngle.current + (deltaTime * 0.012)) % 360;
      
      // Apply rotation
      heroElement.style.setProperty("--conic-angle", `${rotationAngle.current}deg`);

      animationFrame.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      targetPos.current.x = x;
      targetPos.current.y = y;
    };

    // Start animation
    heroElement.addEventListener("mousemove", handleMouseMove);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      heroElement.removeEventListener("mousemove", handleMouseMove);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      lastTime.current = null;
    };
  }, []);

  return { heroRef };
}