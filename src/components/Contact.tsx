import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalData } from '../data/portfolioData';
import { saveContactMessage } from '../lib/adminStorage';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'bi-data-analysis',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setToastMessage('Mohon lengkapi seluruh kolom formulir.');
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    setLoading(true);

    // Save message to Admin inbox
    saveContactMessage({
      name: formData.name.trim(),
      email: formData.email.trim(),
      topic: formData.topic,
      message: formData.message.trim()
    });

    setTimeout(() => {
      setLoading(false);
      setToastMessage(`Terima kasih, ${formData.name}! Pesan Anda telah terkirim ke Puteri Najma Azzahra.`);

      // Trigger festive celebration confetti with pink & gold colors
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5fac', '#d8ac6a', '#ff8ec4', '#ffffff']
      });

      setFormData({
        name: '',
        email: '',
        topic: 'bi-data-analysis',
        message: ''
      });

      setTimeout(() => setToastMessage(null), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff5fac] bg-[#ff5fac]/10 px-4 py-1.5 rounded-full border border-[#ff5fac]/25">
            Mulai Terhubung
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            Mari Membangun <span className="text-gradient-pink-gold">Sinergi Positif</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Tertarik untuk berkolaborasi dalam analisis data bisnis, implementasi AI, kegiatan sosialisasi, atau peluang karir?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Cards Column */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Phone & WhatsApp */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 card-hover flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d8ac6a]/15 text-[#d8ac6a] flex items-center justify-center text-xl shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Nomor Telepon & WhatsApp</div>
                <a
                  href={personalData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-semibold text-white hover:text-[#d8ac6a] transition-colors"
                >
                  {personalData.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 card-hover flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#ff5fac]/15 text-[#ff5fac] flex items-center justify-center text-xl shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Alamat Email Resmi</div>
                <a
                  href={`mailto:${personalData.email}`}
                  className="text-sm sm:text-base font-semibold text-white hover:text-[#ff5fac] transition-colors"
                >
                  {personalData.email}
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 card-hover flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#ff8ec4]/15 text-[#ff8ec4] flex items-center justify-center text-xl shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-400">Instagram Pribadi</div>
                <a
                  href={personalData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-semibold text-white hover:text-[#ff8ec4] transition-colors"
                >
                  {personalData.instagram}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 card-hover flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 text-gray-300 flex items-center justify-center text-xl shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Lokasi / Domisili</div>
                <div className="text-sm sm:text-base font-semibold text-white">
                  {personalData.location}
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-[#ff5fac]/25 relative overflow-hidden shadow-2xl">
              
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Kirim Pesan / Ajakan Kolaborasi
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-6">
                Silakan isi formulir di bawah ini untuk mengirim pesan langsung.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 rounded-xl bg-[#171522] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5fac] focus:ring-1 focus:ring-[#ff5fac] text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#171522] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5fac] focus:ring-1 focus:ring-[#ff5fac] text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Topik Diskusi / Kebutuhan
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#171522] border border-white/10 text-white focus:outline-none focus:border-[#ff5fac] focus:ring-1 focus:ring-[#ff5fac] text-sm transition-all"
                  >
                    <option value="bi-data-analysis">Business Intelligence & Analisis Data</option>
                    <option value="ai-tech">Pemanfaatan AI & Otomasi Kerja</option>
                    <option value="stakeholder-management">Manajemen Stakeholder & Kolaborasi Tim</option>
                    <option value="public-speaking">Pembicara / Pemateri Sosialisasi</option>
                    <option value="other">Peluang Karir & Diskusi Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Pesan *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pesan atau gambaran rencana kolaborasi Anda di sini..."
                    className="w-full px-4 py-3 rounded-xl bg-[#171522] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5fac] focus:ring-1 focus:ring-[#ff5fac] text-sm transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl btn-primary-glow font-bold text-xs uppercase tracking-widest text-black flex items-center justify-center gap-2 transition-all disabled:opacity-75"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirimkan Pesan...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Pesan Sekarang</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300 max-w-sm w-full">
          <div className="glass-nav rounded-2xl p-4 border border-[#ff5fac] shadow-[0_0_30px_rgba(255,95,172,0.4)] flex items-start gap-3 bg-[#110f19]">
            <div className="w-8 h-8 rounded-full bg-[#ff5fac]/20 text-[#ff5fac] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white mb-0.5">Berhasil Terkirim</div>
              <p className="text-xs text-gray-300 leading-snug">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
