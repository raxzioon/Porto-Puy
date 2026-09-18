import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  User, 
  Upload, 
  Sparkles, 
  Eye, 
  Copy, 
  Check, 
  LogOut,
  Sliders,
  Send
} from 'lucide-react';
import { 
  getStoredMessages, 
  markMessageAsRead, 
  deleteContactMessage, 
  getCustomProfile, 
  saveCustomProfile, 
  resetCustomProfile, 
  getCustomAvatar, 
  saveCustomAvatar, 
  resetCustomAvatar, 
  compressImage,
  type ContactMessage,
  type CustomProfile
} from '../lib/adminStorage';
import { personalData } from '../data/portfolioData';

export const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'inbox' | 'profile' | 'security'>('inbox');

  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Profile state
  const [profileData, setProfileData] = useState<CustomProfile>(getCustomProfile());
  const [avatarPreview, setAvatarPreview] = useState<string>(() => {
    return getCustomAvatar() || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';
  });
  const [avatarUrlInput, setAvatarUrlInput] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [profileErrorMsg, setProfileErrorMsg] = useState('');

  const defaultPin = '1234';

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const loadMessages = useCallback(() => {
    setMessages(getStoredMessages());
  }, []);

  useEffect(() => {
    loadMessages();

    const handleMessagesUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ContactMessage[]>;
      if (customEvent.detail) {
        setMessages(customEvent.detail);
      } else {
        loadMessages();
      }
    };

    const handleProfileUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CustomProfile>;
      if (customEvent.detail) {
        setProfileData(customEvent.detail);
      }
    };

    const handleAvatarUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      if (customEvent.detail) {
        setAvatarPreview(customEvent.detail);
      }
    };

    window.addEventListener('messages-updated', handleMessagesUpdate);
    window.addEventListener('profile-updated', handleProfileUpdate);
    window.addEventListener('avatar-updated', handleAvatarUpdate);

    return () => {
      window.removeEventListener('messages-updated', handleMessagesUpdate);
      window.removeEventListener('profile-updated', handleProfileUpdate);
      window.removeEventListener('avatar-updated', handleAvatarUpdate);
    };
  }, [loadMessages]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === defaultPin) {
      setIsAuthenticated(true);
      setPinError('');
      setPinInput('');
      loadMessages();
    } else {
      setPinError('PIN salah. Coba PIN bawaan: 1234');
    }
  };

  const handleMarkRead = (id: string) => {
    markMessageAsRead(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
    if (selectedMessage?.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, is_read: true } : null));
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('Hapus pesan ini dari inbox?')) {
      deleteContactMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setProfileErrorMsg('File harus berupa gambar (JPG, PNG, WebP).');
      return;
    }

    setIsCompressing(true);
    setProfileErrorMsg('');
    setProfileSuccessMsg('');

    try {
      const compressed = await compressImage(file, 800, 800, 0.88);
      setAvatarPreview(compressed);
      saveCustomAvatar(compressed);
      setProfileSuccessMsg('Foto profil baru berhasil diunggah!');
      setTimeout(() => setProfileSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
      setProfileErrorMsg('Gagal memproses gambar. Silakan coba file lain.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleApplyAvatarUrl = () => {
    if (!avatarUrlInput.trim()) return;
    const url = avatarUrlInput.trim();
    setAvatarPreview(url);
    saveCustomAvatar(url);
    setAvatarUrlInput('');
    setProfileSuccessMsg('Tautan foto profil berhasil diperbarui!');
    setTimeout(() => setProfileSuccessMsg(''), 4000);
  };

  const handleResetAvatar = () => {
    if (confirm('Kembalikan foto profil ke foto awal?')) {
      resetCustomAvatar();
      setAvatarPreview('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop');
      setProfileSuccessMsg('Foto profil berhasil di-reset.');
      setTimeout(() => setProfileSuccessMsg(''), 3000);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveCustomProfile(profileData);
    setProfileSuccessMsg('Data profil berhasil diperbarui di seluruh website!');
    setTimeout(() => setProfileSuccessMsg(''), 4000);
  };

  const handleResetAllProfile = () => {
    if (confirm('Kembalikan semua teks profil ke data bawaan CV?')) {
      resetCustomProfile();
      setProfileData({ ...personalData });
      setProfileSuccessMsg('Profil berhasil dikembalikan ke data default.');
      setTimeout(() => setProfileSuccessMsg(''), 3000);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Left) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[#121118]/90 hover:bg-[#1a1824] text-white border border-[#ff5fac]/40 shadow-[0_0_25px_rgba(255,95,172,0.4)] backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        title="Admin Panel (Pesan & Profil)"
      >
        <ShieldCheck className="w-5 h-5 text-[#ff5fac] group-hover:rotate-12 transition-transform" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#ff5fac] text-black text-[10px] font-extrabold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Main Admin Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#0f0e16] border border-[#ff5fac]/40 rounded-3xl shadow-[0_0_60px_rgba(255,95,172,0.25)] overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#151320]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#ff5fac]/15 border border-[#ff5fac]/30 flex items-center justify-center text-[#ff5fac]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                      Admin Panel Portfolio
                      {unreadCount > 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff5fac] text-black font-extrabold">
                          {unreadCount} Pesan Baru
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Kelola pesan pengunjung & kustomisasi profil Anda
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isAuthenticated && (
                    <button
                      onClick={() => setIsAuthenticated(false)}
                      className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 flex items-center gap-1.5 transition-colors"
                      title="Kunci Panel"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Kunci</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body: Authentication Screen or Dashboard */}
              {!isAuthenticated ? (
                <div className="p-8 sm:p-12 text-center max-w-sm mx-auto my-auto w-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#ff5fac]/10 border border-[#ff5fac]/30 flex items-center justify-center text-[#ff5fac] mx-auto mb-4">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-white mb-1">
                    Verifikasi Akses Admin
                  </h4>
                  <p className="text-xs text-gray-400 mb-6">
                    Masukkan PIN keamanan untuk membuka akses inbox pesan dan kustomisasi profil.
                  </p>

                  <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                      <input
                        type="password"
                        autoFocus
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="PIN (Default: 1234)"
                        className="w-full px-4 py-3 rounded-xl bg-[#1a1826] border border-white/10 text-white text-center tracking-widest text-lg focus:outline-none focus:border-[#ff5fac] focus:ring-1 focus:ring-[#ff5fac]"
                      />
                      {pinError && (
                        <p className="text-xs text-rose-400 mt-2">{pinError}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl btn-primary-glow text-black font-bold text-xs uppercase tracking-wider"
                    >
                      Buka Admin Panel
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated Dashboard */
                <div className="flex flex-col flex-1 overflow-hidden">
                  
                  {/* Tabs Navigation */}
                  <div className="flex border-b border-white/10 px-6 bg-[#13111d] text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab('inbox')}
                      className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                        activeTab === 'inbox'
                          ? 'border-[#ff5fac] text-[#ff5fac]'
                          : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      <span>Pesan Pengunjung</span>
                      {unreadCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-[#ff5fac] text-black text-[9px] font-bold flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                        activeTab === 'profile'
                          ? 'border-[#ff5fac] text-[#ff5fac]'
                          : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Ganti Profil & Foto</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('security')}
                      className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                        activeTab === 'security'
                          ? 'border-[#ff5fac] text-[#ff5fac]'
                          : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      <Sliders className="w-4 h-4" />
                      <span>Informasi & Pengaturan</span>
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="flex-1 overflow-y-auto p-6">
                    
                    {/* ======================================================= */}
                    {/* TAB 1: INBOX PESAN PENGUNJUNG                           */}
                    {/* ======================================================= */}
                    {activeTab === 'inbox' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-serif text-lg font-bold text-white">
                              Daftar Pesan Masuk ({messages.length})
                            </h4>
                            <p className="text-xs text-gray-400">
                              Semua pesan yang dikirimkan oleh pengunjung melalui formulir kontak.
                            </p>
                          </div>
                          <button
                            onClick={loadMessages}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-1.5 text-xs transition-colors"
                            title="Segarkan"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Refresh</span>
                          </button>
                        </div>

                        {messages.length === 0 ? (
                          <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl">
                            <Mail className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                            <h5 className="text-sm font-semibold text-gray-300 mb-1">
                              Belum Ada Pesan Masuk
                            </h5>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">
                              Ketika pengunjung mengisi formulir di bagian kontak, pesannya akan langsung tersimpan dan tampil di sini.
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            
                            {/* Message List Column */}
                            <div className="md:col-span-5 space-y-2 max-h-[460px] overflow-y-auto pr-1">
                              {messages.map((msg) => (
                                <div
                                  key={msg.id}
                                  onClick={() => {
                                    setSelectedMessage(msg);
                                    if (!msg.is_read) handleMarkRead(msg.id);
                                  }}
                                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                                    selectedMessage?.id === msg.id
                                      ? 'bg-[#201c30] border-[#ff5fac]'
                                      : msg.is_read
                                      ? 'bg-[#14121e] border-white/5 hover:border-white/15'
                                      : 'bg-[#221728] border-[#ff5fac]/40 shadow-[0_0_12px_rgba(255,95,172,0.15)]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-xs font-bold text-white truncate">
                                      {msg.name}
                                    </span>
                                    {!msg.is_read && (
                                      <span className="w-2 h-2 rounded-full bg-[#ff5fac] shrink-0" />
                                    )}
                                  </div>
                                  <div className="text-[11px] text-[#d8ac6a] truncate mb-1">
                                    {msg.email}
                                  </div>
                                  <div className="text-xs text-gray-400 line-clamp-1">
                                    {msg.message}
                                  </div>
                                  <div className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{new Date(msg.created_at).toLocaleString('id-ID')}</span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Message Detail Column */}
                            <div className="md:col-span-7">
                              {selectedMessage ? (
                                <div className="p-6 rounded-2xl bg-[#151320] border border-white/10 h-full flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 mb-4">
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <h5 className="font-serif text-lg font-bold text-white">
                                            {selectedMessage.name}
                                          </h5>
                                          {selectedMessage.is_read ? (
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                              Sudah Dibaca
                                            </span>
                                          ) : (
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#ff5fac]/15 text-[#ff5fac] border border-[#ff5fac]/30">
                                              Baru
                                            </span>
                                          )}
                                        </div>
                                        <a
                                          href={`mailto:${selectedMessage.email}`}
                                          className="text-xs text-[#d8ac6a] hover:underline"
                                        >
                                          {selectedMessage.email}
                                        </a>
                                        {selectedMessage.topic && (
                                          <div className="text-[11px] text-gray-400 mt-1">
                                            Topik: <span className="text-gray-200">{selectedMessage.topic}</span>
                                          </div>
                                        )}
                                      </div>

                                      <div className="text-right text-[11px] text-gray-500">
                                        {new Date(selectedMessage.created_at).toLocaleString('id-ID')}
                                      </div>
                                    </div>

                                    {/* Message Body */}
                                    <div className="text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap bg-[#0c0b12] p-4 rounded-xl border border-white/5 mb-6">
                                      {selectedMessage.message}
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-2">
                                      <a
                                        href={`mailto:${selectedMessage.email}?subject=Balasan: ${selectedMessage.topic || 'Inquiry Portfolio'}`}
                                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5fac] to-[#d8ac6a] text-black font-bold text-xs flex items-center gap-1.5"
                                      >
                                        <Send className="w-3.5 h-3.5" />
                                        <span>Balas Email</span>
                                      </a>

                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(selectedMessage.email);
                                          setCopiedEmail(true);
                                          setTimeout(() => setCopiedEmail(false), 2000);
                                        }}
                                        className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs flex items-center gap-1.5 transition-colors"
                                      >
                                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span>{copiedEmail ? 'Disalin' : 'Salin Email'}</span>
                                      </button>
                                    </div>

                                    <button
                                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs flex items-center gap-1 transition-colors"
                                      title="Hapus Pesan"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      <span className="hidden sm:inline">Hapus</span>
                                    </button>
                                  </div>

                                </div>
                              ) : (
                                <div className="p-12 text-center border border-white/5 rounded-2xl h-full flex flex-col items-center justify-center text-gray-500 text-xs">
                                  <Eye className="w-8 h-8 mb-2 opacity-50" />
                                  <span>Pilih pesan dari daftar di sebelah kiri untuk melihat detail isi pesan.</span>
                                </div>
                              )}
                            </div>

                          </div>
                        )}
                      </div>
                    )}

                    {/* ======================================================= */}
                    {/* TAB 2: GANTI PROFIL & FOTO                              */}
                    {/* ======================================================= */}
                    {activeTab === 'profile' && (
                      <div className="space-y-8">
                        {profileSuccessMsg && (
                          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>{profileSuccessMsg}</span>
                          </div>
                        )}
                        {profileErrorMsg && (
                          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                            {profileErrorMsg}
                          </div>
                        )}

                        {/* Section A: Ganti Foto Profil */}
                        <div className="p-6 rounded-2xl bg-[#14121e] border border-white/10">
                          <h4 className="font-serif text-base font-bold text-white mb-1 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#ff5fac]" />
                            Ganti Foto Profil (Avatar)
                          </h4>
                          <p className="text-xs text-gray-400 mb-6">
                            Unggah foto baru dari komputer Anda atau masukkan tautan URL gambar.
                          </p>

                          <div className="flex flex-col sm:flex-row items-center gap-6">
                            {/* Preview */}
                            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#ff5fac] shadow-[0_0_20px_rgba(255,95,172,0.4)] shrink-0 bg-[#0d0c12]">
                              <img
                                src={avatarPreview}
                                alt="Preview Avatar"
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Controls */}
                            <div className="flex-1 space-y-3 w-full">
                              <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                                  Unggah File Gambar
                                </label>
                                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5fac]/20 to-[#d8ac6a]/20 border border-[#ff5fac]/40 text-xs font-semibold text-white hover:opacity-90 cursor-pointer transition-all">
                                  <Upload className="w-4 h-4 text-[#ff5fac]" />
                                  <span>{isCompressing ? 'Memproses...' : 'Pilih File Gambar'}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                  />
                                </label>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                                  Atau Gunakan Tautan URL Gambar
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="url"
                                    value={avatarUrlInput}
                                    onChange={(e) => setAvatarUrlInput(e.target.value)}
                                    placeholder="https://images.unsplash.com/..."
                                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#0e0d16] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5fac]"
                                  />
                                  <button
                                    onClick={handleApplyAvatarUrl}
                                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                                  >
                                    Terapkan
                                  </button>
                                </div>
                              </div>

                              <button
                                onClick={handleResetAvatar}
                                className="text-[11px] text-gray-400 hover:text-rose-400 underline"
                              >
                                Kembalikan ke foto bawaan
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Section B: Edit Identitas & Teks Profil */}
                        <div className="p-6 rounded-2xl bg-[#14121e] border border-white/10">
                          <h4 className="font-serif text-base font-bold text-white mb-1">
                            Sunting Identitas & Narasi Profil
                          </h4>
                          <p className="text-xs text-gray-400 mb-6">
                            Perubahan pada kolom di bawah akan langsung muncul di halaman utama portofolio.
                          </p>

                          <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">
                                  Nama Lengkap
                                </label>
                                <input
                                  type="text"
                                  value={profileData.name}
                                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d16] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ff5fac]"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">
                                  Nama Panggilan / Brand
                                </label>
                                <input
                                  type="text"
                                  value={profileData.shortName}
                                  onChange={(e) => setProfileData({ ...profileData, shortName: e.target.value })}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d16] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ff5fac]"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">
                                  Nomor WhatsApp / Telp
                                </label>
                                <input
                                  type="text"
                                  value={profileData.phone}
                                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d16] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ff5fac]"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">
                                  Email Resmi
                                </label>
                                <input
                                  type="email"
                                  value={profileData.email}
                                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d16] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ff5fac]"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">
                                  Instagram Username
                                </label>
                                <input
                                  type="text"
                                  value={profileData.instagram}
                                  onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d16] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ff5fac]"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-gray-300 mb-1">
                                Narasi Profil Profesional (Bio)
                              </label>
                              <textarea
                                rows={4}
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d16] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ff5fac] resize-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-gray-300 mb-1">
                                Role Typewriter (Pisahkan dengan koma)
                              </label>
                              <input
                                type="text"
                                value={profileData.typewriterRoles.join(', ')}
                                onChange={(e) => {
                                  const roles = e.target.value.split(',').map((r) => r.trim()).filter(Boolean);
                                  setProfileData({ ...profileData, typewriterRoles: roles });
                                }}
                                placeholder="Business Enthusiast, Aspiring Entrepreneur..."
                                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d16] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ff5fac]"
                              />
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <button
                                type="button"
                                onClick={handleResetAllProfile}
                                className="text-xs text-gray-400 hover:text-rose-400 underline"
                              >
                                Kembalikan ke bawaan CV
                              </button>

                              <button
                                type="submit"
                                className="px-6 py-2.5 rounded-xl btn-primary-glow text-black font-bold text-xs uppercase tracking-wider"
                              >
                                Simpan Perubahan Profil
                              </button>
                            </div>
                          </form>
                        </div>

                      </div>
                    )}

                    {/* ======================================================= */}
                    {/* TAB 3: INFORMASI & KEAMANAN                             */}
                    {/* ======================================================= */}
                    {activeTab === 'security' && (
                      <div className="space-y-6 max-w-xl">
                        <div className="p-6 rounded-2xl bg-[#14121e] border border-white/10">
                          <h4 className="font-serif text-base font-bold text-white mb-2">
                            Informasi Akses Admin
                          </h4>
                          <p className="text-xs text-gray-400 leading-relaxed mb-4">
                            Admin Panel ini tersimpan secara lokal dan aman di browser Anda menggunakan localStorage. PIN akses default adalah:
                          </p>

                          <div className="p-3 rounded-xl bg-[#0b0a11] border border-white/10 inline-block font-mono text-sm text-[#ff5fac] font-bold">
                            PIN Default: 1234
                          </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#14121e] border border-white/10">
                          <h4 className="font-serif text-base font-bold text-white mb-2">
                            Status Penyimpanan
                          </h4>
                          <div className="space-y-2 text-xs text-gray-300">
                            <div className="flex justify-between py-1 border-b border-white/5">
                              <span>Total Pesan Tersimpan:</span>
                              <span className="font-bold text-white">{messages.length} Pesan</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-white/5">
                              <span>Pesan Belum Dibaca:</span>
                              <span className="font-bold text-[#ff5fac]">{unreadCount} Pesan</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span>Kustomisasi Profil Aktif:</span>
                              <span className="font-bold text-emerald-400">Ya (Otomatis Tersinkron)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
