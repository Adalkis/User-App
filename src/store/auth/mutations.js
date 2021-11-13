export function setUser(state, user) {
  if (user) {
    localStorage.setItem("token", user.token);
    state.user = user;
  }
}

export function setStatus(state, status) {
  state.status = status ? status : "";
}

export function setLoading(state, loading) {
  state.loading = loading;
}
export function logoutUser(state, logout) {
  state.user = logout;
}
