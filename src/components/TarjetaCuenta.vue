<template>
  <v-row>
    <v-card width="96%" class="mx-auto mb-1" v-for="item in registros" :key="item.title">
      <v-list>
        <v-list-item :to="{name: 'RegistroEditar', params:{id: item.id}}">
          <v-list-item-avatar>
            <v-icon color="orange" :class="[item.iconClass]" v-text="item.icon"></v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.categoria"></v-list-item-title>
            <v-list-item-subtitle v-text="item.cuenta"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-title v-text="item.monto"></v-list-item-title>
            <v-list-item-subtitle v-text="item.fecha"></v-list-item-subtitle>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-row>
</template>


<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TarjetaRegistro",
  created() {
    this.getRegistros();
  },
  methods: {
    ...mapActions(["getRegistros"]),
  },

  //map state toma todo las piezas que tengamos en el state, en este caso estamos importando al array que contiene todos los registros.
  computed: {
    ...mapState(["registros"]),
  },
};
</script>