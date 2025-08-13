"use client";
import { useEffect, useRef } from "react";

type Mode = "follow" | "idle";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const targetPos = useRef({ x: 50, y: 50 });
  const currentPos = useRef({ x: 50, y: 50 });
  const animating = useRef(false);
  
  // Mode and idle animation state
  const modeRef = useRef<Mode>("idle");
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);
  const angleRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    let lastFrameTime = 0;
    
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const targetFPS = isSafari ? 30 : 50;
    const frameInterval = 1000 / targetFPS;

    // Idle animation settings
    const idleRadiusPct = 25; // How far from center to orbit
    const idleSpeed = 0.025; // Revolutions per second (slow)

    const moveGradient = (event: MouseEvent) => {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const mouseX = (event.pageX / winWidth) * 100;
      const mouseY = (event.pageY / winHeight) * 100;
      
      // Switch to follow mode
      modeRef.current = "follow";
      targetPos.current = { x: mouseX, y: mouseY };
      
      // Reset idle timeout
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        modeRef.current = "idle";
        lastTsRef.current = null; // Reset timestamp for smooth idle start
      }, 2000); // 2 seconds of no movement = switch to idle
      
      if (!animating.current) {
        animating.current = true;
        requestAnimationFrame(animate);
      }
    };

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime < frameInterval) {
        if (animating.current) {
          requestAnimationFrame(animate);
        }
        return;
      }
      lastFrameTime = currentTime;

      if (!heroRef.current) {
        animating.current = false;
        return;
      }

      // Handle idle animation
      if (modeRef.current === "idle") {
        let dt = 0;
        if (lastTsRef.current != null) {
          dt = (currentTime - lastTsRef.current) / 1000; // Convert to seconds
        }
        lastTsRef.current = currentTime;

        // Advance angle for orbital motion
        angleRef.current += 2 * Math.PI * idleSpeed * dt;

        // Calculate orbital position around center (50%, 50%)
        const x = 50 + idleRadiusPct * Math.cos(angleRef.current);
        const y = 50 + idleRadiusPct * Math.sin(angleRef.current);
        targetPos.current = { x, y };
      }

      // Lerp toward target (whether follow or idle)
      const lerpFactor = isSafari ? 0.06 : 0.08;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      // Round values for Safari
      const roundedX = isSafari ? Math.round(currentPos.current.x * 10) / 10 : currentPos.current.x;
      const roundedY = isSafari ? Math.round(currentPos.current.y * 10) / 10 : currentPos.current.y;

      heroRef.current.style.setProperty("--noise-x", `${roundedX}%`);
      heroRef.current.style.setProperty("--noise-y", `${roundedY}%`);

      // Keep animating if we're in idle mode OR not close to target
      const dx = Math.abs(targetPos.current.x - currentPos.current.x);
      const dy = Math.abs(targetPos.current.y - currentPos.current.y);
      
      if (modeRef.current === "idle" || dx > 0.1 || dy > 0.1) {
        requestAnimationFrame(animate);
      } else {
        animating.current = false;
      }
    };

    // Start in idle mode immediately
    modeRef.current = "idle";
    animating.current = true;
    requestAnimationFrame(animate);

    document.addEventListener("mousemove", moveGradient, { passive: true });

    return () => {
      document.removeEventListener("mousemove", moveGradient);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="w-full min-h-[80vh] flex items-center justify-center bg-noise wave-border"
      >
        {/* Hero content */}
      </section>
      <div className="container mx-auto py-16">
        <p className="text-center text-lg">Scroll down for more content...</p>
        <div className="h-[120vh] bg-gray-100 dark:bg-gray-900 rounded-lg mt-8 flex items-center justify-center">
        </div>
      </div>
    </>
  );
}