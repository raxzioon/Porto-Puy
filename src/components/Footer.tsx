import React from 'react';
import { personalData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 border-t border-white/10 bg-[#060609] z-10 text-center">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="font-serif text-xl font-bold text-white mb-2">
          {personalData.name}<span className="text-[#ff5fac]">.</span>
        </div>
        
        <p className="text-xs text-gray-400 max-w-md mx-auto mb-6 italic font-serif">
          "Mengolah data menjadi wawasan bisnis nyata dengan dedikasi, kedisiplinan, dan visi strategis."
        </p>

        <div className="text-[11px] text-gray-500">
          &copy; {new Date().getFullYear()} {personalData.name}. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};
