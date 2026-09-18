import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FileDown, 
  Send, 
  Sparkles, 
  BarChart3, 
  Cpu, 
  Phone,
  Mail
} from 'lucide-react';
import { personalData } from '../data/portfolioData';
import { getCustomProfile, type CustomProfile } from '../lib/adminStorage';

export const Hero: React.FC = () => {
  const [profile, setProfile] = useState<CustomProfile>(getCustomProfile());
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleProfileUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CustomProfile>;
      if (customEvent.detail) setProfile(customEvent.detail);
    };
    window.addEventListener('profile-updated', handleProfileUpdate);
    return () => window.removeEventListener('profile-updated', handleProfileUpdate);
  }, []);

  useEffect(() => {
    const titles = profile.typewriterRoles && profile.typewriterRoles.length > 0 
      ? profile.typewriterRoles 
      : personalData.typewriterRoles;
    const safeIndex = currentTextIndex % titles.length;
    const fullText = titles[safeIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(85);

        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, typingSpeed]);

  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-4rem)] sm:min-h-screen flex items-center justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      {/* Background Cosmic Glow Spots (Pink & Gold) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] h-[340px] sm:h-[680px] bg-[#ff5fac]/12 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[220px] h-[220px] bg-[#d8ac6a]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Orbit Rings Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
        <div className="w-[450px] h-[450px] sm:w-[750px] sm:h-[750px] rounded-full border border-[#ff5fac]/30 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[300px] h-[300px] sm:w-[520px] sm:h-[520px] rounded-full border border-dashed border-[#d8ac6a]/30 animate-[spin_40s_linear_infinite_reverse]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center w-full">

        {/* Live Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161420]/90 border border-[#ff5fac]/35 text-xs text-pink-200 mb-6 backdrop-blur-md shadow-[0_0_18px_rgba(255,95,172,0.3)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5fac] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5fac]"></span>
          </span>
          <span className="font-medium tracking-wide">
            Terbuka untuk Kolaborasi Analisis Bisnis, Data & AI
          </span>
        </motion.div>

        {/* Salutation & Large Name with Glowing Gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-3"
        >
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#d8ac6a] mb-2 font-sans">
            Hello & Welcome, I am
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-serif uppercase px-2">
            {profile.name.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5fac] via-[#ff8ec4] to-[#d8ac6a] drop-shadow-[0_0_25px_rgba(255,95,172,0.6)]">
              {profile.name.split(' ').slice(-1).join(' ')}
            </span>
          </h1>
        </motion.div>

        {/* Stable Height Typewriter Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="min-h-[48px] sm:min-h-[56px] flex items-center justify-center gap-1.5 mb-4 px-2 text-center"
        >
          <span className="text-base sm:text-2xl md:text-3xl font-semibold text-slate-300 flex items-center flex-wrap justify-center">
            Seorang{' '}
            <span className="text-gradient-pink-gold font-bold ml-2 font-mono drop-shadow-[0_0_12px_rgba(255,95,172,0.6)]">
              {currentText}
            </span>
            <span className="inline-block w-0.5 sm:w-1 h-5 sm:h-7 bg-[#ff5fac] ml-1 animate-pulse shadow-[0_0_8px_#ff5fac]" />
          </span>
        </motion.div>

        {/* Biography Paragraph from CV */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="max-w-2xl text-xs sm:text-base text-slate-300 leading-relaxed mb-8 px-3 sm:px-0 font-normal"
        >
          {profile.bio}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-sm sm:max-w-none mb-10 px-2"
        >
          {/* Primary Glow Button */}
          <a
            href="#portfolio"
            onClick={scrollToPortfolio}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full btn-primary-glow text-black font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Jelajahi Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Secondary Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="flex-1 sm:flex-initial px-6 py-3.5 rounded-full btn-outline-gold text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 backdrop-blur-md active:scale-95 transition-all duration-300"
            >
              <Send className="w-3.5 h-3.5 text-[#d8ac6a]" />
              <span>Hubungi Saya</span>
            </a>

            <a
              href={`mailto:${personalData.email}`}
              className="flex-1 sm:flex-initial px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs sm:text-sm border border-white/10 flex items-center justify-center gap-1.5 active:scale-95 transition-all duration-300"
              title="Kirim Email"
            >
              <FileDown className="w-3.5 h-3.5 text-[#ff5fac]" />
              <span>Unduh CV</span>
            </a>
          </div>
        </motion.div>

        {/* Quick Social & Tech Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 border-t border-white/10 w-full max-w-xl"
        >
          {/* Quick Contacts */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-400 font-medium">Kontak:</span>
            <a
              href={personalData.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-[#ff5fac]/30 text-slate-300 hover:text-[#ff5fac] hover:border-[#ff5fac] hover:shadow-[0_0_12px_rgba(255,95,172,0.5)] transition-all"
              aria-label="WhatsApp"
              title={personalData.phone}
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <a
              href={`mailto:${personalData.email}`}
              className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-[#d8ac6a]/30 text-slate-300 hover:text-[#d8ac6a] hover:border-[#d8ac6a] hover:shadow-[0_0_12px_rgba(216,172,106,0.5)] transition-all"
              aria-label="Email"
              title={personalData.email}
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <a
              href={personalData.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-[#ff8ec4]/30 text-slate-300 hover:text-[#ff8ec4] hover:border-[#ff8ec4] hover:shadow-[0_0_12px_rgba(255,142,196,0.5)] transition-all"
              aria-label="Instagram"
              title={personalData.instagram}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>

          <div className="hidden sm:block w-px h-5 bg-white/10" />

          {/* Key Skill Highlights from CV */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-[#ff5fac]" />
              Business Intelligence & SAP
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#d8ac6a]" />
              Google AI & Data Analysis
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
