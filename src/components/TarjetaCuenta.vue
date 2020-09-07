<template>
  <v-row>
    <v-card width="96%" class="mx-auto mb-1" v-for="item in cuentas" :key="item.title">
      <v-list>
        <v-list-item :to="{name: 'CuentaEditar', params:{id: item.id}}">
          <v-list-item-avatar rounded="rounded" size="50">
            <v-icon :class="item.color" v-text="item.icono" size="30"></v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.nombre"></v-list-item-title>
            <v-list-item-subtitle v-text="item.institucion"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="item.tipo"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-row>
</template>


<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TarjetaCuenta",
  created() {
    this.getCuentas();
  },
  methods: {
    ...mapActions("cuentas", ["getCuentas"]),
  },

  computed: {
    ...mapState("cuentas", ["cuentas"]),
  },
};
</script>