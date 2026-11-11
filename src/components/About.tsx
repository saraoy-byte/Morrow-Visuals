import React from 'react';
import { Film, Clapperboard, Sparkles, Layers } from 'lucide-react';
import { CursorState } from './CustomCursor';

interface AboutProps {
  setCursorState?: React.Dispatch<React.SetStateAction<CursorState>>;
}

export const About: React.FC<AboutProps> = () => {
  const brandPillars = [
    {
      icon: Clapperboard,
      title: 'Movie-Like Series & Episodic Worlds',
      desc: 'Building multi-scene narrative continuity, cinematic set designs, and atmospheric worldbuilding crafted with the scale of high-end cinema.',
    },
    {
      icon: Sparkles,
      title: 'Commercial & Product Ads',
      desc: 'Hyper-detailed tabletop fluid dynamics, luxury specular lighting, and sensory visual pacing designed to command buyer desire.',
    },
    {
      icon: Film,
      title: 'Narrative Storytelling',
      desc: 'Evocative stories grounded in human emotion, subtle character acting, and dramatic tension that turns casual viewers into loyal audiences.',
    },
    {
      icon: Layers,
      title: 'Google Flow & Editorial Precision',
      desc: 'Orchestrating modern AI platforms—including Google Flow, Runway, and Kling—with DaVinci Resolve Studio color grading and spatial sound for broadcast 4K.',
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 border-t border-white/10 relative scroll-mt-20 bg-gradient-to-b from-[#0E0F1A] via-[#141525] to-[#0D0E18] overflow-hidden">
      {/* Ambient Lighting Accent */}
      <div className="absolute top-1/4 right-[-5%] w-[600px] h-[500px] bg-[#DDA838]/[0.05] blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-2.5 text-xs tracking-widest text-[#DDA838] uppercase mb-4 font-semibold font-mono">
          <span className="w-5 h-[1px] bg-[#DDA838]"></span>
          <span>THE STUDIO &middot; MORROW VISUALS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brand Mission & Story */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight mb-6">
              Stories That Command Attention.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6C8] to-[#DDA838] block sm:inline">
                Visuals That Stay.
              </span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#EDECE8] leading-relaxed font-light">
              <p>
                <strong className="text-white font-semibold">Morrow Visuals</strong> was built on a simple conviction: breathtaking cinematic visuals shouldn&apos;t require multimillion-dollar studio bloat or months of production standstill. We exist to empower visionary brands, commercial creators, and storytellers with Hollywood-grade film craft at the speed of modern imagination.
              </p>
              <p>
                We specialize in creating <span className="text-white font-medium">cinematic movie-like series</span>, compelling <span className="text-white font-medium">narrative storytelling</span>, high-converting <span className="text-white font-medium">commercial product ads</span>, and surgical <span className="text-white font-medium">video editing</span>. By driving the industry&apos;s most advanced generative AI pipelines—including <span className="text-[#DDA838] font-medium">Google Flow</span>, Runway Gen-3, Kling, and Midjourney—and refining every frame in <span className="text-white font-medium">DaVinci Resolve Studio</span>, we deliver uncompromised visual depth, deliberate camera choreography, and authentic emotional resonance.
              </p>
              <p className="text-[#E4E4E7]">
                Whether you need a high-tension trailer to launch a brand, a recurring episodic series concept, or an irresistible product commercial that stops thumbs in their tracks, Morrow Visuals transforms raw ideas into unforgettable cinematic spectacles.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Brand Core Capabilities */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono text-[#DDA838] uppercase font-bold tracking-wider mb-2">
              HOW MORROW VISUALS ELEVATES YOUR PROJECTS
            </div>

            {brandPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-xl bg-[#161728] border border-white/12 hover:border-[#DDA838]/60 hover:bg-[#1B1D32] transition-all duration-300 group shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#DDA838]/15 border border-[#DDA838]/30 flex items-center justify-center shrink-0 group-hover:border-[#DDA838] group-hover:bg-[#DDA838]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#DDA838]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase text-white mb-1.5 group-hover:text-[#DDA838] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-[#E4E4E7] leading-relaxed font-light">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
