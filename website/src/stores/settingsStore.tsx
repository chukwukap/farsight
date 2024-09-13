import { createStore } from "zustand/vanilla";

interface SettingsState {
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
  dataRefreshInterval: number;
}

interface SettingsActions {
  setLanguage: (language: string) => void;
  toggleNotification: (type: "email" | "push") => void;
  setDataRefreshInterval: (interval: number) => void;
}

export type SettingsStore = SettingsState & SettingsActions;

export const initialState: SettingsStore = {
  language: "en",
  notifications: {
    email: true,
    push: true,
  },
  dataRefreshInterval: 5 * 60 * 1000, // 5 minutes
  setLanguage: () => {},
  toggleNotification: () => {},
  setDataRefreshInterval: () => {},
};

export const createSettingsStore = (
  initState: SettingsStore = initialState
) => {
  return createStore<SettingsStore>()((set) => ({
    ...initState,
    setLanguage: (language) => set({ language }),
    toggleNotification: (type) =>
      set((state) => ({
        notifications: {
          ...state.notifications,
          [type]: !state.notifications[type],
        },
      })),
    setDataRefreshInterval: (interval) =>
      set({ dataRefreshInterval: interval }),
  }));
};
