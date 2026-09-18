import { personalData } from '../data/portfolioData';

export interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  topic?: string;
  message: string;
  is_read: boolean;
}

export interface CustomProfile {
  name: string;
  shortName: string;
  title: string;
  phone: string;
  email: string;
  instagram: string;
  location: string;
  bio: string;
  avatarUrl?: string;
  typewriterRoles: string[];
}

const STORAGE_MESSAGES_KEY = 'puteri_portfolio_messages';
const STORAGE_PROFILE_KEY = 'puteri_portfolio_profile';
const STORAGE_AVATAR_KEY = 'puteri_custom_avatar';

/* -------------------------------------------------------------------------- */
/* Messages Management                                                        */
/* -------------------------------------------------------------------------- */
export const getStoredMessages = (): ContactMessage[] => {
  try {
    const data = localStorage.getItem(STORAGE_MESSAGES_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load messages from localStorage:', err);
    return [];
  }
};

export const saveContactMessage = (msg: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>): ContactMessage => {
  const current = getStoredMessages();
  const newMessage: ContactMessage = {
    ...msg,
    id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    created_at: new Date().toISOString(),
    is_read: false
  };

  const updated = [newMessage, ...current];
  localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('messages-updated', { detail: updated }));
  return newMessage;
};

export const markMessageAsRead = (id: string): void => {
  const current = getStoredMessages();
  const updated = current.map((m) => (m.id === id ? { ...m, is_read: true } : m));
  localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('messages-updated', { detail: updated }));
};

export const deleteContactMessage = (id: string): void => {
  const current = getStoredMessages();
  const updated = current.filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('messages-updated', { detail: updated }));
};

/* -------------------------------------------------------------------------- */
/* Profile & Avatar Management                                                */
/* -------------------------------------------------------------------------- */
export const getCustomProfile = (): CustomProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_PROFILE_KEY);
    if (raw) {
      return { ...personalData, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('Failed to read custom profile:', err);
  }
  return { ...personalData };
};

export const saveCustomProfile = (profile: Partial<CustomProfile>): void => {
  const current = getCustomProfile();
  const updated = { ...current, ...profile };
  localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('profile-updated', { detail: updated }));
};

export const resetCustomProfile = (): void => {
  localStorage.removeItem(STORAGE_PROFILE_KEY);
  window.dispatchEvent(new CustomEvent('profile-updated', { detail: personalData }));
};

export const getCustomAvatar = (): string | null => {
  return localStorage.getItem(STORAGE_AVATAR_KEY);
};

export const saveCustomAvatar = (avatarDataUrl: string): void => {
  localStorage.setItem(STORAGE_AVATAR_KEY, avatarDataUrl);
  window.dispatchEvent(new CustomEvent('avatar-updated', { detail: avatarDataUrl }));
};

export const resetCustomAvatar = (): void => {
  localStorage.removeItem(STORAGE_AVATAR_KEY);
  window.dispatchEvent(new CustomEvent('avatar-updated', { detail: null }));
};

/* -------------------------------------------------------------------------- */
/* Image Compression Utility                                                 */
/* -------------------------------------------------------------------------- */
export const compressImage = (
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.85
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
};
