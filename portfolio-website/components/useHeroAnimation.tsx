"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GRADIENT_ROTATION_SPEED = 0.08; // degrees per millisecond for gradients
const TEXT_ROTATION_SPEED = 0.078; // degrees per millisecond for text (slower)
const TEXT_TIME_OFFSET = 0; // milliseconds offset for text rotation (adjust this to shift the phase)

// Create a singleton to share rotation angles across components
const sharedState = {
  gradientAngle: 0,
  textAngle: 0
};

export default function useHeroAnimation() {
  const heroRef = useRef<HTMLElement | null>(null);
  const targetPos = useRef({ x: 50, y: 50 });
  const currentPos = useRef({ x: 50, y: 50 });
  const animationFrame = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  const lastRenderTime = useRef<number>(0);
  const lastMouseUpdate = useRef<number>(0);
  const [isInView, setIsInView] = useState(true);
  
  // Throttle settings - lower values = less CPU usage
  const FRAME_THROTTLE = 20; // Milliseconds between animation frames (about 25fps)
  const MOUSE_THROTTLE = 80; // Milliseconds between mouse updates

  // Function to get current rotation angles for other components
  const getRotationAngles = useCallback(() => {
    return {
      gradient: sharedState.gradientAngle,
      text: sharedState.textAngle
    };
  }, []);

  // Calculate full rotation time in milliseconds for text
  const getRotationTime = useCallback(() => {
    return 180 / TEXT_ROTATION_SPEED; // time for one full rotation in milliseconds
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt;

    // Set up Intersection Observer to detect when hero is in/out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        // Resume or pause animation based on visibility
        if (entry.isIntersecting && animationFrame.current === null) {
          // When resuming, maintain relative timing from start
          if (startTime.current === null) {
            startTime.current = performance.now();
          }
          lastRenderTime.current = performance.now();
          animationFrame.current = requestAnimationFrame(animate);
        } else if (!entry.isIntersecting && animationFrame.current !== null) {
          // Pause animation but preserve the current angle
          cancelAnimationFrame(animationFrame.current);
          animationFrame.current = null;
        }
      },
      { threshold: 0.1 } // 10% of the element needs to be visible
    );

    observer.observe(heroElement);

    const animate = (time: number) => {
      // Don't animate if not in view
      if (!isInView) {
        animationFrame.current = null;
        return;
      }
      
      // Throttle animation frames to reduce CPU usage
      if (time - lastRenderTime.current < FRAME_THROTTLE) {
        animationFrame.current = requestAnimationFrame(animate);
        return;
      }
      lastRenderTime.current = time;
      
      // Handle mouse tracking animation (with less sensitivity)
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.08);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.08);
      
      // Round values to 2 decimal places before updating CSS variables
      const roundedX = Math.round(currentPos.current.x * 100) / 100;
      const roundedY = Math.round(currentPos.current.y * 100) / 100;
      
      // Update mouse tracking gradient with rounded values
      heroElement.style.setProperty("--noise-x", `${roundedX}%`);
      heroElement.style.setProperty("--noise-y", `${roundedY}%`);

      // Initialize or adjust start time to align with frame throttle
      if (startTime.current === null) {
        // Align initial time with frame throttle to ensure consistent timing from the start
        startTime.current = Math.floor(time / FRAME_THROTTLE) * FRAME_THROTTLE;
        lastRenderTime.current = startTime.current;
      }

      // Calculate angle based on throttled time to ensure consistent timing
      const elapsedTime = Math.floor((time - startTime.current) / FRAME_THROTTLE) * FRAME_THROTTLE;
      
      // Calculate gradient angle
      const currentGradientAngle = (elapsedTime * GRADIENT_ROTATION_SPEED) % 360;
      sharedState.gradientAngle = currentGradientAngle;
      
      // Calculate text angle with time offset (different speed and phase)
      const offsetElapsedTime = elapsedTime + TEXT_TIME_OFFSET;
      const currentTextAngle = (offsetElapsedTime * TEXT_ROTATION_SPEED) % 360;
      sharedState.textAngle = currentTextAngle;
      
      // Round angles to 2 decimal places before updating CSS
      const roundedGradientAngle = Math.round(currentGradientAngle * 100) / 100;
      const roundedTextAngle = Math.round(currentTextAngle * 100) / 100;
      
      // Apply gradient rotation with rounded values - second gradient rotates in opposite direction
      heroElement.style.setProperty("--conic-angle", `${roundedGradientAngle}deg`);
      heroElement.style.setProperty("--conic-angle-reverse", `${-roundedGradientAngle}deg`);
      // Apply text rotation
      heroElement.style.setProperty("--text-angle", `${roundedTextAngle}deg`);

      animationFrame.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse updates to reduce CPU usage
      const now = Date.now();
      if (now - lastMouseUpdate.current < MOUSE_THROTTLE) {
        return;
      }
      lastMouseUpdate.current = now;
      
      const rect = heroElement.getBoundingClientRect();
      
      // Round to 2 decimal places to reduce precision and calculations
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100 * 100) / 100;
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100 * 100) / 100;
      
      targetPos.current.x = x;
      targetPos.current.y = y;
    };

    // Start animation only if in view
    heroElement.addEventListener("mousemove", handleMouseMove);
    
    if (isInView) {
      lastRenderTime.current = performance.now();
      animationFrame.current = requestAnimationFrame(animate);
    }

    return () => {
      heroElement.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      startTime.current = null;
    };
  }, [isInView]); // Re-run effect when isInView changes

  return { heroRef, getRotationAngles, getRotationTime };
}
