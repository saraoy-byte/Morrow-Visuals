import React from 'react';
import { ArrowUp, Instagram } from 'lucide-react';
import { CursorState } from './CustomCursor';
import { SOCIAL_LINKS } from '../data/projects';

interface FooterProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export const Footer: React.FC<FooterProps> = ({ setCursorState }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 border-t border-white/10 bg-[#0A0B12] text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <a href="#home" className="hover:opacity-90 transition-opacity">
            <img
              src="https://res.cloudinary.com/qbs6njjr/image/upload/v1792748062/morrow2_logo.png"
              alt="Morrow Visuals Logo"
              className="h-16 sm:h-20 w-auto object-contain max-w-[320px] sm:max-w-[380px] drop-shadow-[0_4px_20px_rgba(221,168,56,0.35)] filter contrast-125 brightness-110"
            />
          </a>
          <span className="hidden sm:inline text-white/20">&middot;</span>
          <span className="text-zinc-300 font-mono tracking-wider text-[11px] uppercase">
            AI Video Creator &middot; Cinematic Video Editor &middot; Upwork Freelancer
          </span>
        </div>

        {/* Center: The 3 Requested Social Links (WhatsApp, Instagram, Upwork) */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-[#E4E4E7]">
          {/* WhatsApp */}
          <a
            href={SOCIAL_LINKS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#25D366] transition-colors group"
            onMouseEnter={() =>
              setCursorState({ text: 'WHATSAPP', variant: 'default', visible: true })
            }
          >
            <svg className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WHATSAPP</span>
          </a>

          <span className="text-white/20">&middot;</span>

          {/* Instagram */}
          <a
            href={SOCIAL_LINKS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#E1306C] transition-colors group"
            onMouseEnter={() =>
              setCursorState({ text: 'INSTAGRAM', variant: 'default', visible: true })
            }
          >
            <Instagram className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform" />
            <span>INSTAGRAM</span>
          </a>

          <span className="text-white/20">&middot;</span>

          {/* Upwork */}
          <a
            href={SOCIAL_LINKS.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#14A800] transition-colors group"
            onMouseEnter={() =>
              setCursorState({ text: 'UPWORK', variant: 'default', visible: true })
            }
          >
            <svg className="w-4 h-4 text-[#14A800] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-3.799 0-5.467 2.923-5.94 4.887-1.391-2.133-2.42-4.521-3.031-6.905H6.286v8.423c0 1.637-1.332 2.969-2.969 2.969s-2.97-1.332-2.97-2.969V3h-3.3v8.423c0 3.456 2.812 6.269 6.27 6.269s6.269-2.813 6.269-6.269v-1.111c.542 1.346 1.42 2.753 2.658 3.864l-2.021 9.824h3.385l1.455-7.07c1.071.618 2.296.968 3.585.968 3.662 0 6.643-2.981 6.643-6.643 0-3.664-2.981-6.645-6.645-6.645z" />
            </svg>
            <span>UPWORK</span>
          </a>
        </div>

        {/* Right: Back to Top & Copyright */}
        <div className="flex items-center gap-6">
          <span className="text-[#787774] font-mono text-[11px]">
            &copy; {new Date().getFullYear()} MORROW VISUALS
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded bg-white/[0.04] hover:bg-white/[0.1] text-[#EDECE8] hover:text-[#DDA838] transition-colors"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
