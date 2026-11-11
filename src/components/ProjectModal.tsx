import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight, ExternalLink, Sliders, Film, Volume2, VolumeX, Maximize2, Zap } from 'lucide-react';
import { Project } from '../types/portfolio';
import { SOCIAL_LINKS } from '../data/projects';
import { CursorState } from './CustomCursor';
import { videoPreloader } from '../utils/videoPreloader';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  allProjects: Project[];
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
  setCursorState,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeFrame, setActiveFrame] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & preloading adjacent projects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;
      const currentIndex = allProjects.findIndex((p) => p.id === project.id);
      if (e.key === 'ArrowRight' && currentIndex < allProjects.length - 1) {
        onSelectProject(allProjects[currentIndex + 1]);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectProject(allProjects[currentIndex - 1]);
      }
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'm') {
        toggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onSelectProject, allProjects]);

  // Preload next and previous project videos while viewing current modal
  useEffect(() => {
    if (!project) return;
    const currentIndex = allProjects.findIndex((p) => p.id === project.id);
    if (currentIndex > 0 && allProjects[currentIndex - 1].videoUrl) {
      videoPreloader.prioritize(allProjects[currentIndex - 1].videoUrl!);
    }
    if (currentIndex < allProjects.length - 1 && allProjects[currentIndex + 1].videoUrl) {
      videoPreloader.prioritize(allProjects[currentIndex + 1].videoUrl!);
    }
  }, [project, allProjects]);

  // Handle instant video playback when project opens or changes
  useEffect(() => {
    if (!project) return;
    setIsPlaying(true);
    setCurrentTime(0);

    const videoEl = videoRef.current;
    if (videoEl) {
      // Prioritize immediately
      if (project.videoUrl) {
        videoPreloader.prioritize(project.videoUrl);
      }
      videoEl.currentTime = 0;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay with audio was blocked by browser policy; fallback to muted autoplay
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }

    return () => {
      if (videoEl) {
        videoEl.pause();
      }
    };
  }, [project?.id]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isPreloaded = project.videoUrl ? videoPreloader.isReady(project.videoUrl) : false;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/95 backdrop-blur-xl overflow-y-auto"
    >
      {/* Background Film Grain */}
      <div className="fixed inset-0 film-grain pointer-events-none opacity-40"></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-[#121320] border border-white/15 rounded-xl overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.95)] my-auto z-10">
        {/* Top Bar with Navigation & Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161728]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#DDA838] font-semibold">
              [{String(currentIndex + 1).padStart(2, '0')}/{String(allProjects.length).padStart(2, '0')}]
            </span>
            <span className="text-xs text-[#787774] uppercase tracking-widest hidden sm:inline">
              {project.category}
            </span>
            <span className="text-xs text-[#787774] hidden sm:inline">&middot;</span>
            <span className="text-xs text-[#DDA838] font-mono tracking-wider">
              {project.type}
            </span>

            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-[#DDA838]/30 bg-[#DDA838]/10 text-[#DDA838] hidden md:inline-flex items-center">
              {project.aspectRatio === '9:16' ? '9:16 VERTICAL REEL' : '16:9 CINEMA'}
            </span>

            {isPreloaded && (
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 px-2 py-0.5 rounded">
                <Zap className="w-2.5 h-2.5 fill-[#25D366]" />
                <span>PRE-BUFFERED 0ms</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border-r border-white/10 pr-3 mr-1">
              <button
                disabled={!prevProject}
                onClick={() => prevProject && onSelectProject(prevProject)}
                className={`p-1.5 rounded transition-colors ${
                  prevProject ? 'text-[#EDECE8] hover:text-[#DDA838] hover:bg-white/5' : 'text-zinc-700 cursor-not-allowed'
                }`}
                title="Previous Project (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                disabled={!nextProject}
                onClick={() => nextProject && onSelectProject(nextProject)}
                className={`p-1.5 rounded transition-colors ${
                  nextProject ? 'text-[#EDECE8] hover:text-[#DDA838] hover:bg-white/5' : 'text-zinc-700 cursor-not-allowed'
                }`}
                title="Next Project (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#EDECE8] hover:text-white hover:bg-white/10 rounded transition-colors"
              aria-label="Close Project Detail (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Adaptive High-Resolution Video Player */}
        <div
          ref={playerContainerRef}
          className={`relative w-full bg-black overflow-hidden flex items-center justify-center group select-none ${
            project.aspectRatio === '9:16'
              ? 'h-[65vh] sm:h-[75vh] max-h-[760px] bg-[#050508]'
              : 'aspect-video max-h-[75vh]'
          }`}
        >
          {/* Ambient blurred backdrop for 9:16 vertical reels */}
          {project.aspectRatio === '9:16' && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl scale-125 pointer-events-none"
              style={{ backgroundImage: `url(${project.heroMedia})` }}
            />
          )}

          {/* Center Player Frame (Preserves 100% native aspect ratio and sharp resolution) */}
          <div
            className={`relative flex items-center justify-center ${
              project.aspectRatio === '9:16'
                ? 'h-full aspect-[9/16] max-w-full rounded-lg overflow-hidden border border-white/15 bg-black shadow-[0_0_80px_rgba(0,0,0,0.95)] z-10'
                : 'w-full h-full'
            }`}
          >
            {project.videoUrl ? (
              <video
                ref={videoRef}
                src={project.videoUrl}
                poster={project.heroMedia}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer"
              />
            ) : (
              <img
                src={project.heroMedia}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            )}

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

          {/* Center Play/Pause button on Hover or when paused */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
              !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-black/75 border border-white/20 text-[#EDECE8] flex items-center justify-center backdrop-blur-md hover:scale-110 hover:border-[#DDA838] hover:text-[#DDA838] transition-all duration-300 shadow-2xl"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              onMouseEnter={() =>
                setCursorState({
                  text: isPlaying ? 'PAUSE ❚❚' : 'PLAY ▶',
                  variant: 'play',
                  visible: true,
                })
              }
              onMouseLeave={() =>
                setCursorState({ text: '', variant: 'default', visible: true })
              }
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Interactive Bottom Video Scrubber & Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col gap-2 bg-gradient-to-t from-black/95 to-transparent z-20">
            {/* Scrubber Progress Bar */}
            <div
              onClick={handleSeek}
              className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative transition-all overflow-hidden group/scrubber"
              title="Seek"
            >
              <div
                className="absolute top-0 left-0 bottom-0 bg-[#DDA838] rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-xs font-mono text-white/90">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="hover:text-[#DDA838] transition-colors"
                  title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="hover:text-[#DDA838] transition-colors flex items-center gap-1.5"
                  title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#DDA838]" />
                  )}
                  <span className="text-[11px] uppercase hidden sm:inline">
                    {isMuted ? 'MUTED' : 'AUDIO ON'}
                  </span>
                </button>

                <span className="text-white/40">|</span>

                <span className="text-[11px]">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-[#A1A1AA] text-[11px]">
                  <span className="text-[#DDA838] font-bold">{project.brand}</span>
                  <span>&middot;</span>
                  <span>{project.specs.resolution}</span>
                  <span>&middot;</span>
                  <span>{project.specs.fps}</span>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="p-1 hover:text-[#DDA838] transition-colors"
                  title="Toggle Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-10">
          {/* Main Titles */}
          <div className="border-b border-white/[0.08] pb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#DDA838] tracking-widest uppercase">
                  {project.campaign}
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-display mt-1">
                  {project.title}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#787774] block">RELEASE YEAR</span>
                <span className="text-sm font-mono text-[#EDECE8]">{project.year}</span>
              </div>
            </div>

            <p className="mt-4 text-sm sm:text-base text-[#EDECE8]/90 font-light leading-relaxed max-w-4xl">
              {project.description}
            </p>
          </div>

          {/* 4 Pillars of Project: Concept, Creative Direction, Role, Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="text-xs font-mono tracking-widest text-[#DDA838] uppercase mb-2 flex items-center gap-2">
                <Film className="w-3.5 h-3.5" />
                <span>Concept &amp; Narrative</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-light">
                {project.concept}
              </p>

              {project.sequenceConcept && (
                <div className="mt-6 p-4 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-[#787774] uppercase tracking-wider block mb-1">Shot Progression</span>
                  <p className="text-xs font-mono text-[#DDA838]">
                    {project.sequenceConcept}
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="text-xs font-mono tracking-widest text-[#DDA838] uppercase mb-2 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>Creative Direction &amp; Camera Language</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-light">
                {project.creativeDirection}
              </p>

              <div className="mt-6 space-y-3 pt-4 border-t border-white/[0.05]">
                <div className="text-xs">
                  <span className="text-[#787774] uppercase tracking-wider block font-mono text-[11px]">Primary Role</span>
                  <span className="text-white font-medium">{project.role}</span>
                </div>
                <div className="text-xs">
                  <span className="text-[#787774] uppercase tracking-wider block font-mono text-[11px]">Pipeline &amp; Toolchain</span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 text-xs text-[#DDA838] font-mono">
                    {project.tools.map((tool, idx) => (
                      <span key={tool}>
                        {tool}{idx < project.tools.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Frames Breakdown */}
          {project.keyFrames && project.keyFrames.length > 0 && (
            <div className="border-t border-white/[0.08] pt-8">
              <div className="text-xs font-mono tracking-widest text-[#787774] uppercase mb-4">
                KEYFRAME BREAKDOWN ({project.keyFrames.length} CRITICAL BEATS)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.keyFrames.map((kf, idx) => (
                  <div
                    key={kf.timecode}
                    onClick={() => setActiveFrame(idx)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      activeFrame === idx
                        ? 'border-[#DDA838] bg-[#DDA838]/10'
                        : 'border-white/10 bg-[#161728] hover:border-white/25 hover:bg-[#1A1C30]'
                    }`}
                  >
                    <div className="text-[11px] font-mono text-[#DDA838] mb-1">
                      {kf.timecode}
                    </div>
                    <div className="text-xs font-bold uppercase text-white mb-1">
                      {kf.title}
                    </div>
                    <div className="text-[11px] text-[#A1A1AA] leading-relaxed">
                      {kf.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Specs Strip */}
          <div className="border-t border-white/[0.08] pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
            <div>
              <span className="text-[#787774] block uppercase text-[10px]">Master Resolution</span>
              <span className="text-[#EDECE8] font-bold">{project.specs.resolution}</span>
            </div>
            <div>
              <span className="text-[#787774] block uppercase text-[10px]">Frame Rate</span>
              <span className="text-[#EDECE8] font-bold">{project.specs.fps}</span>
            </div>
            <div>
              <span className="text-[#787774] block uppercase text-[10px]">Color Grading</span>
              <span className="text-[#EDECE8] font-bold">{project.specs.colorSpace}</span>
            </div>
            <div>
              <span className="text-[#787774] block uppercase text-[10px]">Sound Design</span>
              <span className="text-[#EDECE8] font-bold truncate block">{project.specs.audio}</span>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#787774]">
              <span>Project Type:</span> <strong className="text-[#EDECE8]">{project.type}</strong> — Pre-buffered in browser cache for zero-lag instant streaming.
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={SOCIAL_LINKS.upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 text-xs uppercase tracking-wider px-5 py-2.5 shadow-md"
              >
                <span>HIRE ON UPWORK</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider px-5 py-2.5 rounded border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium transition-all"
              >
                <span>SEND DIRECT BRIEF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
