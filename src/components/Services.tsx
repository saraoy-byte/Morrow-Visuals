import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/projects';
import { CursorState } from './CustomCursor';

interface ServicesProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export const Services: React.FC<ServicesProps> = ({ setCursorState }) => {
  return (
    <section id="services" className="py-24 sm:py-32 border-t border-white/10 relative scroll-mt-20 bg-gradient-to-b from-[#0F101B] via-[#141524] to-[#0E0F1A] overflow-hidden">
      {/* Ambient Lighting Accent */}
      <div className="absolute top-1/3 left-[-5%] w-[600px] h-[450px] bg-[#DDA838]/[0.05] blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 text-xs tracking-widest text-[#DDA838] uppercase mb-3 font-semibold font-mono">
              <span className="w-5 h-[1px] bg-[#DDA838]"></span>
              <span>SPECIALIZED SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              WHAT I CREATE
            </h2>
          </div>

          <p className="text-sm text-[#EDECE8] max-w-md font-light leading-relaxed">
            Commercial-grade video production tailored to your campaign requirements. Delivered in broadcast 4K with full commercial usage rights.
          </p>
        </div>

        {/* 4 Straightforward Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="p-6 sm:p-8 rounded-xl bg-[#161726] border border-white/12 hover:border-[#DDA838]/60 hover:bg-[#1A1C30] transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#DDA838] mb-4">
                  <span className="font-bold">SERVICE #{service.number}</span>
                  <Sparkles className="w-4 h-4 text-[#DDA838] opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mb-2 group-hover:text-[#DDA838] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs font-mono text-[#DDA838] mb-4">
                  {service.subtitle}
                </p>

                <p className="text-sm text-[#EDECE8] leading-relaxed font-light mb-6">
                  {service.description}
                </p>

                <div className="border border-white/10 bg-white/[0.02] p-4 rounded-lg space-y-2 mb-6">
                  <span className="text-[11px] font-mono text-[#D4D4D8] uppercase tracking-wider block mb-2 font-medium">
                    Key Deliverables:
                  </span>
                  {service.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-xs text-[#EDECE8]">
                      <Check className="w-3.5 h-3.5 text-[#DDA838] shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-white/[0.08] flex items-center justify-start">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-4 py-2 rounded bg-[#DDA838] hover:bg-[#E6B64E] text-[#060607] font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-[0_2px_12px_rgba(221,168,56,0.3)] hover:scale-105 hover:shadow-[0_4px_18px_rgba(221,168,56,0.5)]"
                >
                  <span>BOOK THIS SERVICE</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
