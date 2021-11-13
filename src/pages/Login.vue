<template>
  <div style="width: 75%" class="loginContainer">
    <div class="q-pa-md flex flex-center">
      <q-card class="my-card" style="width: 40%">
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <p class="loginText">Log in</p>
            <q-input
              filled
              v-model="form.email"
              label="Your email *"
              lazy-rules
              type="email"
              :rules="[
                (val) => (val && val.length > 1) || 'Please type something',
              ]"
            />
            <q-input
              filled
              v-model="form.password"
              label="Your password"
              type="password"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 1) || 'Please type something',
              ]"
            />
            <div class="q-mb-sm">
              <q-btn
                class="full-width"
                label="Login"
                type="submit"
                :loading="isLoading"
                color="primary"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
      spinner: false,
    };
  },
  computed: {
    isLoading() {
      console.log(this.$store.state);
      return this.$store.state.auth.loading;
    },
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      await this.$store.dispatch("auth/login", this.form);
    },
  },
};
</script>
<style  >
html,
body,
#q-app {
  width: 100%;
  direction: ltr;
  width: 100%;
  direction: ltr;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
span.block {
  margin-right: 10px;
}
@media (max-width: 1000px) {
  .loginContainer {
    width: 82%;
  }
  .q-card.my-card {
    width: 100% !important;
  }
  .loginText {
    font-size: 40px;
    font-weight: 600;
    text-align: center;
    font-family: auto;
  }
}
</style>