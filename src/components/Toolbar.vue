<template>
  <v-toolbar>
    <v-btn icon to="/">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-toolbar-title>{{titulo}}</v-toolbar-title>

    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  props: ["titulo"],
};
</script>