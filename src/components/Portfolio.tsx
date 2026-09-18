import React, { useState } from 'react';
import { FolderOpen, Award, Wrench, ArrowRight, CheckCircle, Cpu, BarChart3, MessageSquare, Users, Layers } from 'lucide-react';
import { projectsList, certificatesList, skillsCategories, type ProjectItem } from '../data/portfolioData';

interface PortfolioProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'skills'>('projects');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-[#ff5fac]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#d8ac6a]" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-[#ff8ec4]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#d8ac6a]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#ff5fac]" />;
      default: return <Wrench className="w-5 h-5 text-[#ff5fac]" />;
    }
  };

  return (
    <section id="portfolio" className="relative py-24 md:py-32 z-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d8ac6a] bg-[#d8ac6a]/10 px-4 py-1.5 rounded-full border border-[#d8ac6a]/25">
            Portofolio & Kompetensi
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            Karya & <span className="text-gradient-pink-gold">Sertifikasi Resmi</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Eksplorasi portofolio inisiatif, kredensial resmi Google, dan spektrum keahlian bisnis serta AI.
          </p>
        </div>

        {/* Tab Switcher Navigation */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1.5 rounded-full glass-panel border border-[#ff5fac]/30 shadow-[0_0_25px_rgba(255,95,172,0.2)]">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-[#ff5fac]/20 to-[#d8ac6a]/20 text-white border border-[#ff5fac]'
                  : 'text-gray-400 border border-transparent hover:text-white'
              }`}
            >
              <FolderOpen className="w-4 h-4 text-[#ff5fac]" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-5 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'certificates'
                  ? 'bg-gradient-to-r from-[#ff5fac]/20 to-[#d8ac6a]/20 text-white border border-[#ff5fac]'
                  : 'text-gray-400 border border-transparent hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-[#d8ac6a]" />
              <span>Certificates</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`px-5 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'skills'
                  ? 'bg-gradient-to-r from-[#ff5fac]/20 to-[#d8ac6a]/20 text-white border border-[#ff5fac]'
                  : 'text-gray-400 border border-transparent hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4 text-[#ff8ec4]" />
              <span>Tools & Skill</span>
            </button>
          </div>
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
            {projectsList.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-2xl glass-panel border border-white/10 card-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-5 bg-[#171520]">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0e0d14]/90 text-[#ff5fac] border border-[#ff5fac]/30">
                      {proj.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#d8ac6a] font-semibold mb-2">
                    <span>{proj.period}</span>
                    <span>•</span>
                    <span>{proj.role}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#ff5fac] transition-colors mb-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {proj.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tools.slice(0, 2).map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] px-2.5 py-1 rounded bg-white/5 text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="text-xs font-bold text-[#ff5fac] hover:text-[#ff8ec4] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Detail Studi Kasus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {certificatesList.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-2xl glass-panel border border-white/10 card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#ff5fac]/10 border border-[#ff5fac]/30 flex items-center justify-center text-[#ff5fac] mb-4">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-bold text-[#d8ac6a] tracking-wider uppercase">
                      {cert.issuer}
                    </span>
                    <span className="text-[11px] text-gray-400">{cert.date}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mt-1 mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#1a1824] text-[#d8ac6a] border border-[#d8ac6a]/30">
                    {cert.badge}
                  </span>
                  <span className="text-[#ff5fac] font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Google</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: TOOLS & SKILL */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {skillsCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-white/10 card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <h3 className="font-serif text-base font-bold text-white">
                      {cat.category}
                    </h3>
                  </div>

                  <ul className="space-y-2.5">
                    {cat.skills.map((s, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-xs text-gray-300 leading-snug">
                        <span className="text-[#ff5fac] mt-0.5">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-[#d8ac6a] font-semibold">
                    Kredensial Terverifikasi
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
