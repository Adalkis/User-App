<template>
  <q-page class="q-pa-lg">
    <div
      class="q-pa-md q-gutter-sm"
      style="display: flex; justify-content: center"
    >
      <q-btn
        label="Create user"
        color="primary"
        @click="createUserModal = true"
      />
    </div>
    <div>
      <q-dialog v-model="createUserModal">
        <q-card style="width: 500px">
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input
                filled
                v-model="form.name"
                label="Name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 1) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="form.year"
                label="Year"
                lazy-rules
                type="number"
                required
                :rules="[
                  (val) =>
                    (val && val.length <= 4) || 'Please use maximum 4 numbers',
                ]"
              />
              <q-input
                filled
                v-model="form.color"
                label="Color"
                lazy-rules
                hint="#98B2D1	"
                :rules="[
                  (val) =>
                    (val && val.length > 1 && val.length <= 10) ||
                    'Please use maximum 10 characteres',
                ]"
              />
              <q-input
                filled
                v-model="form.pantone_value"
                label="Pantone Value"
                lazy-rules
                hint="15-4020"
                :rules="[
                  (val) =>
                    (val && val.length > 1 && val.length <= 20) ||
                    'Please use maximum 10 characteres',
                ]"
              />
              <div style="display: flex; justify-content: center">
                <q-btn
                  class="full-width"
                  label="Create"
                  type="submit"
                  color="primary"
                  :loading="loading"
                >
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-table
        title="Users table"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
      </q-table>
    </div>
  </q-page>
</template>

<script>
import usersApi from "../api/users";
import { ref } from "vue";

export default {
  name: "PageIndex",
  data() {
    return {
      columns: [
        {
          name: "id",
          align: "center",
          label: "ID",
          field: "id",
          sortable: true,
        },
        {
          name: "name",
          label: "Name",
          field: "name",
          sortable: true,
        },
        {
          name: "year",
          label: "Year",
          field: "year",
          sortable: true,
        },
        {
          name: "color",
          label: "Color",
          field: "color",
          sortable: true,
        },
        {
          name: "pantone_value",
          label: "Pantone Value",
          field: "pantone_value",
          sortable: true,
        },
      ],
      rows: [],
      createUserModal: false,
      form: {
        name: "",
        year: "",
        color: "",
        pantone_value: "",
      },
      online: navigator.onLine,
      loading: false,
    };
  },

  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.loading = true;
      usersApi
        .createUser(this.form)
        .then((res) => {
          this.loading = false;
          this.rows.unshift(res.data);
          this.createUserModal = false;
          alert("The user was created");
          this.form = { name: "", year: "", color: "", pantone_value: "" };
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          alert("You are not online, please check your internet connection");
          let userOffline = [];

          if (localStorage.getItem("userOffline")) {
            let currentData = JSON.parse(localStorage.getItem("userOffline"));
            localStorage.setItem(
              "userOffline",
              JSON.stringify([this.form, ...currentData])
            );
          } else {
            userOffline.push(this.form);
            localStorage.setItem("userOffline", JSON.stringify(userOffline));
            console.log(userOffline[0]);
          }
          this.form = { name: "", year: "", color: "", pantone_value: "" };
          this.createUserModal = false;
        });
    },
    updateOnlineStatus(e) {
      const { type } = e;
      this.online = type === "online";
    },
  },
  watch: {
    online(isOnline) {
      if (isOnline) {
        let data = JSON.parse(localStorage.getItem("userOffline"));
        if (data) {
          data.map((userData) => {
            usersApi.createUser(userData).then((res) => {
              this.rows.unshift(res.data);
              this.createUserModal = false;
            });
          });

          data.length > 1
            ? alert("You are now online, the users was created")
            : alert("You are now online, the user was created");
        }
        localStorage.removeItem("userOffline");
      } else {
        alert("You are not online,please check your internet connection");
      }
    },
  },

  async mounted() {
    await usersApi
      .fetchUsers()
      .then((res) => {
        this.rows = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
};
</script>
