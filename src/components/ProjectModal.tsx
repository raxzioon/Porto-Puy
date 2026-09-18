import React, { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#040408]/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#100f18] border border-[#ff5fac]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(255,95,172,0.3)] animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff5fac] bg-[#ff5fac]/10 px-3 py-1 rounded-full border border-[#ff5fac]/20">
              {project.category}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-2">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors ml-4 shrink-0"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role and Period Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
          <div>
            <span className="text-gray-400 block mb-0.5">Peran / Posisi</span>
            <span className="font-semibold text-white">{project.role}</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-0.5">Periode Pelaksanaan</span>
            <span className="font-semibold text-[#d8ac6a]">{project.period}</span>
          </div>
        </div>

        {/* Narrative Flow */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d8ac6a] mb-1">
              Ringkasan Eksekutif
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {project.summary}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ff5fac] mb-1">
              Tantangan yang Dihadapi
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {project.challenge}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ff8ec4] mb-1">
              Pendekatan & Solusi Strategis
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Outcomes */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
            Hasil & Dampak Terukur
          </h4>
          <ul className="space-y-2">
            {project.outcomes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#ff5fac] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools and Frameworks */}
        <div className="pt-4 border-t border-white/10">
          <span className="text-[11px] font-semibold text-gray-400 block mb-2">
            Framework & Keahlian Terkait:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#1a1824] text-[#d8ac6a] border border-[#d8ac6a]/30"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
