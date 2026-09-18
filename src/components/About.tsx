import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { personalData, educationList, experienceList } from '../data/portfolioData';
import { getCustomProfile, getCustomAvatar, type CustomProfile } from '../lib/adminStorage';

export const About: React.FC = () => {
  const [profile, setProfile] = useState<CustomProfile>(getCustomProfile());
  const [avatar, setAvatar] = useState<string>(() => {
    return getCustomAvatar() || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';
  });
  const [counts, setCounts] = useState<number[]>(personalData.stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement | null>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const handleProfileUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CustomProfile>;
      if (customEvent.detail) setProfile(customEvent.detail);
    };
    const handleAvatarUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      setAvatar(customEvent.detail || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop');
    };

    window.addEventListener('profile-updated', handleProfileUpdate);
    window.addEventListener('avatar-updated', handleAvatarUpdate);

    return () => {
      window.removeEventListener('profile-updated', handleProfileUpdate);
      window.removeEventListener('avatar-updated', handleAvatarUpdate);
    };
  }, []);

  // Count-up animation using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const duration = 2000;
          const startTime = performance.now();

          const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCounts(
              personalData.stats.map((stat) => Math.floor(easeOut * stat.value))
            );

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setCounts(personalData.stats.map((stat) => stat.value));
            }
          };

          requestAnimationFrame(update);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative py-24 md:py-32 z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff5fac] bg-[#ff5fac]/10 px-4 py-1.5 rounded-full border border-[#ff5fac]/25">
            Tentang Saya
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            Profil & <span className="text-gradient-gold">Jejak Langkah</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Mendedikasikan antusiasme pada integrasi teknologi kecerdasan buatan, visualisasi data bisnis, dan kepemimpinan operasional.
          </p>
        </div>

        {/* Profile Grid: Portrait + Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Back Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#ff5fac] via-[#d8ac6a] to-[#ff5fac] rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-700 animate-pulse" />
              
              <div className="relative w-72 sm:w-80 h-96 sm:h-[420px] rounded-2xl overflow-hidden glass-panel border border-[#ff5fac]/40 shadow-2xl p-2 bg-[#0e0d14]">
                <img
                  src={avatar}
                  alt={`${profile.name} Profile Portrait`}
                  className="w-full h-full object-cover object-top rounded-xl filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Micro Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-nav border border-white/20 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] text-[#d8ac6a] uppercase font-semibold">Spesialisasi</div>
                    <div className="font-bold text-white">Business Intelligence & AI</div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#ff5fac]/20 text-[#ff5fac] flex items-center justify-center text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biography from CV */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl glass-panel border border-white/10 card-hover">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4">
                Profil Profesional
              </h3>
              
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                {profile.bio}
              </p>

              <div className="space-y-2 pt-2 pb-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5fac] shrink-0" />
                  <span>Sertifikasi Profesional Google dalam Business Intelligence & AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d8ac6a] shrink-0" />
                  <span>Terampil dalam Manajemen Pemangku Kepentingan (Stakeholder Management)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff8ec4] shrink-0" />
                  <span>Pengalaman memandu acara & public speaker di tingkat regional</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs">
                <div>
                  <span className="text-gray-400 block mb-1">Domisili</span>
                  <span className="font-semibold text-white">{profile.location}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Pendidikan Terakhir</span>
                  <span className="font-semibold text-white">SMAN 14 Jakarta</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Instagram</span>
                  <a href={`https://instagram.com/${profile.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#ff5fac] hover:underline">
                    {profile.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Education & Experience Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* Riwayat Pendidikan from CV */}
          <div className="p-8 rounded-2xl glass-panel border border-white/10">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#ff5fac]/15 text-[#ff5fac] flex items-center justify-center text-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Riwayat Pendidikan</h3>
                <p className="text-xs text-gray-400">Jejak akademis terstruktur</p>
              </div>
            </div>

            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#ff5fac] before:to-transparent pl-8">
              {educationList.map((edu, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#ff5fac] border-4 border-[#0e0d14]" />
                  <span className="text-xs font-bold text-[#d8ac6a] tracking-wider uppercase">
                    {edu.graduationYear}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">{edu.school}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pengalaman & Kegiatan from CV */}
          <div className="p-8 rounded-2xl glass-panel border border-white/10">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#d8ac6a]/15 text-[#d8ac6a] flex items-center justify-center text-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Pengalaman & Kegiatan</h3>
                <p className="text-xs text-gray-400">Kepemimpinan, operasional & sosialisasi</p>
              </div>
            </div>

            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#d8ac6a] before:to-transparent pl-8">
              {experienceList.map((exp, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#d8ac6a] border-4 border-[#0e0d14]" />
                  <span className="text-xs font-bold text-[#ff5fac] tracking-wider uppercase">
                    {exp.type}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">{exp.role}</h4>
                  <p className="text-xs text-[#f8dfa5] font-medium mb-1.5">{exp.organization}</p>
                  <ul className="space-y-1">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx} className="text-xs text-gray-400 leading-relaxed flex items-start gap-1.5">
                        <span className="text-[#ff5fac] mt-0.5">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Count-Up Project & Milestone Stats */}
        <div
          ref={statsRef}
          id="stats-section"
          className="p-8 sm:p-12 rounded-3xl glass-nav border border-[#ff5fac]/30 bg-gradient-to-br from-[#13111b] via-[#0d0c12] to-[#161219]"
        >
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d8ac6a]">Metrik & Pencapaian</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">Dampak & Rekam Jejak</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {personalData.stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className={`text-3xl sm:text-5xl font-extrabold font-sans ${
                  idx % 2 === 0 ? 'text-gradient-pink' : 'text-gradient-gold'
                }`}>
                  {counts[idx]}{stat.suffix}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
