import React, { useState, useEffect } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AdminPanel } from './components/AdminPanel';
import { syncRemoteSettings } from './lib/supabase';
import type { ProjectItem } from './data/portfolioData';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Sync profile photo and settings from database across all devices and visitors
  useEffect(() => {
    syncRemoteSettings();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07070a] text-slate-100 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Dynamic Background: Rising Particles Canvas + Floating Glowing Orbs */}
      <BackgroundEffects />

      {/* Center Top Floating Navbar with Pink Glow */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Portfolio onSelectProject={(project) => setSelectedProject(project)} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Case Study Pop-up Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin Panel (Ganti Profil & Kelola Pesan Masuk Pengunjung) */}
      <AdminPanel />
    </div>
  );
};

export default App;
