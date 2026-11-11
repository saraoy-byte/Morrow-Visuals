import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { CursorState } from './CustomCursor';
import { TESTIMONIALS, TestimonialItem } from '../data/testimonials';

interface TestimonialsProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ setCursorState }) => {
  // Group 6 testimonials into slides of 2 (3 slides total)
  const slides: [TestimonialItem, TestimonialItem][] = [];
  for (let i = 0; i < TESTIMONIALS.length; i += 2) {
    if (TESTIMONIALS[i + 1]) {
      slides.push([TESTIMONIALS[i], TESTIMONIALS[i + 1]]);
    }
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 border-t border-white/10 relative overflow-hidden bg-gradient-to-b from-[#0E0F1A] via-[#141526] to-[#0F101B] scroll-mt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Luminous Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#DDA838]/[0.065] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[500px] h-[400px] bg-[#6366F1]/[0.045] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2.5 text-xs tracking-widest text-[#DDA838] uppercase mb-3 font-semibold font-mono">
              <span className="w-5 h-[1px] bg-[#DDA838]"></span>
              <span>CLIENT VOICES &middot; TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              PROVEN RESULTS.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6C8] to-[#DDA838]">
                DIRECTORS &amp; BRANDS SPEAK.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#EDECE8] font-light max-w-2xl mt-3 leading-relaxed">
              Real feedback from executive clients, film directors, and marketing leaders who partnered with Morrow Visuals for commercials, trailers, and film editing.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Slide counter */}
            <div className="text-xs font-mono text-[#DDA838] tracking-widest">
              <span className="text-white font-bold text-sm">
                0{currentSlide + 1}
              </span>
              <span className="text-zinc-600 mx-1">/</span>
              <span className="text-zinc-400">0{totalSlides}</span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-full bg-[#161728] border border-white/15 hover:border-[#DDA838] flex items-center justify-center text-white hover:text-[#DDA838] hover:bg-white/[0.08] transition-all cursor-pointer shadow-lg"
                aria-label="Previous Testimonials Slide"
                onMouseEnter={() =>
                  setCursorState({ text: 'PREV', variant: 'default', visible: true })
                }
                onMouseLeave={() =>
                  setCursorState({ text: '', variant: 'default', visible: true })
                }
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-11 h-11 rounded-full bg-[#161728] border border-white/15 hover:border-[#DDA838] flex items-center justify-center text-white hover:text-[#DDA838] hover:bg-white/[0.08] transition-all cursor-pointer shadow-lg"
                aria-label="Next Testimonials Slide"
                onMouseEnter={() =>
                  setCursorState({ text: 'NEXT', variant: 'default', visible: true })
                }
                onMouseLeave={() =>
                  setCursorState({ text: '', variant: 'default', visible: true })
                }
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport (Two Testimonials Per Slide) */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((pair, slideIdx) => (
              <div
                key={slideIdx}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-0.5"
              >
                {pair.map((item) => (
                  <div
                    key={item.id}
                    className="p-7 sm:p-9 rounded-xl bg-[#161728]/95 border border-white/15 hover:border-[#DDA838]/60 hover:bg-[#1B1D32] transition-all duration-300 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)] group relative"
                  >
                    {/* Top Row: Tag, Rating & Quote Icon */}
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-1">
                          {[...Array(item.rating)].map((_, starIdx) => (
                            <Star
                              key={starIdx}
                              className="w-4 h-4 fill-[#DDA838] text-[#DDA838]"
                            />
                          ))}
                        </div>
                        <Quote className="w-7 h-7 text-[#DDA838]/25 group-hover:text-[#DDA838]/40 transition-colors" />
                      </div>

                      {/* Editorial Kicker / Highlight */}
                      <div className="text-xs font-mono text-[#DDA838] uppercase tracking-wider mb-3">
                        {item.tag}
                      </div>

                      {/* Testimonial Quote */}
                      <blockquote className="text-base sm:text-lg text-[#EDECE8] leading-relaxed font-light mb-8">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                    </div>

                    {/* Bottom Author Card */}
                    <div className="pt-5 border-t border-white/[0.08]">
                      <h3 className="text-sm sm:text-base font-bold text-white uppercase group-hover:text-[#DDA838] transition-colors leading-tight">
                        {item.clientName}
                      </h3>
                      <p className="text-xs text-zinc-300 font-light mt-0.5">
                        {item.clientRole} &middot;{' '}
                        <span className="text-zinc-400">{item.project}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicator Track */}
        <div className="flex items-center justify-center gap-3 mt-10 sm:mt-12">
          {slides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentSlide(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === dotIdx
                  ? 'w-10 bg-[#DDA838]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to Testimonials Slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
