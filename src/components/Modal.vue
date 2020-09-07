<template>
  <v-card>
    <v-card-text>¿Estas seguro de que quieres eliminar este elemento?</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="dialog = false">NO</v-btn>
      <v-btn color="green darken-1" text @click="dialog = false">SI</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
  name: "Modal",
};
</script>