export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getUserName = state => state.auth.user.name;
export const getUserEmail = state => state.auth.user.email;
export const getAuthIsLoading = state => state.auth.isLoading;
export const getAuthError = state => state.auth.error;
