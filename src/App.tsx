/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CustomCursor, CursorState } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { ProjectModal } from './components/ProjectModal';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PROJECTS } from './data/projects';
import { Project } from './types/portfolio';

export default function App() {
  const [cursorState, setCursorState] = useState<CursorState>({
    text: '',
    variant: 'default',
    visible: false,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div
      className="relative min-h-screen bg-[#0C0D14] text-[#EDECE8] selection:bg-[#DDA838] selection:text-black overflow-x-hidden font-sans"
      onMouseEnter={() =>
        setCursorState((prev) => ({ ...prev, visible: true }))
      }
      onMouseLeave={() =>
        setCursorState((prev) => ({ ...prev, visible: false }))
      }
    >
      {/* Ambient Lighting Orbs - Infuse soft brightness, visual life & depth */}
      <div className="fixed top-[-5%] left-[20%] w-[650px] h-[650px] bg-[#DDA838]/[0.055] rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[-10%] w-[750px] h-[750px] bg-[#4338CA]/[0.045] rounded-full blur-[200px] pointer-events-none z-0" />
      <div className="fixed bottom-[15%] left-[-10%] w-[700px] h-[700px] bg-[#DDA838]/[0.045] rounded-full blur-[190px] pointer-events-none z-0" />

      {/* Custom subtle cursor (automatically disabled on mobile/touch) */}
      <CustomCursor cursorState={cursorState} />

      {/* Global Cinematic Film Grain overlay */}
      <div className="fixed inset-0 film-grain pointer-events-none z-30 opacity-30"></div>

      {/* Primary Clean Navigation */}
      <Navigation setCursorState={setCursorState} />

      {/* Clean, Straightforward Main Flow */}
      <main>
        <Hero setCursorState={setCursorState} />
        <Portfolio
          projects={PROJECTS}
          onSelectProject={(proj) => setSelectedProject(proj)}
          setCursorState={setCursorState}
        />
        <Testimonials setCursorState={setCursorState} />
        <Services setCursorState={setCursorState} />
        <About setCursorState={setCursorState} />
        <Contact setCursorState={setCursorState} />
      </main>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        allProjects={PROJECTS}
        setCursorState={setCursorState}
      />

      {/* Clean Footer with WhatsApp, Instagram & Upwork */}
      <Footer setCursorState={setCursorState} />
    </div>
  );
}
