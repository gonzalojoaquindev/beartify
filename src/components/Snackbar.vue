<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="mensaje">
      {{ text }}
      {{mensaje}}
      <template v-slot:action="{ mensaje}">
        <v-btn color="pink" text v-bind="mensaje" @click="accionNotificar">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<!--<script>
export default {
  data(){
    return{
      snackbar: snackbar
    }
  },
  name: "Snackbar",
  props: ["snackbar", "text"],
};
</script>
 -->

 <script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["mensaje"]),
  },
  data: () => ({
    timeout: 500,
  }),
  methods: {
    ...mapActions(["accionNotificar"]),
  },
  props: ["text", "estado"],
};
</script>