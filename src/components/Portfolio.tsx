import React, { useState } from 'react';
import { Play, Film } from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio';
import { CursorState } from './CustomCursor';
import { useVideoPreloader } from '../hooks/useVideoPreloader';

interface PortfolioProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

const CATEGORIES: ProjectCategory[] = [
  'ALL',
  'AI CINEMATIC TRAILERS',
  'COMMERCIALS & BRAND FILMS',
  'AI FILMMAKING & STORYTELLING',
  'COMMERCIAL PRODUCT ADS',
  'VIDEO EDITING',
];

export const Portfolio: React.FC<PortfolioProps> = ({
  projects,
  onSelectProject,
  setCursorState,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Preload all project videos in background
  const videoUrls = projects.map((p) => p.videoUrl);
  const { prioritize } = useVideoPreloader(videoUrls);

  const filteredProjects =
    activeCategory === 'ALL'
      ? projects
      : projects.filter((p) => {
          if (activeCategory === 'VIDEO EDITING') {
            return p.category === 'VIDEO EDITING' || p.role.toLowerCase().includes('editor');
          }
          return p.category === activeCategory;
        });

  return (
    <section id="portfolio" className="py-24 sm:py-32 border-t border-white/10 relative scroll-mt-20 bg-gradient-to-b from-[#0C0D14] via-[#12131F] to-[#0E0F1A] overflow-hidden">
      {/* Ambient Lighting Accents */}
      <div className="absolute top-20 right-[-10%] w-[650px] h-[550px] bg-[#DDA838]/[0.055] blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-[-5%] w-[550px] h-[450px] bg-[#3B82F6]/[0.04] blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-12 max-w-4xl">
          {/* Service scope kicker */}
          <div className="text-xs tracking-widest text-[#DDA838] uppercase mb-3 font-semibold font-mono">
            CINEMATIC STORIES &middot; COMMERCIALS ADS &middot; FILMS &middot; MOVIES TRAILER
          </div>
          
          {/* Main portfolio introduction title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.08]">
            EXPLORE MY PORTFOLIO
          </h2>

          {/* In-depth, non-generic body describing full creative scope */}
          <p className="text-sm sm:text-base text-[#EDECE8] mt-4 max-w-2xl font-light leading-relaxed">
            A curated body of work spanning high-tension movie trailers, atmospheric narrative films, broadcast brand commercials, and luxury product films. Every project is directed from original story treatments, visual prompt architecture, custom AI synthesis, and precision editorial sound design.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-3 mb-12 border-b border-white/10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === 'ALL'
                ? projects.length
                : projects.filter((p) => {
                    if (cat === 'VIDEO EDITING') {
                       return p.category === 'VIDEO EDITING' || p.role.toLowerCase().includes('editor');
                    }
                    return p.category === cat;
                  }).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider whitespace-nowrap transition-all uppercase rounded border ${
                  isActive
                    ? 'bg-[#DDA838] text-black border-[#DDA838] shadow-[0_0_24px_rgba(221,168,56,0.4)]'
                    : 'text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border-white/10'
                }`}
                onMouseEnter={() =>
                  setCursorState({ text: '', variant: 'default', visible: true })
                }
              >
                {cat} <span className="opacity-75 ml-1 font-mono text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Responsive Portfolio Grid - Displays all projects without limits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const isHovered = hoveredProjectId === project.id;

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer rounded-xl overflow-hidden border border-white/12 bg-[#141524] hover:bg-[#181A2D] hover:border-[#DDA838]/70 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_35px_rgba(221,168,56,0.15)]"
                onMouseEnter={() => {
                  setHoveredProjectId(project.id);
                  if (project.videoUrl) prioritize(project.videoUrl);
                  setCursorState({
                    text: 'VIEW ▶',
                    variant: 'play',
                    visible: true,
                  });
                }}
                onMouseLeave={() => {
                  setHoveredProjectId(null);
                  setCursorState({ text: '', variant: 'default', visible: true });
                }}
              >
                {/* Visual Thumbnail / Preload Player */}
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black flex items-center justify-center">
                    {/* For 9:16 vertical projects, render ambient blurred background + centered vertical reel */}
                    {project.aspectRatio === '9:16' ? (
                      <>
                        <div
                          className="absolute inset-0 bg-cover bg-center blur-lg opacity-40 scale-110 pointer-events-none"
                          style={{ backgroundImage: `url(${project.thumbnail})` }}
                        />
                        <div className="relative h-full aspect-[9/16] mx-auto z-10 overflow-hidden shadow-2xl border-x border-white/10 flex items-center justify-center bg-black">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          {isHovered && project.videoUrl && (
                            <video
                              src={project.videoUrl}
                              poster={project.thumbnail}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="auto"
                              className="absolute inset-0 w-full h-full object-cover z-10"
                            />
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* 16:9 Widescreen full card presentation */}
                        <div className="relative w-full h-full">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          {isHovered && project.videoUrl && (
                            <video
                              src={project.videoUrl}
                              poster={project.thumbnail}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="auto"
                              className="absolute inset-0 w-full h-full object-cover z-10"
                            />
                          )}
                        </div>
                      </>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none z-10"></div>

                    {/* Floating Play Button on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                      <div className="w-14 h-14 rounded-full bg-black/85 border border-[#DDA838] text-[#DDA838] flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-5 sm:p-6">
                    <div className="text-xs font-mono text-[#DDA838] uppercase tracking-wider mb-1.5 font-semibold">
                      {project.brand} &middot; {project.campaign}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#DDA838] transition-colors mb-2.5 leading-snug">
                      {project.title}
                    </h3>

                    {/* Crisp, clear, high-contrast body text */}
                    <p className="text-sm text-[#EDECE8] line-clamp-2 leading-relaxed font-normal mb-3.5">
                      {project.description}
                    </p>

                    <div className="text-xs font-mono text-[#A1A1AA] line-clamp-1">
                      <span className="text-[#DDA838] font-semibold">Role:</span>{' '}
                      <span className="text-[#EDECE8]">{project.role}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Bar with Standout Button Call To Action */}
                <div className="px-5 sm:px-6 py-4 border-t border-white/10 bg-[#0E0F1A] flex items-center justify-between">
                  <span className="truncate mr-3 text-xs font-mono text-[#D4D4D8]">
                    {project.tools[0]}{project.tools[1] ? ` + ${project.tools[1]}` : ''}
                  </span>
                  
                  {/* Standout Button: VIEW PROJECT */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#DDA838] hover:bg-[#E6B64E] text-[#060607] font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-[0_2px_12px_rgba(221,168,56,0.3)] group-hover:scale-105 group-hover:shadow-[0_4px_18px_rgba(221,168,56,0.5)] shrink-0">
                    <Play className="w-3 h-3 fill-current" />
                    <span>VIEW PROJECT</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Commission / Portfolio Expansion Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#141525] via-[#1A1C32] to-[#141525] border border-white/15 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#DDA838]/15 border border-[#DDA838]/40 flex items-center justify-center shrink-0">
              <Film className="w-5 h-5 text-[#DDA838]" />
            </div>
            <div className="text-xs text-[#E4E4E7] leading-relaxed max-w-xl">
              <strong className="text-white block font-medium text-sm mb-0.5">
                Have an Upcoming Commercial, Trailer, or Narrative Script?
              </strong>
              From pre-visualization to broadcast color and final spatial sound mix, every project is tailored to elevate your brand&apos;s cinematic presence.
            </div>
          </div>
          <a
            href="#contact"
            className="btn-gold inline-flex items-center gap-2 text-xs tracking-wider px-6 py-3 uppercase whitespace-nowrap shadow-xl shrink-0"
          >
            <span>COMMISSION A PROJECT &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};
