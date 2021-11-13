import store from "../../store";

export default {
  async isLogged(to, from, next) {
    if (store().state.auth.user) {
      next();
    } else {
      if (localStorage.getItem("token")) {
        next();
      }
      next("/login");
    }
  },
  async logged(to, from, next) {
    if (store().state.auth.user) {
      next("/");
    } else {
      if (localStorage.getItem("token")) {
        next("/");
      } else {
        next();
      }
    }
  },
};
