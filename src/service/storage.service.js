const TOKEN_KEY = "JWT_TOKEN";
const THEME = "theme";
export const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export const ThemeService = {
  getTheme() {
    return localStorage.getItem(THEME);
  },
  setTheme(color) {
    localStorage.setItem(THEME, color);
  },
  removeTheme() {
    localStorage.removeItem(THEME);
  },
};
