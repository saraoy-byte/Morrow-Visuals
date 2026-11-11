import React, { useState } from 'react';
import { Copy, Check, Mail, Send } from 'lucide-react';
import { CursorState } from './CustomCursor';
import { SOCIAL_LINKS } from '../data/projects';

interface ContactProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export const Contact: React.FC<ContactProps> = ({ setCursorState }) => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'AI Commercial & Brand Spot',
    budget: '$1,000 - $3,000',
    details: '',
  });

  const copyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name / Company: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Project Category: ${formData.projectType}\n` +
      `Estimated Budget: ${formData.budget}\n\n` +
      `Project Brief / Vision:\n${formData.details}`
    );
    window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-white/10 relative bg-gradient-to-b from-[#0D0E18] via-[#141525] to-[#0A0B12] scroll-mt-20 overflow-hidden">
      {/* Ambient Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#DDA838]/[0.05] blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest text-[#DDA838] uppercase mb-3 font-semibold font-mono">
            <span className="w-5 h-[1px] bg-[#DDA838]"></span>
            <span>GET IN TOUCH</span>
            <span className="w-5 h-[1px] bg-[#DDA838]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-4">
            LET&apos;S CREATE SOMETHING EXTRAORDINARY
          </h2>
          <p className="text-base sm:text-lg text-[#EDECE8] font-light leading-relaxed">
            Have a commercial campaign, product launch, episodic series, or video editing project in mind? Reach out directly via the form below or connect through WhatsApp, Instagram, or Upwork.
          </p>
        </div>

        {/* Contact Form & Direct Email Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Email Info Bar */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-xl bg-[#161728] border border-white/15 space-y-6 shadow-2xl">
            <div>
              <span className="text-xs font-mono text-[#DDA838] uppercase block mb-1 font-semibold tracking-wider">
                DIRECT INBOX
              </span>
              <h3 className="text-lg font-bold text-white uppercase">
                Email the Director
              </h3>
              <p className="text-sm text-[#EDECE8] mt-1.5 font-light leading-relaxed">
                Feel free to copy the email or write directly with your project attachments and brief.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#10111E] border border-white/15 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-[#DDA838] shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-white truncate">{SOCIAL_LINKS.email}</span>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="p-1.5 rounded bg-white/10 hover:bg-[#DDA838]/20 text-xs font-mono text-white transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-[#DDA838]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3.5">
              <div>
                <span className="text-white block font-sans font-semibold text-xs tracking-wider uppercase">Availability</span>
                <span className="text-sm text-[#EDECE8] font-light">Accepting Q4 2026 &amp; 2027 Projects</span>
              </div>
              <div>
                <span className="text-white block font-sans font-semibold text-xs tracking-wider uppercase">Turnaround</span>
                <span className="text-sm text-[#EDECE8] font-light">Typically 3 &ndash; 5 Business Days</span>
              </div>
              <div>
                <span className="text-white block font-sans font-semibold text-xs tracking-wider uppercase">Timezones</span>
                <span className="text-sm text-[#EDECE8] font-light">Global Clients &middot; PST / EST / GMT</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-xl bg-[#161728] border border-white/15 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mb-2">
              SEND A PROJECT BRIEF
            </h3>
            <p className="text-sm sm:text-base text-[#EDECE8] mb-6 font-light leading-relaxed">
              Fill out this quick form and it will prepare your email brief directly to <span className="text-[#DDA838] font-mono font-medium">{SOCIAL_LINKS.email}</span>.
            </p>

            {formSubmitted ? (
              <div className="p-8 rounded-xl bg-[#10111E] border border-[#DDA838]/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#DDA838]/10 border border-[#DDA838] text-[#DDA838] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white uppercase">INQUIRY DISPATCHED</h4>
                <p className="text-sm sm:text-base text-[#EDECE8] max-w-sm mx-auto font-light leading-relaxed">
                  Your project brief has been initiated to {SOCIAL_LINKS.email}. Expect a directorial reply within 24 business hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-[#DDA838] underline pt-2 font-mono hover:text-white cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-[#E4E4E7] uppercase mb-2 font-medium tracking-wider">
                      Your Name / Company
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rivera / Brand Lead"
                      className="w-full bg-[#10111E] border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#DDA838] focus:bg-[#131424] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#E4E4E7] uppercase mb-2 font-medium tracking-wider">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@brand.com"
                      className="w-full bg-[#10111E] border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#DDA838] focus:bg-[#131424] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-[#E4E4E7] uppercase mb-2 font-medium tracking-wider">
                      Project Category
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#10111E] border border-white/20 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-[#DDA838] focus:bg-[#131424] transition-colors cursor-pointer"
                    >
                      <option className="bg-[#10111E] text-white">AI Commercial &amp; Brand Spot</option>
                      <option className="bg-[#10111E] text-white">AI Cinematic Movie Trailers</option>
                      <option className="bg-[#10111E] text-white">Commercial Product Ads</option>
                      <option className="bg-[#10111E] text-white">Video Editing &amp; Color Grading</option>
                      <option className="bg-[#10111E] text-white">Episodic Series &amp; Storytelling</option>
                      <option className="bg-[#10111E] text-white">Custom / Full Campaign</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#E4E4E7] uppercase mb-2 font-medium tracking-wider">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#10111E] border border-white/20 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-[#DDA838] focus:bg-[#131424] transition-colors cursor-pointer"
                    >
                      <option className="bg-[#10111E] text-white">$500 - $1,500</option>
                      <option className="bg-[#10111E] text-white">$1,500 - $3,500</option>
                      <option className="bg-[#10111E] text-white">$3,500 - $7,000</option>
                      <option className="bg-[#10111E] text-white">$7,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#E4E4E7] uppercase mb-2 font-medium tracking-wider">
                    Project Details &amp; References
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Briefly describe your product or concept, desired duration, reference mood, and timeline..."
                    className="w-full bg-[#10111E] border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#DDA838] focus:bg-[#131424] transition-colors resize-none leading-relaxed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full inline-flex items-center justify-center gap-2 text-xs tracking-widest uppercase py-3.5 shadow-xl cursor-pointer"
                  onMouseEnter={() =>
                    setCursorState({
                      text: 'SEND BRIEF →',
                      variant: 'create',
                      visible: true,
                    })
                  }
                  onMouseLeave={() =>
                    setCursorState({ text: '', variant: 'default', visible: true })
                  }
                >
                  <span>SEND PROJECT BRIEF &rarr;</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
