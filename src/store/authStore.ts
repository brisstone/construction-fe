import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthData {
  email: string;
  companyId?: string;
  _id?: string;
  firstName?: string;
  lastName?: string;
  primaryColor?: string; 
}

interface AuthState {
  accessToken: string | null;
  currentUser: AuthData | null;
  setAccessToken: (token: string | null) => void;
  setCurrentUser: (user: AuthData | null) => void;
  logout: () => void;
  applyUserTheme: () => void;
}

const authStore = createStore<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      currentUser: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => {
        // Reset theme to default when logging out
        document.documentElement.style.setProperty('--primary-color', '#3947CB');
        set({ accessToken: null, currentUser: null });
      },
      // Function to apply the user's theme
      applyUserTheme: () => {
        const { currentUser } = get();
        if (currentUser?.primaryColor) {
          document.documentElement.style.setProperty('--primary-color', currentUser.primaryColor);
        }
      }, 
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useAuthStore = authStore.getState;