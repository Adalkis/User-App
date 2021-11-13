<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="logo">
          Users App
          <q-btn @click="logout()" icon="logout" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.dispatch("auth/logout", null);
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.logo {
  display: flex;
  justify-content: space-between;
}
</style>

