<template>
  <div>
    <v-toolbar>
      <v-app-bar-nav-icon>
        <v-dialog v-model="modalSalir" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon>
              <v-icon v-on="on" v-bind="attrs">mdi-close</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">Salir</v-card-title>
            <v-card-text>¿Estas seguro de salir sin guardar los cambios?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="modalSalir = false">NO</v-btn>
              <v-btn color="primary" text>
                <router-link to="/cuentas">SI</router-link>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app-bar-nav-icon>

      <v-toolbar-title>Editar cuenta</v-toolbar-title>
      <v-spacer></v-spacer>

      <!--Ventana modal para salir------------>
      <v-dialog v-model="modalEliminar" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon>
            <v-icon v-on="on" v-bind="attrs">mdi-delete</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Salir</v-card-title>
          <v-card-text>¿Estas seguro de salir sin guardar los cambios?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="modalEliminar = false">NO</v-btn>
            <v-btn color="primary" text @click="eliminarCuenta">SI</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--Fin Ventana modal para salir---------->

      <v-btn icon>
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>



<script>
export default {
  props: {
    source: String,
  },

  name: "CuentaEditar",
  data() {
    return {
      modalSalir: false,
      modalEliminar: false,
      cuentas: [""],
      nuevaCuenta: {
        icon: "mdi-wallet",
        nombre: "Cuenta corriente",
        institucion: "Banco Estado",
        tipo: "Debito con sobregiro",
        color: "blue",
        moneda: "CLP",
        numero: "120-004-875",
      },
      categorias: ["viajes", "casa", "salud", "automovil"],
      moneda: ["CLP", "USD"],
    };
  },
  methods: {
    editarCuenta: function (index) {
      this.cuentas[index].estado = true;
      localStorage.setItem("cuentas-vue", JSON.stringify(this.cuentas));
    },
    eliminarCuenta: function (index) {
      this.cuentas.splice(index, 1);
      localStorage.setItem("cuentas-vue", JSON.stringify(this.cuentas));
      this.modalEliminar = false;
    },
  },
  created: function () {
    let datosDB = JSON.parse(localStorage.getItem("cuentas-vue"));
    if (datosDB === null) {
      this.cuentas = [];
    } else {
      this.cuentas = datosDB;
    }
  },
};
</script>