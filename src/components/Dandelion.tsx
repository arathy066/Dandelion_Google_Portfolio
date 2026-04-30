import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';

interface SeedProps {
  id: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  size: number;
}

const DandelionSeedSVG = ({ className, strokeWidth = 0.5 }: { className?: string; strokeWidth?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* The Seed Body */}
    <path 
      d="M12 21.5C12.5 21.5 12.8 21 12.8 19.5C12.8 18 12.4 17 12 17C11.6 17 11.2 18 11.2 19.5C11.2 21 11.5 21.5 12 21.5Z" 
      fill="currentColor" 
    />
    
    {/* The Stalk */}
    <path d="M12 17V12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    
    {/* The Pappus (radial filaments) */}
    <g>
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360 / 24) * Math.PI / 180;
        const x2 = 12 + 8 * Math.cos(angle);
        const y2 = 12 + 8 * Math.sin(angle);
        return (
          <React.Fragment key={i}>
            <line x1="12" y1="12" x2={x2} y2={y2} stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.6" />
            {/* Tiny branchlets at tips */}
            <line 
              x1={x2} y1={y2} 
              x2={x2 + 1.5 * Math.cos(angle + 0.5)} y2={y2 + 1.5 * Math.sin(angle + 0.5)} 
              stroke="currentColor" strokeWidth={strokeWidth * 0.3} strokeLinecap="round" opacity="0.4" 
            />
            <line 
              x1={x2} y1={y2} 
              x2={x2 + 1.5 * Math.cos(angle - 0.5)} y2={y2 + 1.5 * Math.sin(angle - 0.5)} 
              stroke="currentColor" strokeWidth={strokeWidth * 0.3} strokeLinecap="round" opacity="0.4" 
            />
          </React.Fragment>
        );
      })}
    </g>
    
    {/* Core connection point */}
    <circle cx="12" cy="12" r="0.4" fill="currentColor" />
  </svg>
);

import plantMain from '@/Dandelion/Timeline 1_00086400.png';

const Seed = ({ initialX, initialY, duration, delay, size }: SeedProps) => {
  return (
    <motion.div
      initial={{ 
        x: `${initialX}vw`, 
        y: `${initialY}vh`, 
        opacity: 0,
        rotate: 0 
      }}
      animate={{ 
        x: [
          `${initialX}vw`, 
          `${initialX + 8}vw`, 
          `${initialX - 4}vw`, 
          `${initialX + 2}vw`
        ],
        y: [
          `${initialY}vh`, 
          `${initialY - 20}vh`, 
          `${initialY + 10}vh`, 
          `${initialY + 25}vh`
        ],
        opacity: [0, 0.2, 0.2, 0],
        rotate: [0, 45, -30, 15, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
      className="fixed pointer-events-none z-0 blur-[1px]"
      style={{ width: size, height: size }}
    >
      <DandelionSeedSVG className="w-full h-full text-current opacity-30" strokeWidth={0.3} />
    </motion.div>
  );
};

export const FloatingBackground = () => {
  const seeds = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: 25 + Math.random() * 20,
      delay: Math.random() * -30,
      size: 6 + Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-soft-light">
      {seeds.map((seed) => (
        <Seed key={seed.id} {...seed} />
      ))}
    </div>
  );
};

export const TransitionSeed = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: "50vw", y: "40vh", rotate: 0 }}
      animate={{ 
        scale: [0, 1, 0.7],
        opacity: [0, 1, 1, 0],
        x: ["50vw", "56vw", "44vw", "52vw"],
        y: ["40vh", "55vh", "80vh", "120vh"],
        rotate: [0, 90, -45, 120]
      }}
      transition={{ 
        duration: 4.5, 
        ease: [0.22, 0.61, 0.35, 1],
      }}
      onAnimationComplete={onComplete}
      className="fixed top-0 left-0 pointer-events-none z-[60] w-14 h-14 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
    >
      <DandelionSeedSVG className="w-full h-full text-white" strokeWidth={0.8} />
    </motion.div>
  );
};

export const ScrollSeed = () => {
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    restDelta: 0.001
  });

  const xBase = useTransform(smoothProgress, 
    [0, 0.2, 0.4, 0.6, 1], 
    ["70vw", "40vw", "50vw", "50vw", "50vw"]
  );
  
  const y = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ["15vh", "50vh", "85vh", "95vh"]);
  const rotate = useTransform(smoothProgress, [0, 0.6], [0, 720]);
  
  const opacity = useTransform(smoothProgress, 
    [0, 0.05, 0.45, 0.6, 1], 
    [0, 0.6, 0.6, 0, 0]
  );
  
  const scale = useTransform(smoothProgress, [0, 0.4, 0.6], [0.8, 1, 0.5]);
  
  const turbulenceAmount = useTransform(smoothProgress, [0, 0.45, 0.6], [25, 25, 0]);
  const turbulence = useTransform(smoothProgress, (p) => Math.sin(p * 30) * turbulenceAmount.get());

  return (
    <motion.div
      style={{ 
        x: xBase, 
        y, 
        rotate, 
        opacity, 
        scale,
        translateX: turbulence
      }}
      className="fixed top-0 left-0 pointer-events-none z-20 w-16 h-16 origin-center"
    >
      <motion.div
        animate={{ 
          rotate: [-5, 5, -5],
          y: [-2, 2, -2]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <DandelionSeedSVG className="w-full h-full text-current filter drop-shadow-sm" strokeWidth={0.6} />
      </motion.div>
    </motion.div>
  );
};


export const BloomingDandelion = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[700px] overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative flex flex-col items-center w-full max-w-2xl translate-y-[10%] md:translate-y-[12%] lg:translate-y-[15%]"
      >
        
        {/* The Seed that "plants" the flower */}
        <motion.div
          variants={{
            hidden: { y: -600, opacity: 0, x: -40, rotate: -60 },
            visible: { 
              y: 0, 
              opacity: [0, 1, 1, 0], 
              x: 0,
              rotate: 0,
              scale: [1.2, 1.2, 0.4]
            }
          }}
          transition={{ 
            duration: 1.5, 
            ease: [0.4, 0, 0.2, 1],
            times: [0, 0.1, 0.85, 1]
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-10 h-10 pointer-events-none"
        >
          <DandelionSeedSVG className="w-full h-full text-current opacity-40" strokeWidth={0.5} />
        </motion.div>

        <motion.img
          src={plantMain}
          variants={{
            hidden: { scale: 0, opacity: 0, originY: 'bottom' },
            visible: { scale: 1, opacity: 1 }
          }}
          transition={{ 
            duration: 2.2, 
            ease: [0.16, 1, 0.3, 1],
            delay: 1.1 // Lands right as seed vanishes
          }}
          className="w-full h-auto max-h-[600px] object-contain origin-bottom"
        />
      </motion.div>
    </div>
  );
};


