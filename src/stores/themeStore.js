import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light', // Estado inicial do tema
  }),

  actions: {
    toggleTheme(isDark) {
      this.theme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.theme);
    },

    initializeTheme() {
      // Inicializa o tema baseado no localStorage ou no tema claro
      const savedTheme = localStorage.getItem('theme') || 'light';
      this.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
    },

    saveTheme() {
      // Salva o tema atual no localStorage
      localStorage.setItem('theme', this.theme);
    },
  },

  getters: {
    isDarkTheme: (state) => state.theme === 'dark',
  },
});
