/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  ArrowRight,
  Heart,
  ArrowLeft,
  Play,
  Volume2,
  VolumeX
} from 'lucide-react';
import profileImg from './images/IMG_7628.JPG';
import heroVideo from './IMG_0177_1.mp4';
import { FloatingBackground, TransitionSeed, ScrollSeed, BloomingDandelion } from './components/Dandelion';
import tootlboxImg from './src/images/tootlbox.png';
import careImg from './images/Gemini_Generated_Image_y4txs6y4txs6y4tx.png';
import zaraImg from './images/image 25.png';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Sofvie Mobile",
    description: "Mobile App Redesign & AI Workflow Exploration for mining safety.",
    tags: ["UX Design", "AI Workflow"],
    link: "sofvie",
    image: "https://picsum.photos/seed/sofvie/800/600"
  },
  {
    id: 2,
    title: "Care Connect",
    description: "Accessibility-first healthcare platform designed for simplified daily health management.",
    tags: ["Accessibility", "Healthcare", "UX/UI"],
    link: "careconnect",
    image: careImg
  },
  {
    id: 3,
    title: "Zara Redesign",
    description: "Enhancing the Zara e-commerce experience through heuristic evaluation and UI refinement.",
    tags: ["UX Research", "E-commerce", "UI Design"],
    link: "zara",
    image: zaraImg
  },
  {
    id: 4,
    title: "AR Reading Experience",
    description: "Transforming everyday commutes into meaningful reading moments through speculative AR.",
    tags: ["Interaction", "AR", "Motion Storytelling"],
    link: "ar-reading",
    image: "https://picsum.photos/seed/ar-read/800/600"
  },
  {
    id: 5,
    title: "AI Tools & Workflow Exploration",
    description: "Designing the future of productivity with AI-driven workflows.",
    tags: ["AI Tools", "Productivity", "Workflow Design"],
    link: "ai-workflow",
    image: "https://picsum.photos/seed/ai-exploration/800/600"
  },
  {
    id: 6,
    title: "Stone Studio",
    description: "Minimalist e-commerce for high-end architectural products.",
    tags: ["Shopify", "React", "Branding"],
    link: "#",
    image: "https://picsum.photos/seed/stone/800/600"
  }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });
  
  const [view, setView] = useState<'home' | 'work' | 'about' | 'sofvie' | 'careconnect' | 'zara' | 'ar-reading' | 'ai-workflow'>('home');
  const [introStatus, setIntroStatus] = useState<'playing' | 'transitioning' | 'finished'>(() => {
    // Skip intro if already seen in session
    return sessionStorage.getItem('intro_seen') === 'true' ? 'finished' : 'playing';
  });

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  const seedTextOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const seedTextY = useTransform(scrollYProgress, [0.45, 0.55], [20, 0]);

  useEffect(() => {
    if (videoRef.current && introStatus === 'playing') {
      videoRef.current.play().catch(e => console.warn("Autoplay blocked", e));
    }
  }, [introStatus]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleIntroEnd = () => {
    setIntroStatus('transitioning');
  };

  const handleTransitionComplete = () => {
    setIntroStatus('finished');
    sessionStorage.setItem('intro_seen', 'true');
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-[#1a1a1a] dark:text-[#f5f5f5] selection:bg-[#1a1a1a] dark:selection:bg-[#f5f5f5] selection:text-[#fafafa] dark:selection:text-[#0a0a0a] transition-colors duration-500 font-sans relative">
      
      {/* Persistent Background Effects */}
      <FloatingBackground />
      <ScrollSeed />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 md:py-6 flex justify-between items-center transition-all duration-300 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setView('home')}
          className="text-lg md:text-xl font-sans font-normal flex items-center gap-1 cursor-pointer pointer-events-auto text-white bg-black/20 backdrop-blur-[2px] px-4 py-2 rounded-full shadow-2xl"
        >
          arathy <Heart size={14} className="fill-current text-white" />
        </motion.div>
        
        <div className="flex items-center gap-2 md:gap-4 pointer-events-auto bg-black/20 backdrop-blur-[2px] px-3 md:px-5 py-2 rounded-full shadow-2xl">
          <button 
            onClick={() => {
              if (view === 'home') {
                document.getElementById('recent-work')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                setView('work');
              }
            }} 
            className={`px-3 py-1.5 text-xs md:text-sm uppercase tracking-widest hover:opacity-100 transition-opacity text-white ${view === 'work' ? 'opacity-100 font-bold' : 'opacity-80'}`}
          >
            Work
          </button>
          <button 
            onClick={() => setView('about')} 
            className={`px-3 py-1.5 text-xs md:text-sm uppercase tracking-widest hover:opacity-100 transition-opacity text-white ${view === 'about' ? 'opacity-100 font-bold' : 'opacity-80'}`}
          >
            About
          </button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={toggleTheme}
            className="p-1.5 md:p-2 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>
      </nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto px-6 pb-20 relative"
          >
            <section className="mb-24 md:mb-32 lg:mb-40 min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] flex flex-col justify-center relative pt-[calc(16rem-3cm)] md:pt-[calc(24rem-3cm)] lg:pt-[calc(450px-3cm)]">
              {/* Hero Video Background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full overflow-hidden z-0 group">
                <video 
                  ref={videoRef}
                  autoPlay 
                  muted={isMuted}
                  loop={introStatus === 'finished'}
                  playsInline
                  onEnded={() => {
                    if (introStatus === 'playing') {
                      handleIntroEnd();
                    }
                  }}
                  className="w-full h-full object-cover object-center transition-opacity duration-1000 opacity-100"
                  src={heroVideo}
                />
                
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {/* Top gradient for navigation readability */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/40 to-transparent" />
                  
                  {/* Main fade to background - starting much lower at 100000000000000000000000000000000000000000000000000000000000000% to clear all text content */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent via-100000000000000000000000000000000000000000000000000000000000000% to-[#fafafa] dark:to-[#0a0a0a]" />
                  
                  {/* Bottom edge blending */}
                  <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-[#fafafa] dark:from-[#0a0a0a] to-transparent" />
                </div>
                
                {/* Video Controls Integration */}
                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex gap-4 z-10">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-[#201f1f] hover:bg-[#201f1f]/80 backdrop-blur-md transition-colors text-white border border-white/10"
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  {introStatus === 'playing' && (
                    <button 
                      onClick={() => setIntroStatus('finished')}
                      className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-xs uppercase tracking-widest text-white opacity-80 hover:opacity-100 transition-opacity border border-white/10"
                    >
                      Skip Journey
                    </button>
                  )}
                </div>
              </div>

              {introStatus === 'transitioning' && <TransitionSeed onComplete={handleTransitionComplete} />}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <div className="relative w-fit">
                  <div className="backdrop-blur-[1px] bg-white/5 dark:bg-black/10 px-4 py-1.5 rounded-full shadow-sm mb-6 md:mb-8 mt-4">
                    <span className="text-xs md:text-sm tracking-normal font-bold opacity-90 block text-white">
                      UI/UX Designer | Visual Storyteller | Front-end Developer
                    </span>
                  </div>
                  
                  <div className="relative">
                    {/* Soft Blended Blur Background - extremely tight for heading */}
                    <div className="absolute inset-[-0.25rem] md:inset-[-0.5rem] backdrop-blur-sm bg-black/10 [mask-image:radial-gradient(circle_at_center,_black_0%,_transparent_100%)] pointer-events-none" />
                    
                    <h1 className="relative z-10 text-[49px] font-heading font-medium leading-[0.95] md:leading-[0.9] mb-6 md:mb-8 drop-shadow-2xl text-white">
                      Every idea <span className="opacity-70 italic">starts</span> <br className="md:block hidden" />
                      small.
                    </h1>
                  </div>
                </div>
                <p className="max-w-none text-base md:text-lg lg:text-xl font-medium leading-relaxed mb-8 md:mb-12 mt-[1.2cm] text-black dark:text-[#d4d3d3]">
                  I explore, design, and bring ideas to life through storytelling and code.
                </p>

                <div className="flex gap-6 items-center mt-[0.3cm]">
                  <button 
                    onClick={() => document.getElementById('recent-work')?.scrollIntoView({ behavior: 'smooth' })} 
                    className="flex items-center gap-2 group text-sm font-semibold text-black dark:text-white hover:opacity-80 transition-opacity"
                  >
                    View Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="w-[1px] h-6 bg-black dark:bg-white opacity-20" />
                  <button 
                    onClick={() => setView('about')} 
                    className="flex items-center gap-2 group text-sm font-semibold text-black dark:text-white hover:opacity-80 transition-opacity"
                  >
                    About Me <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </section>

            <div className="flex justify-center mb-16 pointer-events-none">
              <motion.div 
                style={{ opacity: seedTextOpacity, y: seedTextY }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-[1px] h-12 bg-linear-to-b from-transparent to-black dark:to-white opacity-20" />
                <span className="text-sm uppercase tracking-[0.4em] font-medium opacity-60 text-black dark:text-white">
                  where seeds take root
                </span>
              </motion.div>
            </div>

            <section id="recent-work" className="mb-40 scroll-mt-32">
              <div className="flex justify-between items-end mb-12">
                <h2 className="text-2xl font-heading font-semibold uppercase tracking-tight">Recent Work</h2>
                <button onClick={() => setView('work')} className="text-xs opacity-50 underline underline-offset-4">Selected Library</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {PROJECTS.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index} 
                    onClick={() => {
                      if (project.link === 'sofvie') setView('sofvie');
                      if (project.link === 'careconnect') setView('careconnect');
                      if (project.link === 'zara') setView('zara');
                      if (project.link === 'ar-reading') setView('ar-reading');
                      if (project.link === 'ai-workflow') setView('ai-workflow');
                    }}
                  />
                ))}
              </div>
            </section>
            
            <SkillsGrid />
            <WhyDandelion />
            <ContactSection />
          </motion.main>
        )}

        {view === 'work' && (
          <motion.main 
            key="work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto px-6 pt-40 pb-20"
          >
            <div className="mb-20">
              <button 
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-8"
              >
                <ArrowLeft size={14} /> Back to Home
              </button>
              <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tighter mb-4">Selected Library</h1>
              <p className="opacity-60 max-w-lg">A chronicle of my journey through development and design, from early experiments to professional products.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 gap-y-20">
              {PROJECTS.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  onClick={() => {
                    if (project.link === 'sofvie') setView('sofvie');
                    if (project.link === 'careconnect') setView('careconnect');
                    if (project.link === 'zara') setView('zara');
                    if (project.link === 'ar-reading') setView('ar-reading');
                    if (project.link === 'ai-workflow') setView('ai-workflow');
                  }}
                />
              ))}
            </div>
            
            <ContactSection />
          </motion.main>
        )}

        {view === 'sofvie' && (
          <motion.main 
            key="sofvie"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto px-6 pt-40 pb-20"
          >
            <button 
              onClick={() => setView('work')}
              className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-12"
            >
              <ArrowLeft size={14} /> Back to Projects
            </button>

            {/* Hero Section */}
            <section className="mb-24">
              <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tighter mb-8 leading-tight">
                Sofvie Mobile Redesign
              </h1>
              <p className="text-xl md:text-2xl opacity-70 font-light leading-relaxed mb-16 max-w-3xl">
                Modernizing mining safety through user-centric design. <br />
                <span className="italic font-normal">“The redesign focuses on reducing cognitive load and improving usability in safety-critical environments.”</span>
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-current/10">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Role</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-3">UX/UI Designer</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Company</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-3">Sofvie Inc.</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Tools</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-3">Figma, AI Studio</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Timeline</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-3">4 Months</p>
                </div>
              </div>
            </section>

            <div className="space-y-48">
              {/* Home Screen Section */}
              <section className="space-y-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="space-y-4 max-w-xl">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Phases 01 — 04</span>
                    <h2 className="text-4xl font-heading font-medium">Home Screen Redesign</h2>
                    <p className="opacity-60 leading-relaxed">Transitioning from a dense grid to a rhythm-based list architecture for better field ergonomics.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                  <div className="space-y-12">
                    {[
                      { 
                        title: "01. Grid → List Layout", 
                        desc: "Replaced the dense grid with a single-column list layout, making navigation more intuitive and easier to scan on mobile devices."
                      },
                      { 
                        title: "02. Visual Hierarchy", 
                        desc: "Introduced clear spacing, alignment, and typography to guide user attention and reduce visual clutter."
                      },
                      { 
                        title: "03. Content Clarity", 
                        desc: "Simplified labels and improved readability, ensuring users can quickly understand features without confusion."
                      },
                      { 
                        title: "04. Touch Accessibility", 
                        desc: "Converted small card elements into full-width touch targets, improving usability for workers wearing gloves."
                      }
                    ].map((point, i) => (
                      <div key={i} className="group border-l border-current/10 pl-6 space-y-2 py-2 hover:border-current transition-colors">
                        <h4 className="text-lg font-medium">{point.title}</h4>
                        <p className="text-sm opacity-50 leading-relaxed max-w-sm">{point.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-16 lg:sticky lg:top-32 h-fit flex flex-col items-center lg:items-end">
                    <div className="space-y-12 w-full max-w-[320px]">
                      <div className="space-y-4">
                        <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Before: Legacy Grid</span>
                        <div className="aspect-[9/16] rounded-3xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-current/5 opacity-100 relative group/mockup">
                          <img src="https://picsum.photos/seed/sofvie-home-old/600/1000" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 border-[8px] border-black/5 dark:border-white/5 rounded-3xl pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <span className="text-[10px] uppercase font-bold opacity-100 tracking-widest">After: List Redesign</span>
                        <div className="aspect-[9/16] rounded-[2.5rem] bg-white dark:bg-zinc-900 overflow-hidden border-[6px] border-zinc-200 dark:border-zinc-800 shadow-2xl transition-transform hover:scale-[1.02] relative">
                          <img src={tootlboxImg} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-b-2xl" /> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Button System Section */}
              <section className="space-y-20">
                <div className="space-y-4 max-w-xl">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Consistency & Systems</span>
                  <h2 className="text-4xl font-heading font-medium">Defined Component Hierarchy</h2>
                  <p className="opacity-60 leading-relaxed">Standardizing interaction patterns to reduce cognitive load across the entire application.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Primary Button Column */}
                  <div className="p-8 rounded-3xl border border-current/10 space-y-6 flex flex-col justify-between hover:bg-current/[0.02] transition-colors">
                    <div className="space-y-3">
                      <div className="h-12 w-full bg-[#0070CE] rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">Button-Default</span>
                      </div>
                      <div className="h-12 w-full bg-[#001737] rounded-xl flex items-center justify-center border border-white/5">
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">Button-Clicked</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm uppercase tracking-wide">05. Primary Button</h4>
                      <p className="text-xs opacity-50 leading-relaxed">Main operational actions. High contrast and authoritative colors.</p>
                    </div>
                  </div>

                  {/* Secondary Button Column */}
                  <div className="p-8 rounded-3xl border border-current/10 space-y-6 flex flex-col justify-between hover:bg-current/[0.02] transition-colors">
                    <div className="space-y-3">
                      <div className="h-12 w-full bg-white border-2 border-[#0070CE] rounded-xl flex items-center justify-center">
                        <span className="text-[10px] font-bold text-[#0070CE] tracking-widest uppercase">Default</span>
                      </div>
                      <div className="h-12 w-full bg-[#E1F0FF] border-2 border-[#0070CE] rounded-xl flex items-center justify-center">
                        <span className="text-[10px] font-bold text-[#0070CE] tracking-widest uppercase">Clicked</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm uppercase tracking-wide">06. Secondary Button</h4>
                      <p className="text-xs opacity-50 leading-relaxed">Supporting actions for drafts and transit status. Outlined hierarchy.</p>
                    </div>
                  </div>

                  {/* Tertiary Button Column */}
                  <div className="p-8 rounded-3xl border border-current/10 space-y-6 flex flex-col justify-between hover:bg-current/[0.02] transition-colors">
                    <div className="space-y-6 h-28 flex flex-col justify-center items-center">
                      <div className="flex items-center gap-2 text-[#4FA13C] font-bold hover:scale-105 transition-transform cursor-pointer">
                        <ArrowRight size={14} className="rotate-[-45deg]" />
                        <span className="text-xs uppercase tracking-wider">Continue</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm uppercase tracking-wide">07. Button 3rd Type</h4>
                      <p className="text-xs opacity-50 leading-relaxed">Quick actions like Continue or Delete. Minimal footprint for secondary navigation.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 max-w-2xl mx-auto">
                  <div className="aspect-[16/9] rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative border border-current/5">
                    <img src="https://picsum.photos/seed/sofvie-buttons-context/1200/600" className="w-full h-full object-cover opacity-100 transition-opacity duration-1000" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                  <p className="text-xs opacity-40 text-center max-w-lg mx-auto leading-relaxed underline underline-offset-4 decoration-current/20">Standardized states (default, clicked) ensure a predictable experience regardless of the task.</p>
                </div>
              </section>

              {/* Toolbox Redesign Section */}
              <section className="space-y-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="space-y-4 max-w-xl">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Phases 08 — 11</span>
                    <h2 className="text-4xl font-heading font-medium">Toolbox Information Architecture</h2>
                    <p className="opacity-60 leading-relaxed">Optimizing the most-used surface for rapid form discovery and accurate task selection.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-8 order-2 lg:order-1 lg:pr-12">
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { title: "Structured Content", desc: "Organized Outstanding, Activity, and All Forms into explicit sections." },
                        { title: "Enhanced Filters", desc: "Replaced confusing tabs with clearly styled button filters." },
                        { title: "Search & Discovery", desc: "Added high-visibility global search and categorized drops." },
                        { title: "Info Architecture", desc: "Removed long expandable clutter in favor of clean header labels." }
                      ].map((item, i) => (
                        <div key={i} className="p-6 border border-current/10 rounded-2xl space-y-1 hover:bg-current/[0.01] transition-colors">
                          <h4 className="text-sm font-bold uppercase tracking-tight">{item.title}</h4>
                          <p className="text-xs opacity-50">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="order-1 lg:order-2 grid grid-cols-2 gap-6 relative max-w-[480px] mx-auto lg:mx-0">
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-bold opacity-30">Old Toolbox</span>
                      <div className="aspect-[9/16] rounded-2xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden opacity-100 border border-current/5">
                         <img src="https://picsum.photos/seed/tool-old/600/1000" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-bold opacity-100">Redesigned</span>
                      <div className="aspect-[9/16] rounded-2xl bg-white dark:bg-zinc-900 border-[4px] border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-xl scale-[1.03]">
                         <img src={tootlboxImg} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 mt-20 bg-zinc-50 dark:bg-zinc-900/40 p-12 rounded-[3.5rem] border border-current/5">
                   <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 text-center">Full Interactive Journey</p>
                   <a 
                     href="#" 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-3xl md:text-5xl font-heading font-medium hover:italic transition-all flex items-center gap-4 group text-center"
                   >
                     View Figma Prototype <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                   </a>
                   <div className="h-[1px] w-12 bg-current opacity-20 my-2" />
                   <p className="text-[10px] opacity-40 font-mono tracking-tighter uppercase mb-8">www.figma.com/proto/sofvie-redesign</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-current/5 w-full">
                     {[
                       { label: "Design System", desc: "Standardized cards and alignment." },
                       { label: "Modern UI", desc: "Softer elements and clean layouts." },
                       { label: "Safety First", desc: "Optimization for speed and focus." }
                     ].map((item, i) => (
                       <div key={i} className="space-y-1">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">{item.label}</h4>
                          <p className="text-[10px] opacity-60 leading-relaxed uppercase">{item.desc}</p>
                       </div>
                     ))}
                   </div>
                </div>
              </section>

              {/* AI Exploration Section */}
              <section className="space-y-20">
                <div className="space-y-4 max-w-xl">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Future-Proofing</span>
                  <h2 className="text-4xl font-display font-medium">AI Workflow Exploration</h2>
                  <p className="opacity-60 leading-relaxed">Leveraging Gemini and NotebookLM to optimize safety data synthesis and design prototyping.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { 
                      title: "Productivity Agents", 
                      desc: "Created custom Gemini 'Gems' to act as specialized design assistants for rapid auditing.",
                      tag: "Gemini 1.5 Pro"
                    },
                    { 
                      title: "Knowledge Synthesis", 
                      desc: "Used NotebookLM to structure dense mining safety reports into actionable UI patterns.",
                      tag: "NotebookLM"
                    }
                  ].map((ai, i) => (
                    <div key={i} className="p-10 rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border border-current/5 space-y-6">
                      <span className="text-[10px] font-bold opacity-20 uppercase tracking-widest">{ai.tag}</span>
                      <h4 className="text-2xl font-heading">{ai.title}</h4>
                      <p className="text-sm opacity-50 leading-relaxed">{ai.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Final Learning */}
              <section className="text-center max-w-2xl mx-auto py-20 border-t border-current/10">
                 <h2 className="text-xl font-heading italic opacity-60 mb-4">"Minimalism is survival."</h2>
                 <p className="text-sm opacity-40">The core takeaway from designing in the mining safety space.</p>
              </section>
            </div>
            
            <ContactSection />
          </motion.main>
        )}

        {view === 'careconnect' && (
          <motion.main 
            key="careconnect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto px-6 pt-40 pb-20"
          >
            <button 
              onClick={() => setView('work')}
              className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-12"
            >
              <ArrowLeft size={14} /> Back to Projects
            </button>

            {/* Hero Section */}
            <section className="mb-24">
              <span className="text-sm uppercase tracking-[0.3em] font-bold opacity-30 block mb-4">Project 02</span>
              <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tighter mb-8 leading-tight uppercase">
                Care Connect
              </h1>
              <p className="text-xl md:text-2xl opacity-70 font-light leading-relaxed mb-16 max-w-3xl">
                Accessible healthcare, simplified for everyone. <br />
                <span className="italic font-normal opacity-60">"Simplifying daily health management for elderly users, caregivers, and busy individuals."</span>
              </p>

              <div className="aspect-[16/9] w-full rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 overflow-hidden mb-16 border border-current/5 shadow-2xl">
                <img src={careImg} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">[ PLACE HERO IMAGE HERE ]</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-current/10">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Role</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-3">Lead UX Designer</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Category</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-3">Healthcare / Accessibility</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Focus</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-3">Inclusive Design</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Outcome</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-4 text-emerald-500 font-bold tracking-tight">Case Study Prototype</p>
                </div>
              </div>
            </section>

            <div className="space-y-48">
              {/* Overview & Problem */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.3em] font-bold text-white bg-blue-600 dark:bg-blue-500 px-3 py-1 w-fit block mb-4">01. Overview</span>
                    <h2 className="text-3xl font-heading font-medium">The Context</h2>
                    <p className="opacity-60 leading-relaxed">CareConnect is an accessibility-first healthcare platform designed to simplify daily health management. It focuses on reducing complexity in managing medications, appointments, and health records for those who need it most.</p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.3em] font-bold text-white bg-rose-500 px-3 py-1 w-fit block mb-4">02. The Problem</span>
                    <h2 className="text-3xl font-heading font-medium">Fragmented Care</h2>
                    <p className="opacity-60 leading-relaxed mb-6">Current healthcare apps are often difficult to use, especially for elderly users and people with impairments, leading to:</p>
                    <ul className="space-y-3 text-sm">
                      {["Confusing appointment systems", "Inconsistent medication reminders", "Poor accessibility (cluttered UI)", "Fragmented health data"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 opacity-70">
                           <div className="w-1 h-1 bg-rose-500 rounded-full" />
                           {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Solution Section */}
              <section className="space-y-20">
                <div className="text-center max-w-2xl mx-auto space-y-6">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">03. The Solution</span>
                  <h2 className="text-5xl font-heading font-medium tracking-tight">Accessible by Design.</h2>
                  <p className="opacity-60">CareConnect simplifies healthcare management through an intuitive experience focused on high contrast, large touch targets, and clear information hierarchy.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Medication Tracking", desc: "Large visual alerts and consistent interaction patterns for daily adherence." },
                    { title: "Caregiver Sync", desc: "Remote monitoring capabilities for family members to provide support quietly." },
                    { title: "Centralized Records", desc: "All prescriptions and reports stored in a simple, searchable repository." }
                  ].map((feat, i) => (
                    <div key={i} className="p-8 rounded-[2rem] border border-current/10 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
                      <h4 className="font-bold text-sm uppercase tracking-wide">{feat.title}</h4>
                      <p className="text-xs opacity-50 leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="aspect-[4/3] rounded-3xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-current/5 overflow-hidden">
                      <img src="https://picsum.photos/seed/care-feat-1/800/600" className="w-full h-full object-cover" />
                      <div className="absolute p-4 bg-black/60 backdrop-blur-md rounded-lg text-white text-[10px] uppercase tracking-widest font-bold">[ CALENDAR MOCKUP ]</div>
                   </div>
                   <div className="aspect-[4/3] rounded-3xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-current/5 overflow-hidden">
                      <img src="https://picsum.photos/seed/care-feat-2/800/600" className="w-full h-full object-cover" />
                      <div className="absolute p-4 bg-black/60 backdrop-blur-md rounded-lg text-white text-[10px] uppercase tracking-widest font-bold">[ DASHBOARD MOCKUP ]</div>
                   </div>
                </div>
              </section>

              {/* Research & Persona */}
              <section className="space-y-20">
                <div className="flex flex-col md:flex-row gap-20 items-center">
                  <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                      <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">05. Research</span>
                      <h2 className="text-4xl font-heading font-medium">Understanding the User</h2>
                      <p className="opacity-60 leading-relaxed">Focusing on elderly users managing chronic conditions who value simplicity and independence above all else.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-[#E1F0FF] dark:bg-blue-900/20 border border-blue-500/10">
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Core Insights:</h4>
                        <ul className="space-y-4 text-sm opacity-80 italic">
                          <li>"Needs clear, clutter-free interfaces."</li>
                          <li>"Wants reminders she can trust."</li>
                          <li>"Prefers minimal dependency on others."</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 w-full max-w-sm aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] border border-current/5 overflow-hidden relative group">
                    <img src="https://picsum.photos/seed/persona/600/800" className="w-full h-full object-cover saturate-50 group-hover:saturate-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end text-white">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 mb-2">User Persona</span>
                      <h3 className="text-3xl font-heading mb-1">Nathu Thompson</h3>
                      <p className="text-xs opacity-60 uppercase tracking-widest">72 Years • Hypertension & Diabetes</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pain Points & Design Goals */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="p-10 rounded-[2.5rem] bg-rose-50 dark:bg-rose-950/20 border border-rose-500/10 space-y-6">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 text-rose-600 dark:text-rose-400">06. Pain Points</h4>
                  <ul className="space-y-4 text-sm opacity-70">
                    <li>• Overwhelming app interfaces</li>
                    <li>• Repeated/confusing features</li>
                    <li>• Fear of missing medications</li>
                    <li>• Difficulty reading small text</li>
                  </ul>
                </div>
                <div className="p-10 rounded-[2.5rem] bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/10 space-y-6">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 text-emerald-600 dark:text-emerald-400">07. Design Goals</h4>
                  <ul className="space-y-4 text-sm opacity-70">
                    <li>• Accessibility-first design</li>
                    <li>• Reduce cognitive load</li>
                    <li>• Build trust through clarity</li>
                    <li>• Support independence with caregiver help</li>
                  </ul>
                </div>
              </section>

              {/* Customer Journey */}
              <section className="space-y-20">
                <div className="space-y-4 max-w-xl">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">08. Customer Journey</span>
                  <h2 className="text-4xl font-heading font-medium">The User's Path</h2>
                  <p className="opacity-60 leading-relaxed">Mapping the transition from awareness to loyalty through simple, reliable health interactions.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { stage: "Awareness", desc: "Finds simple health solution" },
                    { stage: "Consideration", desc: "Compares accessibility features" },
                    { stage: "Decision", desc: "Tries seamless onboarding" },
                    { stage: "Loyalty", desc: "Integrates into daily routine" }
                  ].map((step, i) => (
                    <div key={i} className="p-6 border border-current/10 rounded-2xl space-y-3 relative overflow-hidden group">
                      <span className="text-[40px] font-heading font-bold opacity-[0.03] absolute -top-2 -right-2">{i+1}</span>
                      <h4 className="text-xs font-bold uppercase tracking-widest">{step.stage}</h4>
                      <p className="text-[10px] opacity-50 uppercase">{step.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="aspect-[21/9] w-full rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border border-current/5 flex items-center justify-center overflow-hidden">
                   <img src="https://picsum.photos/seed/care-journey/1200/500" className="w-full h-full object-cover opacity-40" />
                   <div className="absolute p-4 bg-black/60 backdrop-blur-md rounded-lg text-white text-[10px] uppercase tracking-widest font-bold">[ PLACE JOURNEY MAP HERE ]</div>
                </div>
              </section>

              {/* Design Process */}
              <section className="space-y-20">
                 <div className="flex justify-between items-end">
                    <div className="space-y-4 max-w-xl">
                      <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-30 text-black dark:text-white">09. Design Process</span>
                      <h2 className="text-4xl font-heading font-medium">Information Architecture</h2>
                      <p className="opacity-60 leading-relaxed text-black dark:text-white">Simplified navigation with clear primary actions: Home, Medications, Appointments, and Reports.</p>
                    </div>
                 </div>
                 
                 <div className="aspect-[21/9] w-full rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/80 border border-current/10 flex items-center justify-center relative overflow-hidden">
                    {/* Abstract IA Visual */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                       <div className="grid grid-cols-4 h-full border-r border-current/10">
                          {Array.from({length: 4}).map((_, i) => <div key={i} className="border-l border-current/10" />)}
                       </div>
                    </div>
                    <span className="relative z-10 text-[10px] uppercase tracking-widest font-bold opacity-30">[ PLACE IA / FLOW DIAGRAM HERE ]</span>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-20 border-t border-current/10">
                    <div className="space-y-8">
                       <h3 className="text-2xl font-heading font-medium">Wireframes</h3>
                       <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center border border-current/5">
                          <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">[ PLACE LOW-FI WIREFRAMES ]</span>
                       </div>
                    </div>
                    <div className="space-y-8">
                       <h3 className="text-2xl font-heading font-medium">Visual Design</h3>
                       <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center border border-current/5">
                          <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">[ PLACE UI SCREENS ]</span>
                       </div>
                    </div>
                 </div>
              </section>

              {/* Final Solution */}
              <section className="space-y-20">
                <div className="space-y-4 max-w-xl">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">10. Final Solution</span>
                  <h2 className="text-4xl font-heading font-medium">Empowering Independence</h2>
                  <p className="opacity-60 leading-relaxed">A streamlined experience that helps users stay consistent, manage records, and feel confident in their health journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-[9/16] rounded-3xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-current/5 flex items-center justify-center">
                       <span className="text-[10px] uppercase tracking-widest font-bold opacity-20">[ FINAL MOCKUP {i} ]</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Impact & Reflection */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-20 py-24 border-t border-current/10">
                 <div className="space-y-8">
                    <h4 className="text-xs uppercase tracking-[0.3em] font-bold opacity-30 underline underline-offset-8">Impact</h4>
                    <div className="space-y-6">
                       {[
                         "Reduces cognitive overload for complex health tracking",
                         "Improves medication adherence through trust-based triggers",
                         "Supports independent living for elderly demographics"
                       ].map((impact, i) => (
                         <p key={i} className="text-lg font-heading leading-relaxed opacity-80">{impact}</p>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-8">
                    <h4 className="text-xs uppercase tracking-[0.3em] font-bold opacity-30 underline underline-offset-8">Reflection</h4>
                    <div className="space-y-6 text-sm opacity-60 leading-relaxed">
                       <p>Simplifying is significantly harder than adding features. Designing for elderly users requires a deep level of empathy combined with rigorous accessibility standards.</p>
                       <p>I learned the importance of "trust" as a core design principle in healthcare. If the UI feels unreliable, the user feels unsafe.</p>
                    </div>
                 </div>
              </section>

              {/* Prototype Link */}
              <section className="text-center space-y-12 py-20">
                 <a 
                   href="#" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex flex-col items-center gap-6 group"
                 >
                    <span className="text-xs uppercase tracking-[0.4em] font-bold opacity-30">Interact</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-medium group-hover:italic transition-all flex items-center gap-6">
                       Open Prototype <ArrowRight size={48} className="group-hover:translate-x-2 transition-transform h-8 w-8 md:h-12 md:w-12" />
                    </h2>
                 </a>
              </section>
            </div>
            
            <ContactSection />
          </motion.main>
        )}

        {view === 'zara' && (
          <motion.main 
            key="zara"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto px-6 pt-40 pb-20"
          >
            <button 
              onClick={() => setView('work')}
              className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-12"
            >
              <ArrowLeft size={14} /> Back to Library
            </button>

            {/* Hero Section */}
            <section className="mb-24">
              <span className="text-sm uppercase tracking-[0.3em] font-bold opacity-30 block mb-4">Project 03</span>
              <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tighter mb-8 leading-tight uppercase">
                Zara Redesign
              </h1>
              <p className="text-xl md:text-2xl opacity-70 font-light leading-relaxed mb-16 max-w-3xl">
                High fashion, higher usability. <br />
                <span className="italic font-normal opacity-60">"Resolving major friction points to create a more intuitive, user-centric shopping experience."</span>
              </p>

              <div className="aspect-[16/9] w-full rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 overflow-hidden mb-16 border border-current/5 shadow-2xl relative">
                <img src="https://picsum.photos/seed/zara-hero/1200/800" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white opacity-40">[ PLACE HERO MOCKUP ]</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-current/10">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-60 mb-3">Role</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-3">UX Research / UI Design</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-60 mb-3">Focus</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-3">Heuristic Evaluation</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-60 mb-3">Timeline</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-3">Case Study (Concept)</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-60 mb-3">Tools</h4>
                  <p className="text-sm border-l-2 border-current/30 pl-3">Figma</p>
                </div>
              </div>
            </section>

            <div className="space-y-48">
              {/* Problem Identification */}
              <section className="space-y-16">
                <div className="space-y-4 max-w-xl">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-30 text-rose-500">01. Problem Areas</span>
                  <h2 className="text-4xl font-heading font-medium italic">Sacrificing usability for style.</h2>
                  <p className="opacity-60 leading-relaxed italic">Through a heuristic evaluation of the current Zara website, I identified four primary "Problem Areas" that created high cognitive load and interaction friction.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  {[
                    { label: "Navigation Instability", content: "The header disappears on scroll, making persistent search or shopping bag access secondary and difficult." },
                    { label: "Visual Clutter", content: "Overlapping elements and extremely tight spacing make the interface feel 'messy' and cramped." },
                    { label: "Interaction Friction", content: "Product sizes hidden behind extra clicks, preventing users from seeing availability at a glance." },
                    { label: "Lack of Feedback", content: "'Added to Cart' notification lacks prominence, leaving users uncertain if their action was successful." }
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="text-rose-500">↗</span> {item.label}
                      </h4>
                      <p className="text-sm opacity-50 font-light leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Strategic Solutions */}
              <section className="space-y-32">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                   <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">02. Strategic Solutions</span>
                   <h2 className="text-5xl font-heading font-medium tracking-tight">Focusing on Flow.</h2>
                   <div className="w-12 h-[1px] bg-current opacity-20 mx-auto" />
                </div>

                {/* Feature 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-3xl font-heading font-medium">The Persistent (Fixed) Header</h3>
                      <p className="opacity-60 leading-relaxed font-light">Implementing a fixed position ensures the search bar, logo, and shopping bag are always accessible, resolving the overlap issues found in original designs.</p>
                      <div className="pt-4 flex flex-wrap gap-2">
                         <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest rounded-full opacity-60">Visibility of System Status</span>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] border border-current/5 flex items-center justify-center relative overflow-hidden">
                    <img src="https://picsum.photos/seed/zara-nav/800/600" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                       <span className="text-[10px] uppercase tracking-widest font-bold text-white">[ FIXED HEADER MOCKUP ]</span>
                    </div>
                  </div>
                </div>

                {/* Feature 2 & 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <h3 className="text-2xl font-heading font-medium italic">Spatial Refinement</h3>
                        <p className="text-sm opacity-50 leading-relaxed">Introducing proper negative space throughout navigation. By clarifying hierarchy, the cluttered look was replaced with a premium, organized aesthetic that aligns with Zara’s brand while remaining functional.</p>
                     </div>
                     <div className="aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] border border-current/5 flex items-center justify-center relative overflow-hidden">
                        <img src="https://picsum.photos/seed/zara-space/600/600" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                           <span className="text-[10px] uppercase tracking-widest font-bold text-white opacity-40">[ LAYOUT GRID ]</span>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-8 pt-0 md:pt-24">
                     <div className="space-y-4">
                        <h3 className="text-2xl font-heading font-medium italic">Size Accessibility</h3>
                        <p className="text-sm opacity-50 leading-relaxed">Sizes moved from hidden dropdowns to upfront UI. Users can now see availability immediately, reducing interaction cost and providing a much "cleaner and more intuitive look."</p>
                     </div>
                     <div className="aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] border border-current/5 flex items-center justify-center relative overflow-hidden">
                        <img src="https://picsum.photos/seed/zara-size/600/600" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                           <span className="text-[10px] uppercase tracking-widest font-bold text-white opacity-40">[ SIZE PICKER UI ]</span>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="space-y-12">
                   <div className="space-y-4 text-center max-w-xl mx-auto">
                      <h3 className="text-3xl font-heading font-medium">Enhanced Feedback Loops</h3>
                      <p className="opacity-60 leading-relaxed font-light">A high-clarity cart preview triggers upon addition, providing immediate confirmation and a quick path to checkout without leaving the page.</p>
                   </div>
                   <div className="aspect-[21/9] bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] border border-current/5 flex items-center justify-center relative overflow-hidden">
                      <img src="https://picsum.photos/seed/zara-cart/1200/500" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white opacity-40">[ CART CONFIRMATION MODAL ]</span>
                      </div>
                   </div>
                </div>
              </section>

              {/* Visual Comparison Table */}
              <section className="space-y-12">
                 <h2 className="text-2xl font-heading font-normal uppercase tracking-widest text-center opacity-40">03. Visual Comparison</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="border-b border-current/10">
                             <th className="py-6 text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold">Area</th>
                             <th className="py-6 text-[10px] uppercase tracking-[0.2em] opacity-40 text-rose-500 font-bold">Before (Pain Point)</th>
                             <th className="py-6 text-[10px] uppercase tracking-[0.2em] opacity-40 text-emerald-500 font-bold">After (Solution)</th>
                          </tr>
                       </thead>
                       <tbody className="text-sm">
                          {[
                            { area: "Navigation", before: "Overlapping, disappears on scroll", after: "Fixed position, persistent access" },
                            { area: "Product Detail", before: "Sizes hidden in Add button", after: "Sizes displayed upfront" },
                            { area: "Cart Interaction", before: "Weak visual feedback", after: "Clear notification & product summary" },
                            { area: "Aesthetics", before: "Cluttered and cramped", after: "Minimalist, spacious, breathable" }
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-current/5">
                               <td className="py-6 font-bold uppercase tracking-widest text-xs">{row.area}</td>
                               <td className="py-6 opacity-40 italic">{row.before}</td>
                               <td className="py-6 opacity-80">{row.after}</td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </section>

              {/* Final Takeaway */}
              <section className="py-24 border-y border-current/10 space-y-12">
                 <div className="max-w-2xl mx-auto text-center space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">04. Conclusion</span>
                    <h2 className="text-4xl font-heading font-medium italic">UX does not have to be sacrificed for Brand Identity.</h2>
                    <p className="opacity-60 leading-relaxed text-balance">This project demonstrates that by applying standard usability principles—like fixed navigation and clear feedback—we can maintain Zara's iconic look while significantly improving the user's ability to browse and buy.</p>
                 </div>
                 <div className="flex flex-col items-center gap-8">
                    <div className="flex gap-4">
                       <span className="px-4 py-2 border border-current/10 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-60">Figma</span>
                       <span className="px-4 py-2 border border-current/10 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-60">UI Design</span>
                       <span className="px-4 py-2 border border-current/10 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-60">Heuristic Evaluation</span>
                    </div>
                    <a 
                      href="#" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-6 group"
                    >
                       <h2 className="text-4xl font-heading font-medium group-hover:italic transition-all flex items-center gap-6">
                          Interface Prototype <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                       </h2>
                    </a>
                 </div>
              </section>
            </div>
            
            <ContactSection />
          </motion.main>
        )}

        {view === 'ar-reading' && (
          <motion.main 
            key="ar-reading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto px-6 pt-16 pb-20"
          >
            <button 
              onClick={() => setView('work')}
              className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-bold opacity-60 hover:opacity-100 transition-opacity mb-12"
            >
              <ArrowLeft size={14} /> Back to Library
            </button>

            {/* Hero Section */}
            <section className="mb-24">
              <span className="text-sm uppercase tracking-[0.3em] font-bold opacity-60 block mb-4">Project 04</span>
              <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tighter mb-8 leading-tight uppercase">
                AR Reading Experience
              </h1>
              <p className="text-xl md:text-2xl opacity-70 font-light leading-relaxed mb-6 max-w-3xl">
                Turning everyday commutes into <br />
                <span className="italic font-normal opacity-60">meaningful reading experiences.</span>
              </p>
              
              <div className="mb-16 mt-[1.5cm]">
                 <div className="relative aspect-video w-full rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border border-current/5 flex items-center justify-center overflow-hidden group cursor-pointer shadow-2xl">
                    <img src="https://picsum.photos/seed/ar-life/1200/675" className="w-full h-full object-cover opacity-80 transition-opacity group-hover:opacity-90" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                        <div className="w-16 h-16 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center backdrop-blur-md bg-white/20 dark:bg-black/20 group-hover:scale-110 transition-transform">
                           <Play size={24} className="fill-current ml-1" />
                        </div>
                    </div>
                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                       <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                       <span className="text-sm font-bold uppercase tracking-widest opacity-60">Launch Concept Film</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-10 border-t border-current/10 mt-16">
                <div>
                  <h4 className="text-sm uppercase tracking-widest font-bold opacity-60 mb-3">Role</h4>
                  <p className="text-base border-l-2 border-current/30 pl-4 opacity-90">Concept / Motion Storytelling</p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-widest font-bold opacity-60 mb-3">Tools</h4>
                  <p className="text-base border-l-2 border-current/30 pl-4 opacity-90">Figma / After Effects</p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-widest font-bold opacity-60 mb-3">Skills</h4>
                  <p className="text-base border-l-2 border-current/30 pl-4 opacity-90">AR Design / Visual Storytelling / Interaction Design</p>
                </div>
              </div>

              <div className="py-12 border-t border-current/10">
                <div className="space-y-6 max-w-2xl">
                  <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block mb-8">Overview</span>
                  <p className="opacity-80 leading-relaxed text-base italic">
                    "This project is a concept-driven exploration of how idle commute time can be transformed into an engaging and purposeful experience through reading."
                  </p>
                  <p className="opacity-70 leading-relaxed text-base">
                    Rather than focusing on full technical implementation, this project emphasizes idea generation, interaction thinking, and visual storytelling—using motion to bring a speculative AR experience to life.
                  </p>
                </div>
              </div>
            </section>

            <div className="space-y-48">
              {/* The Idea */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block mb-6">The Idea</span>
                    <h2 className="text-4xl font-heading font-medium tracking-tight">Idle time as opportunity.</h2>
                    <p className="opacity-70 leading-relaxed text-base font-light">Commuting is often passive—time spent scrolling, waiting, or disengaged. This concept reimagines that time as an opportunity to read, learn, and engage.</p>
                    <ul className="space-y-3 pt-4">
                       {["Browse and read books", "Track progress", "Earn points through completion"].map((item, i) => (
                         <li key={i} className="text-sm opacity-70 flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-current rounded-full" /> {item}
                         </li>
                       ))}
                    </ul>
                  </div>
                </div>
                <div className="aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] border border-current/5 overflow-hidden relative">
                  <img src="https://picsum.photos/seed/ar-concept/800/800" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                     <span className="text-xs uppercase tracking-widest font-bold text-white opacity-60">[ CONCEPT: SUBWAY LIBRARY UI ]</span>
                  </div>
                </div>
              </section>

              {/* Process */}
              <section className="space-y-32">
                 <div className="text-center space-y-6">
                    <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white mx-auto block mb-6">Process</span>
                    <h2 className="text-5xl font-heading font-medium tracking-tight">Idea to Experience.</h2>
                 </div>

                 {/* Early Exploration */}
                 <div className="space-y-16">
                    <div className="max-w-2xl space-y-4">
                       <h3 className="text-2xl font-heading font-medium italic">Early Exploration</h3>
                       <p className="opacity-70 text-base leading-relaxed">The project began with quick sketches exploring reading layouts in constrained environments and navigation patterns for minimal interaction. These low-fidelity explorations helped prioritize flow over visual detail.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="aspect-[4/5] bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-current/5 flex items-center justify-center overflow-hidden">
                          <img src="https://picsum.photos/seed/ar-sketch1/600/800" className="w-full h-full object-cover opacity-80" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                             <span className="text-sm uppercase tracking-widest font-bold">[ SKETCHES ]</span>
                          </div>
                       </div>
                       <div className="aspect-[4/5] bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-current/5 flex items-center justify-center overflow-hidden">
                          <img src="https://picsum.photos/seed/ar-sketch2/600/800" className="w-full h-full object-cover opacity-80" />
                       </div>
                    </div>
                 </div>

                 {/* Storyboarding */}
                 <div className="space-y-12">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-heading font-medium italic">Storyboarding the Experience</h3>
                      <p className="opacity-70 text-base max-w-xl leading-relaxed">Mapping the full journey: entry into the system, interaction within the reading space, and exit/reward feedback.</p>
                    </div>
                    <div className="aspect-[21/9] bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] border border-current/5 flex items-center justify-center overflow-hidden grayscale">
                       <img src="https://picsum.photos/seed/ar-storyboard/1200/500" className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                          <span className="text-sm uppercase tracking-widest font-bold text-white opacity-60">[ FULL STORYBOARD ]</span>
                       </div>
                    </div>
                 </div>

              </section>

              {/* Interaction Design Grid */}
              <section className="space-y-16">
                 <div className="text-center space-y-6">
                    <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white mx-auto block mb-6">Interaction Design</span>
                    <h2 className="text-3xl font-heading font-medium uppercase">Natural Gestures</h2>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { label: "Swipe", desc: "Navigate between books", seed: "swipe" },
                      { label: "Scroll", desc: "Read content seamlessly", seed: "scroll" },
                      { label: "Zoom", desc: "Adjust reading view", seed: "zoom" }
                    ].map((item, i) => (
                      <div key={i} className="space-y-6">
                        <div className="aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] border border-current/5 overflow-hidden group relative">
                           <img src={`https://picsum.photos/seed/ar-ui-${item.seed}/600/800`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                           <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-sm font-bold uppercase tracking-widest text-white">[ {item.label} MOTION ]</span>
                           </div>
                        </div>
                        <div className="text-center">
                           <h4 className="text-base font-bold uppercase tracking-widest mb-1">{item.label}</h4>
                           <p className="text-sm opacity-60">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* Demonstration & Reflection */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-20">
                 <div className="space-y-12">
                     <div className="space-y-6">
                        <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block mb-6">Reflection</span>
                        <h2 className="text-3xl font-heading font-medium italic">Clarity over Complexity.</h2>
                        <p className="opacity-70 text-base leading-relaxed">Its strength lies in the clarity of the idea and the thought behind the experience. It demonstrates translating ideas into clear, compelling experiences and designing for real-world behavior.</p>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden border border-current/5">
                           <img src="https://picsum.photos/seed/ar-reflect-1/400/400" className="w-full h-full object-cover opacity-60" />
                        </div>
                        <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden border border-current/5">
                           <img src="https://picsum.photos/seed/ar-reflect-2/400/400" className="w-full h-full object-cover opacity-60" />
                        </div>
                     </div>
                 </div>
                 <div className="space-y-12 flex flex-col justify-end">
                    <div className="bg-zinc-50 dark:bg-zinc-950 p-10 rounded-[2.5rem] border border-current/5 space-y-8">
                       <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block mb-6">Key Takeaway</span>
                       <p className="text-2xl font-heading font-medium leading-tight italic">"Great experiences don’t always start with code. Sometimes, they begin with a strong idea—and the ability to make others see it."</p>
                       <div className="w-8 h-[2px] bg-emerald-500" />
                    </div>
                 </div>
              </section>
            </div>

            <ContactSection />
          </motion.main>
        )}
        {view === 'ai-workflow' && (
          <motion.main 
            key="ai-workflow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto px-6 pt-16 pb-20"
          >
            <button 
              onClick={() => setView('work')}
              className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-bold opacity-60 hover:opacity-100 transition-opacity mb-12"
            >
              <ArrowLeft size={14} /> Back to Library
            </button>

            {/* Hero Section */}
            <section className="mb-24">
              <span className="text-sm uppercase tracking-[0.3em] font-bold opacity-60 block mb-4">Project 05</span>
              <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tighter mb-8 leading-tight uppercase">
                AI Tools & Workflow Exploration
              </h1>
              <p className="text-xl md:text-2xl opacity-70 font-light leading-relaxed mb-16 max-w-3xl">
                Designing the Future of Productivity with <br />
                <span className="italic font-normal opacity-60">AI-Driven Workflows.</span>
              </p>
              
              <div className="aspect-video w-full rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border border-current/5 overflow-hidden mb-16 shadow-2xl relative group">
                <img src="https://picsum.photos/seed/ai-hero/1200/675" className="w-full h-full object-cover opacity-80" />
              </div>

              <div className="py-12 border-t border-current/10">
                <div className="space-y-6 max-w-2xl">
                  <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block mb-6">Overview</span>
                  <p className="opacity-80 leading-relaxed text-lg">
                    This project explores how emerging AI tools can reshape the way we <strong>design, build, and iterate digital products</strong>.
                  </p>
                  <p className="opacity-70 leading-relaxed text-base">
                    Rather than focusing on a single output, the goal was to understand how different AI platforms support <strong>end-to-end workflows</strong>—from ideation to execution—and how they can be integrated into a designer’s process.
                  </p>
                </div>
              </div>
            </section>

            <div className="space-y-48">
              {/* Focus Section */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                 <div className="space-y-12">
                   <div className="space-y-6">
                     <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block mb-6">Focus</span>
                     <div className="grid grid-cols-1 gap-6">
                       {[
                         { title: "Prompt-driven creation", desc: "Translating words into visual form" },
                         { title: "Rapid prototyping", desc: "Reducing time from idea to testing" },
                         { title: "AI-assisted design systems", desc: "Scaling consistency automatically" },
                         { title: "Workflow automation", desc: "Removing operational friction" }
                       ].map((item, i) => (
                         <div key={i} className="flex gap-4 items-start border-l border-current/10 pl-6 group hover:border-current transition-colors">
                           <div>
                             <h4 className="font-bold text-sm uppercase tracking-wide">{item.title}</h4>
                             <p className="text-xs opacity-50">{item.desc}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                     <p className="pt-6 opacity-70 leading-relaxed italic">
                       This exploration highlights how AI can move beyond assistance and become a <strong>collaborative design partner</strong>.
                     </p>
                   </div>
                 </div>
                 <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] border border-current/5 overflow-hidden relative">
                    <img src="https://picsum.photos/seed/ai-diagram/800/1000" className="w-full h-full object-cover grayscale opacity-60" />
                 </div>
              </section>

              {/* Google AI Studio */}
              <section className="space-y-16">
                 <div className="space-y-6">
                    <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block">Google AI Studio</span>
                    <h2 className="text-4xl font-heading font-medium tracking-tight">From Prompt to Product.</h2>
                    <p className="opacity-70 text-lg leading-relaxed max-w-2xl">
                      Google AI Studio represents a shift toward <strong>“vibe coding”</strong>—where ideas are translated directly into working applications through natural language.
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="aspect-video bg-zinc-50 dark:bg-zinc-950 rounded-[2rem] border border-current/5 overflow-hidden flex items-center justify-center">
                     <img src="https://picsum.photos/seed/ai-studio-ui/800/450" className="w-full h-full object-cover opacity-90" />
                   </div>
                   <div className="space-y-8 flex flex-col justify-center">
                      {[
                        { title: "Prompt-Driven Editing", desc: "Build and refine entire interfaces through conversation" },
                        { title: "Seamless Code Refinement", desc: "Edit generated code for precise control" },
                        { title: "One-Click Export", desc: "Download clean code or push directly to GitHub" }
                      ].map((item, i) => (
                        <div key={i} className="space-y-2">
                           <h4 className="text-lg font-medium italic">{item.title}</h4>
                           <p className="text-sm opacity-50 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                   </div>
                 </div>

                 {/* Workflow diagram */}
                 <div className="pt-20">
                    <div className="text-center space-y-6 mb-16">
                       <span className="text-sm uppercase tracking-[0.3em] font-bold opacity-30">AI Studio Workflow</span>
                       <h3 className="text-3xl font-heading font-normal">Compressing the Cycle.</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                       {[
                         { step: "01 — Prompt", desc: "“Build a safety dashboard for a tech company…”" },
                         { step: "02 — Preview", desc: "A live application is generated instantly" },
                         { step: "03 — Iterate", desc: "“Add a dark mode toggle and export as React”" },
                         { step: "04 — Export", desc: "Download production-ready code" }
                       ].map((step, i) => (
                         <div key={i} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-current/5 space-y-4 relative group hover:bg-current/[0.02] transition-colors">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#0070CE]">{step.step}</span>
                            <p className="text-sm opacity-60 leading-relaxed font-light">{step.desc}</p>
                            {i < 3 && <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-current opacity-20">→</div>}
                         </div>
                       ))}
                    </div>
                    <p className="text-center mt-12 text-sm opacity-40 italic">
                      👉 This workflow demonstrates how AI compresses the traditional design–development cycle into a continuous, conversational process.
                    </p>
                 </div>
              </section>

              {/* Research Explorations */}
              <section className="space-y-20">
                 <div className="text-center space-y-6">
                    <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block mx-auto">Research Explorations</span>
                    <h2 className="text-5xl font-heading font-medium tracking-tight">The AI Ecosystem.</h2>
                    <p className="opacity-60 max-w-2xl mx-auto">Exploring a range of AI tools, each contributing to different stages of the design and development workflow.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
                    {/* Claude Projects */}
                    <div className="space-y-6">
                       <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] border border-current/5 overflow-hidden flex items-center justify-center">
                          <img src="https://picsum.photos/seed/claude/800/500" className="w-full h-full object-cover" />
                       </div>
                       <div className="space-y-3">
                          <h3 className="text-2xl font-heading font-medium flex items-center gap-2">Claude Projects</h3>
                          <ul className="space-y-2 text-sm opacity-60">
                             <li>• Maintains consistent tone and structure across work</li>
                             <li>• Supports side-by-side editing for documents and code</li>
                             <li>• Enables deeper refinement through iterative collaboration</li>
                          </ul>
                       </div>
                    </div>

                    {/* Glean AI */}
                    <div className="space-y-6">
                       <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] border border-current/5 overflow-hidden flex items-center justify-center">
                          <img src="https://picsum.photos/seed/glean/800/500" className="w-full h-full object-cover" />
                       </div>
                       <div className="space-y-3">
                          <h3 className="text-2xl font-heading font-medium flex items-center gap-2">Glean AI</h3>
                          <ul className="space-y-2 text-sm opacity-60">
                             <li>• Connects across internal tools and data</li>
                             <li>• Builds a context-aware knowledge system</li>
                             <li>• Enhances organizational search and automation</li>
                          </ul>
                       </div>
                    </div>

                    {/* Figma Make */}
                    <div className="space-y-6">
                       <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] border border-current/5 overflow-hidden flex items-center justify-center">
                          <img src="https://picsum.photos/seed/figma-make/800/500" className="w-full h-full object-cover" />
                       </div>
                       <div className="space-y-3">
                          <h3 className="text-2xl font-heading font-medium flex items-center gap-2">Figma Make</h3>
                          <ul className="space-y-2 text-sm opacity-60">
                             <li>• Transforms prompts into structured interface designs</li>
                             <li>• Bridges the gap between concept and visual system</li>
                             <li>• Accelerates early-stage ideation</li>
                          </ul>
                       </div>
                    </div>

                    {/* Opal AI */}
                    <div className="space-y-6">
                       <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] border border-current/5 overflow-hidden flex items-center justify-center">
                          <img src="https://picsum.photos/seed/opal/800/500" className="w-full h-full object-cover" />
                       </div>
                       <div className="space-y-3">
                          <h3 className="text-2xl font-heading font-medium flex items-center gap-2">Opal AI</h3>
                          <ul className="space-y-2 text-sm opacity-60">
                             <li>• Enables no-code AI application building</li>
                             <li>• Converts workflows into functional tools</li>
                             <li>• Ideal for automation and lightweight product creation</li>
                          </ul>
                       </div>
                    </div>
                  </div>
              </section>

              {/* The Connected Ecosystem */}
              <section className="pt-32 border-t border-current/10 space-y-24">
                 <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block mx-auto">The Connected Ecosystem</span>
                    <h2 className="text-5xl font-heading font-medium tracking-tight">The Gemini Power Trio.</h2>
                    <p className="opacity-70 text-lg leading-relaxed">
                       When <strong>Gems, NotebookLM, and Canvas</strong> are connected, the design process shifts from isolated tasks to a continuous, self-reinforcing loop. This ecosystem doesn't just assist; it scales thinking.
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Gemini Gems */}
                    <div className="space-y-6 group">
                       <div className="aspect-square bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-current/5 overflow-hidden relative">
                          <img src="https://picsum.photos/seed/gems-eco/600/600" className="w-full h-full object-cover transition-all duration-700" />
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xl font-heading font-medium">Gemini Gems</h4>
                          <p className="text-sm opacity-50 leading-relaxed font-light">The <strong>Identity</strong>. Persistent experts that maintain brand voice and strategic intent across every prompt.</p>
                       </div>
                    </div>

                    {/* NotebookLM */}
                    <div className="space-y-6 group">
                       <div className="aspect-square bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-current/5 overflow-hidden relative">
                          <img src="https://picsum.photos/seed/notebook-eco/600/600" className="w-full h-full object-cover transition-all duration-700" />
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xl font-heading font-medium">NotebookLM</h4>
                          <p className="text-sm opacity-50 leading-relaxed font-light">The <strong>Context</strong>. Grounding the AI in trusted, proprietary data to eliminate hallucinations and ensure accuracy.</p>
                       </div>
                    </div>

                    {/* Gemini Canvas */}
                    <div className="space-y-6 group">
                       <div className="aspect-square bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-current/5 overflow-hidden relative">
                          <img src="https://picsum.photos/seed/canvas-eco/600/600" className="w-full h-full object-cover transition-all duration-700" />
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xl font-heading font-medium">Gemini Canvas</h4>
                          <p className="text-sm opacity-50 leading-relaxed font-light">The <strong>Execution</strong>. A live workspace where concepts are built, previewed, and refined in real-time.</p>
                       </div>
                    </div>
                 </div>

                 <div className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 p-12 md:p-20 rounded-[3rem] space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                       <div className="space-y-6">
                          <h3 className="text-3xl font-heading font-medium">How it Connects</h3>
                          <p className="opacity-60 leading-relaxed">
                             Research from <strong>NotebookLM</strong> informs the instructions within a <strong>Gem</strong>, which then drives the building process in <strong>Canvas</strong>. This seamless flow transforms the experience from "choosing tools" to "guiding intelligence."
                          </p>
                       </div>
                       <div className="space-y-6">
                          <h3 className="text-3xl font-heading font-medium">Productivity Redefined</h3>
                          <p className="opacity-60 leading-relaxed">
                             This integration removes context-switching. A research-heavy workflow that used to take days—briefing, wireframing, and initial build—is now compressed into a single, cohesive session of high-intent iteration.
                          </p>
                       </div>
                    </div>
                    <div className="pt-12 border-t border-white/10 dark:border-zinc-900/10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                       <div className="space-y-1">
                          <span className="text-5xl font-heading font-medium italic">10x</span>
                          <p className="text-xs uppercase tracking-widest opacity-40">Faster Iteration Cycles</p>
                       </div>
                       <div className="space-y-1">
                          <span className="text-5xl font-heading font-medium italic">Infinite</span>
                          <p className="text-xs uppercase tracking-widest opacity-40">Contextual Memory</p>
                       </div>
                       <div className="space-y-1">
                          <span className="text-5xl font-heading font-medium italic">Zero</span>
                          <p className="text-xs uppercase tracking-widest opacity-40">Creative Friction</p>
                       </div>
                    </div>
                 </div>
              </section>





              {/* Insights & Outcomes */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-20">
                 <div className="space-y-12">
                    <div className="space-y-6">
                       <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block mb-6">Key Insights</span>
                       <div className="space-y-6">
                          {[
                            { title: "Conversation over Tooling", desc: "AI shifts design from tool-based to conversation-based workflows." },
                            { title: "Blurred Boundaries", desc: "The boundary between designer and developer is increasingly blurred." },
                            { title: "Thought vs. Speed", desc: "Speed increases—but clarity of thinking becomes more important than ever." },
                            { title: "Designer as Curator", desc: "The role evolves into curating, guiding, and refining AI output." }
                          ].map((insight, i) => (
                            <div key={i} className="space-y-1">
                               <h4 className="text-lg font-medium">{insight.title}</h4>
                               <p className="text-sm opacity-50 leading-relaxed">{insight.desc}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
                 <div className="space-y-12">
                     <div className="bg-zinc-50 dark:bg-zinc-950 p-10 rounded-[2.5rem] border border-current/5 space-y-8 h-full flex flex-col justify-center">
                        <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block mb-6">What This Demonstrates</span>
                        <div className="space-y-4">
                           {[
                             "Understanding of emerging AI ecosystems",
                             "Ability to analyze and compare tools critically",
                             "Exploration of future-facing workflows in design and development",
                             "Strategic thinking beyond traditional UI/UX deliverables"
                           ].map((item, i) => (
                             <div key={i} className="flex gap-4 items-center">
                                <ArrowRight size={14} className="opacity-40" />
                                <p className="text-sm font-medium tracking-tight opacity-70">{item}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                 </div>
              </section>

              {/* Reflection */}
              <section className="text-center space-y-12 py-24 border-t border-current/10">
                 <div className="space-y-6 max-w-3xl mx-auto">
                    <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block">Reflection</span>
                    <h2 className="text-4xl font-heading font-medium italic">Shaping Intent.</h2>
                    <p className="text-lg opacity-60 leading-relaxed">
                       This project is not about mastering one tool, but about understanding a <strong>shift in how digital products are created</strong>. 
                       AI doesn’t replace the designer—it changes the role from crafting interfaces to <strong>shaping systems, guiding outputs, and defining intent</strong>.
                    </p>
                 </div>
                 
                 <div className="pt-20 border-t border-current/10 max-w-2xl mx-auto">
                    <div className="space-y-4">
                       <span className="text-base uppercase tracking-[0.4em] font-bold text-zinc-900 dark:text-white block mb-6">Key Takeaway</span>
                       <p className="text-3xl font-heading font-medium leading-tight">
                        "The future of design isn’t just about what we build—it’s about <strong>how we think, prompt, and collaborate with AI to build it</strong>."
                       </p>
                    </div>
                 </div>
              </section>
            </div>

            <ContactSection />
          </motion.main>
        )}
        {view === 'about' && (
          <motion.main 
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto px-6 pt-40 pb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start mb-40">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <button 
                  onClick={() => setView('home')}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-8"
                >
                  <ArrowLeft size={14} /> Back to Home
                </button>
                <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tighter mb-12 leading-[1.1]">
                  I grow small <br /> 
                  <span className="italic opacity-50">ideas</span> into <br /> 
                  meaningful designs.
                </h1>
                <div className="space-y-6 text-lg opacity-70 leading-relaxed max-w-lg">
                  <p>
                    Hi, I’m Arathy Rajesh — a UI/UX Designer, Visual Storyteller, and Front-End Developer from Kerala.
                  </p>
                  <p>
                    I began my journey in UX design, learning to approach problems through research, empathy, and thoughtful design. Over time, my curiosity led me into front-end development, where I started bringing my ideas to life through code.
                  </p>
                  <p>
                    I’m deeply drawn to creativity, art, and visual storytelling. I see design as more than just solving problems — it’s about creating experiences that feel intuitive, meaningful, and human. I enjoy exploring how visuals, motion, and interaction can come together to tell a story.
                  </p>
                  <p>
                    Currently, I’m focused on bridging design and development — crafting experiences that are not only functional, but also expressive and engaging.
                  </p>
                  <p>
                    I’m always learning, exploring, and creating with purpose.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden contrast-110">
                  <img 
                    src={profileImg} 
                    alt="Portrait" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-6 flex items-center justify-center border border-current/10 shadow-xl">
                    <p className="text-center text-xs uppercase tracking-widest font-bold">Based in <br /> Bangalore, IN</p>
                </div>
              </motion.div>
            </div>

            <section className="mb-40">
              <h2 className="text-2xl font-heading font-semibold uppercase tracking-tight mb-12">Experience</h2>
              <div className="space-y-12">
                {[
                  { company: "Lumina Labs", role: "Senior Developer", period: "2022 — Present", desc: "Leading the frontend architecture for next-gen creative tools." },
                  { company: "Orbit Systems", role: "Product Engineer", period: "2020 — 2022", desc: "Designed and implemented robust design systems for enterprise scale." },
                  { company: "Freelance", role: "UI/UX Designer", period: "2018 — 2020", desc: "Collaborated with startups to define their visual identity and initial MVP." }
                ].map((job, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-current/10 pb-8 hover:bg-current/[0.02] transition-colors p-4 rounded-xl -mx-4">
                    <p className="text-xs uppercase tracking-widest opacity-40 font-bold">{job.period}</p>
                    <div>
                      <h3 className="text-xl font-medium">{job.role}</h3>
                      <p className="text-sm opacity-60 italic">{job.company}</p>
                    </div>
                    <p className="text-sm opacity-70 leading-relaxed md:text-right">{job.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <ContactSection />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}

function WhyDandelion() {
  return (
    <section className="mb-40 py-24 md:py-40 border-y border-current/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center lg:items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">The Philosophy</span>
            <h2 className="text-5xl md:text-7xl font-heading font-medium tracking-tighter leading-tight">
              Why the <br />
              <span className="italic opacity-50 font-light">Dandelion?</span>
            </h2>
          </div>
          
          <div className="space-y-6 text-xl opacity-70 font-light leading-relaxed">
            <p>
              The dandelion represents resilience and the beauty of dispersal. Like ideas, its seeds fly 
              effortlessly across boundaries, waiting for the perfect moment to take root.
            </p>
            <p>
              In my work, I see every line of code as a seed. A small, intentional packet of 
              potential that can grow into a complex, resilient system. 
            </p>
          </div>
        </div>

        <div className="relative aspect-square flex items-center justify-center">
          <BloomingDandelion />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick?: () => void; key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 mb-6 relative">
        <img 
          src={project.image} 
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={16} className="text-white" />
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-heading font-medium mb-2">{project.title}</h3>
          <p className="text-sm opacity-60 mb-4 max-w-sm leading-relaxed">{project.description}</p>
          <div className="flex gap-2 flex-wrap">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs uppercase tracking-wider font-semibold py-1.5 px-4 border border-current opacity-40 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SkillsGrid() {
  return (
    <section className="mb-40">
      <h2 className="text-2xl font-heading font-semibold uppercase tracking-tight mb-12">Expertise</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        {[
          { category: "Design", skills: ["Figma", "Interaction Design", "Prototyping", "Design Systems"] },
          { category: "Frontend", skills: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS", "Motion"] },
          { category: "Backend", skills: ["Node.js", "Express", "REST APIs", "MySQL", "DBeaver"] },
          { category: "AI (Exploration)", skills: ["Prompt Engineering", "Gemini API", "Large Language Models", "Vector Databases"] }
        ].map((group, idx) => (
          <motion.div 
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-40">{group.category}</h3>
            <ul className="space-y-2">
              {group.skills.map(skill => (
                <li key={skill} className="text-lg font-light">{skill}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="relative border-t border-current/10 pt-20 pb-40">
      {/* Seed Landing Target */}
      <div className="absolute bottom-40 right-10 md:right-32 w-16 h-16 pointer-events-none opacity-20">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-full h-full rounded-full border border-dashed border-current flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-current rounded-full" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-medium mb-8">Let's create something meaningful.</h2>
          <a href="mailto:arxthy@gmail.com" className="text-xl md:text-2xl underline underline-offset-8 decoration-1 opacity-80 hover:opacity-100 transition-opacity">
            hello@arxthy.dev
          </a>
        </div>
        
        <div className="flex flex-col justify-between">
          <div className="flex gap-8 md:justify-end">
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity"><Github size={24} /></a>
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity"><Linkedin size={24} /></a>
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity"><Mail size={24} /></a>
          </div>
          
          <div className="mt-20 md:mt-0 md:text-right">
            <p className="text-sm opacity-40 font-light">
              © {new Date().getFullYear()} arathy. <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
