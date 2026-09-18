import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

const LOCAL_STORAGE_CONFIG_KEY = 'puteri_supabase_config';
const LOCAL_STORAGE_MESSAGES_KEY = 'puteri_portfolio_messages';
export const AVATAR_STORAGE_KEY = 'puteri_custom_avatar';
export const PROFILE_STORAGE_KEY = 'puteri_custom_profile';

let supabaseInstance: SupabaseClient | null = null;

// Retrieve credentials from environment or localStorage
export const getSupabaseConfig = () => {
  const localConfigStr = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
  if (localConfigStr) {
    try {
      const parsed = JSON.parse(localConfigStr);
      if (parsed.url && parsed.key) {
        return { url: parsed.url, key: parsed.key, source: 'localStorage' };
      }
    } catch {
      // ignore
    }
  }

  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  if (envUrl && envKey) {
    return { url: envUrl, key: envKey, source: 'env' };
  }

  return { url: '', key: '', source: 'none' };
};

export const saveSupabaseConfig = (url: string, key: string) => {
  localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify({ url: url.trim(), key: key.trim() }));
  supabaseInstance = null; // reset client to reinitialize
};

export const clearSupabaseConfig = () => {
  localStorage.removeItem(LOCAL_STORAGE_CONFIG_KEY);
  supabaseInstance = null;
};

export const getSupabaseClient = (): SupabaseClient | null => {
  if (supabaseInstance) return supabaseInstance;

  const { url, key } = getSupabaseConfig();
  if (url && key) {
    try {
      supabaseInstance = createClient(url, key);
      return supabaseInstance;
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return null;
};

export const isSupabaseConnected = (): boolean => {
  const { url, key } = getSupabaseConfig();
  return Boolean(url && key);
};

/* -------------------------------------------------------------------------- */
/* Remote Sync for Profile & Avatar (Makes photo appear for all visitors)     */
/* -------------------------------------------------------------------------- */
export const syncRemoteSettings = async (): Promise<void> => {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    const { data, error } = await client.from('portfolio_settings').select('*');
    if (!error && data && data.length > 0) {
      for (const item of data) {
        if (item.key === 'avatar_url' && item.value) {
          localStorage.setItem(AVATAR_STORAGE_KEY, item.value);
          window.dispatchEvent(new CustomEvent('avatar-updated', { detail: item.value }));
        } else if (item.key === 'profile_data' && item.value) {
          localStorage.setItem(PROFILE_STORAGE_KEY, item.value);
          try {
            const parsed = JSON.parse(item.value);
            window.dispatchEvent(new CustomEvent('profile-updated', { detail: parsed }));
          } catch {
            // ignore
          }
        }
      }
    }
  } catch (err) {
    console.warn('Could not sync remote portfolio settings from Supabase:', err);
  }
};

export const getCustomAvatar = (): string | null => {
  return localStorage.getItem(AVATAR_STORAGE_KEY);
};

export const saveCustomAvatar = async (avatarDataUrl: string): Promise<void> => {
  localStorage.setItem(AVATAR_STORAGE_KEY, avatarDataUrl);
  window.dispatchEvent(new CustomEvent('avatar-updated', { detail: avatarDataUrl }));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('portfolio_settings').upsert({
        key: 'avatar_url',
        value: avatarDataUrl,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to sync avatar to Supabase database:', err);
    }
  }
};

export const resetCustomAvatar = async (): Promise<void> => {
  localStorage.removeItem(AVATAR_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('avatar-updated', { detail: null }));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('portfolio_settings').delete().eq('key', 'avatar_url');
    } catch (err) {
      console.error('Failed to reset avatar in Supabase:', err);
    }
  }
};

export const getCustomProfile = (): CustomProfile | null => {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveCustomProfileToDB = async (profile: CustomProfile): Promise<void> => {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new CustomEvent('profile-updated', { detail: profile }));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('portfolio_settings').upsert({
        key: 'profile_data',
        value: JSON.stringify(profile),
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to sync profile data to Supabase:', err);
    }
  }
};

/* -------------------------------------------------------------------------- */
/* Contact Messages Sync (Database + LocalStorage fallback)                   */
/* -------------------------------------------------------------------------- */
export const fetchContactMessages = async (): Promise<ContactMessage[]> => {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as ContactMessage[];
      }
    } catch (err) {
      console.warn('Failed fetching from Supabase, using local fallback:', err);
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const sendContactMessage = async (data: {
  name: string;
  email: string;
  topic?: string;
  message: string;
}): Promise<{ success: boolean; storage: 'supabase' | 'local' }> => {
  const timestamp = new Date().toISOString();
  const localId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
  const newMsg: ContactMessage = {
    id: localId,
    created_at: timestamp,
    name: data.name,
    email: data.email,
    topic: data.topic || 'General',
    message: data.message,
    is_read: false,
  };

  // Always store local copy
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
    const list: ContactMessage[] = raw ? JSON.parse(raw) : [];
    localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify([newMsg, ...list]));
    window.dispatchEvent(new CustomEvent('messages-updated', { detail: [newMsg, ...list] }));
  } catch {
    // ignore
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client.from('contact_messages').insert([
        {
          name: data.name,
          email: data.email,
          topic: data.topic || 'General',
          message: data.message,
          is_read: false,
        },
      ]);

      if (!error) {
        return { success: true, storage: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase insert error, saved locally:', err);
    }
  }

  return { success: true, storage: 'local' };
};

export const markMessageAsRead = async (id: string): Promise<void> => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
    if (raw) {
      const list: ContactMessage[] = JSON.parse(raw);
      const updated = list.map((m) => (m.id === id ? { ...m, is_read: true } : m));
      localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('messages-updated', { detail: updated }));
    }
  } catch {
    // ignore
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('contact_messages').update({ is_read: true }).eq('id', id);
    } catch (err) {
      console.warn('Supabase mark read error:', err);
    }
  }
};

export const deleteContactMessage = async (id: string): Promise<void> => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
    if (raw) {
      const list: ContactMessage[] = JSON.parse(raw);
      const updated = list.filter((m) => m.id !== id);
      localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('messages-updated', { detail: updated }));
    }
  } catch {
    // ignore
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('contact_messages').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete message error:', err);
    }
  }
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
