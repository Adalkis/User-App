import authApi from "../../api/auth";

export async function login({ commit }, data) {
  commit("setLoading", true);
  await authApi
    .login(data)
    .then((res) => {
      commit("setUser", res.data);
      commit("setStatus", "logged");
      this.$router.push("/");
    })
    .catch((error) => {
      alert(error);
    })
    .finally(() => {
      commit("setLoading", false);
    });
}

export async function logout({ commit }, data) {
  commit("logoutUser", data);
}
