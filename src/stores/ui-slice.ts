// UI store slice for managing global UI state
import { StateCreator } from 'zustand';
import type { AppState } from './index';

export interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  chatOpen: boolean;
  notifications: Notification[];
  isLoading: boolean;
  modal: {
    isOpen: boolean;
    type: string | null;
    data: any;
  };
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  createdAt: number;
}

export interface UIActions {
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleChat: () => void;
  setChatOpen: (open: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setLoading: (loading: boolean) => void;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
}

export interface UISlice {
  ui: UIState;
  uiActions: UIActions;
}

export const createUISlice: StateCreator<
  AppState,
  [],
  [],
  UISlice
> = (set, get) => ({
  ui: {
    theme: 'system',
    sidebarOpen: true,
    chatOpen: true,
    notifications: [],
    isLoading: false,
    modal: {
      isOpen: false,
      type: null,
      data: null,
    },
  },

  uiActions: {
    setTheme: (theme) => {
      set(state => ({
        ui: { ...state.ui, theme }
      }));

      // Persist theme preference
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
      }
    },

    toggleSidebar: () => {
      set(state => ({
        ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen }
      }));
    },

    setSidebarOpen: (open) => {
      set(state => ({
        ui: { ...state.ui, sidebarOpen: open }
      }));
    },

    toggleChat: () => {
      set(state => ({
        ui: { ...state.ui, chatOpen: !state.ui.chatOpen }
      }));
    },

    setChatOpen: (open) => {
      set(state => ({
        ui: { ...state.ui, chatOpen: open }
      }));
    },

    addNotification: (notification) => {
      const id = Date.now().toString();
      const newNotification: Notification = {
        ...notification,
        id,
        createdAt: Date.now(),
      };

      set(state => ({
        ui: {
          ...state.ui,
          notifications: [...state.ui.notifications, newNotification]
        }
      }));

      // Auto-remove notification after duration
      if (notification.duration !== 0) {
        setTimeout(() => {
          get().uiActions.removeNotification(id);
        }, notification.duration || 5000);
      }
    },

    removeNotification: (id) => {
      set(state => ({
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(n => n.id !== id)
        }
      }));
    },

    clearNotifications: () => {
      set(state => ({
        ui: { ...state.ui, notifications: [] }
      }));
    },

    setLoading: (loading) => {
      set(state => ({
        ui: { ...state.ui, isLoading: loading }
      }));
    },

    openModal: (type, data = null) => {
      set(state => ({
        ui: {
          ...state.ui,
          modal: {
            isOpen: true,
            type,
            data,
          }
        }
      }));
    },

    closeModal: () => {
      set(state => ({
        ui: {
          ...state.ui,
          modal: {
            isOpen: false,
            type: null,
            data: null,
          }
        }
      }));
    },
  },
});