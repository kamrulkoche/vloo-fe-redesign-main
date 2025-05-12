import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export const useUserSettingsStore = create((set) => ({
  userSettings: null,
  setUserSettings: (settings) => set({ userSettings: settings }),
  updateUserSettings: (newSettings) =>
    set((state) => {
      // Get existing user data from localStorage
      const userData = JSON.parse(localStorage.getItem("user") || "{}");

      // Merge new settings with existing user data
      const updatedUserData = {
        ...userData,
        ...newSettings,
      };

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      return { userSettings: newSettings };
    }),
}));
