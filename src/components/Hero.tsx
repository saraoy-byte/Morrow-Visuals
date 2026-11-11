import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, MessageCircle, Star, Play, Pause } from 'lucide-react';
import { CursorState } from './CustomCursor';
import { SOCIAL_LINKS } from '../data/projects';

interface HeroProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export const Hero: React.FC<HeroProps> = ({ setCursorState }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Guarantee continuous video playback across all browsers & autoplay policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly enforce muted properties on DOM node (required by Safari & Chrome for autoplay)
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      if (video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Attempt instant play
    playVideo();

    // Listen for readiness events to trigger playback immediately when chunks arrive
    video.addEventListener('loadedmetadata', playVideo);
    video.addEventListener('canplay', playVideo);
    video.addEventListener('canplaythrough', playVideo);

    // If tab visibility changes, resume playback when tab is active
    const handleVisibility = () => {
      if (!document.hidden && video.paused) {
        playVideo();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Fallback: If autoplay was delayed by browser, first scroll/touch triggers it
    const handleFirstGesture = () => {
      playVideo();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };
    window.addEventListener('click', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true, passive: true });

    return () => {
      video.removeEventListener('loadedmetadata', playVideo);
      video.removeEventListener('canplay', playVideo);
      video.removeEventListener('canplaythrough', playVideo);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };
  }, []);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <section id="home" className="relative min-h-[94vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20">
      {/* Background Loop Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#060607]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/qbs6njjr/video/upload/so_1.0,w_1280,c_scale,q_90/v1793291378/Palma_bay_Architecture_Animation_Film.jpg"
          className="w-full h-full object-cover object-center opacity-85 transition-opacity duration-1000"
        >
          <source
            src="https://res.cloudinary.com/qbs6njjr/video/upload/q_auto,w_1920/v1793291378/Palma_bay_Architecture_Animation_Film.mp4"
            type="video/mp4"
          />
          <source
            src="https://res.cloudinary.com/qbs6njjr/video/upload/v1793291378/Palma_bay_Architecture_Animation_Film.mp4"
            type="video/mp4"
          />
        </video>

        {/* Soft Cinematic Vignette & Gradients for Seamless Header & Section Transitions */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-[#060607]/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060607]/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/10 to-[#060607]/70" />
        <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center mt-2 sm:mt-4">
        <div className="flex flex-col items-center max-w-4xl">
          {/* Sub-kicker highlighting exact user services */}
          <div className="inline-flex items-center text-[11px] sm:text-xs tracking-widest text-[#DDA838] uppercase mb-4 font-semibold drop-shadow-md bg-black/60 px-4 py-2 rounded-full border border-[#DDA838]/30 backdrop-blur-md">
            <span className="truncate">AI VIDEO CREATOR &middot; CINEMATIC TRAILERS &middot; VIDEO EDITOR &middot; PRODUCT ADS</span>
          </div>

          {/* Scaled-down, balanced typography */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.1] mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            AI Video Creator &amp; Filmmaker
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#EDECE8] max-w-2xl font-normal leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Crafting high-impact commercial product ads, adrenaline-inducing AI cinematic trailers, and narrative films with professional video editing, color grading, and sound design.
          </p>

          {/* Unified CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href={SOCIAL_LINKS.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center justify-center gap-2 text-xs tracking-wider px-7 py-3.5 w-full sm:w-auto shadow-xl cursor-pointer"
              onMouseEnter={() =>
                setCursorState({
                  text: 'UPWORK ↗',
                  variant: 'default',
                  visible: true,
                })
              }
              onMouseLeave={() =>
                setCursorState({ text: '', variant: 'default', visible: true })
              }
            >
              <span>HIRE ON UPWORK</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={SOCIAL_LINKS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs tracking-wider px-6 py-3.5 w-full sm:w-auto bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 font-medium rounded backdrop-blur-sm transition-all cursor-pointer"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WHATSAPP CHAT</span>
            </a>
          </div>

          {/* Upwork trust tag - Bold with stars */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm font-mono font-bold text-white tracking-wider drop-shadow-md">
            <Star className="w-4 h-4 text-[#DDA838] fill-[#DDA838] shrink-0" />
            <span className="uppercase">Available for Direct Commission</span>
            <Star className="w-4 h-4 text-[#DDA838] fill-[#DDA838] shrink-0 ml-1" />
            <span className="uppercase text-[#DDA838]">3&ndash;5 Day Turnaround</span>
          </div>
        </div>
      </div>

      {/* Discreet Background Video Playback Indicator & Toggle */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center">
        <button
          onClick={toggleVideoPlayback}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-[#DDA838]/60 text-[11px] font-mono text-zinc-300 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-lg group"
          title={isPlaying ? 'Pause background video' : 'Play background video'}
          onMouseEnter={() =>
            setCursorState({
              text: isPlaying ? 'PAUSE' : 'PLAY',
              variant: 'default',
              visible: true,
            })
          }
          onMouseLeave={() =>
            setCursorState({ text: '', variant: 'default', visible: true })
          }
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 text-[#DDA838]" />
          ) : (
            <Play className="w-3 h-3 fill-[#DDA838] text-[#DDA838]" />
          )}
          <span className="tracking-wider">
            {isPlaying ? 'BACKGROUND REEL' : 'REEL PAUSED'}
          </span>
        </button>
      </div>
    </section>
  );
};
