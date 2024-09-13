import { createStore } from "zustand/vanilla";
import React from "react";

interface ModalConfig {
  component: React.ComponentType<unknown>;
  props?: Record<string, unknown>;
}

interface UIState {
  isSidebarOpen: boolean;
  activeModal: ModalConfig | null;
}

interface UIActions {
  toggleSidebar: () => void;
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
}

export type UIStore = UIState & UIActions;

export const initialState: UIState = {
  isSidebarOpen: true,
  activeModal: null,
};

export const createUiStore = (initState: UIState = initialState) => {
  return createStore<UIStore>()((set) => ({
    ...initState,
    toggleSidebar: () =>
      set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    openModal: (config: ModalConfig) => set({ activeModal: config }),
    closeModal: () => set({ activeModal: null }),
  }));
};
