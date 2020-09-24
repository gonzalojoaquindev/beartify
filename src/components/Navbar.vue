<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-avatar>
              <img src="../assets/yo.jpg" alt="John" />
            </v-avatar>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gonzalo Araya</v-list-item-title>
            <v-list-item-subtitle color="secondary">Anthy</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          link
          v-for="(item, index) in links"
          :key="index"
          :to="item.ruta"
        >
          <v-list-item-action>
            <v-icon color="secondary">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.nombre }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-switch v-model="$vuetify.theme.dark" primary label="Dark"></v-switch>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ titulo }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: null,
      links: [
        {
          nombre: "Home",
          icon: "mdi-home",
          color: "secondary",
          ruta: { name: "Home" },
        },
        {
          nombre: "Registros",
          icon: "mdi-format-list-bulleted",
          color: "secondary",
          ruta: { name: "RegistroLeer" },
        },
        {
          nombre: "Categorias",
          icon: "mdi-view-dashboard",
          color: "secondary",
          ruta: { name: "CategoriaLeer" },
        },
        {
          nombre: "Cuentas",
          icon: "mdi-cash-usd",
          color: "secondary",
          ruta: { name: "CuentaLeer" },
        },
        {
          nombre: "Pagos programados",
          icon: "mdi-calendar-clock",
          color: "secondary",
          ruta: { name: "ProgramadoLeer" },
        },
        {
          nombre: "Beneficiados",
          icon: "mdi-account",
          color: "secondary",
          ruta: { name: "BeneficiadoLeer" },
        },
        {
          nombre: "Ajustes",
          icon: "mdi-tune",
          color: "secondary",
          ruta: { name: "Ajustes" },
        },
      ],
    };
  },
  props: ["titulo"],
};
</script>