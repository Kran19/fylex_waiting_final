"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { WatchItem } from "./VoteYourPick";

interface WatchPreviewProps {
  watch: WatchItem;
  percentage: number;
}

// Helper for smoothly animating number changes when switching watch
const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 600; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeProgress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue}</span>;
};

export const WatchPreview: React.FC<WatchPreviewProps> = ({
  watch,
  percentage,
}) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[350px] md:min-h-[720px] select-none">
      {/* Main Full Watch Display + Right Vertical Percentage Badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={watch.id}
          initial={{
            scale: 0.8,
            opacity: 0.5,
            rotate: -6,
            x: -30,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: 0,
            x: 0,
          }}
          exit={{
            scale: 0.85,
            opacity: 0,
            rotate: 6,
            x: 30,
          }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 18,
            mass: 0.9,
          }}
          className="relative flex flex-col md:flex-row items-center md:items-end justify-center gap-[12px] md:gap-6 max-w-full"
        >
          {/* Full Complete Watch Image */}
          <Image
            src={watch.image}
            alt={watch.name || `Watch ${watch.id}`}
            width={800}
            height={1200}
            priority
            className="relative z-10 w-[260px] sm:w-[320px] md:w-auto h-auto md:h-[520px] object-contain drop-shadow-[0_28px_50px_rgba(0,0,0,0.95)] pointer-events-none"
          />

          {/* Percentage block removed as per user request */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
