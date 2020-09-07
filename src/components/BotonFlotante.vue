
<template>
  <div>
    <v-btn color="colorRojo" absolute bottom right fab>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "BotonFlotante",

  props: ["color"],
};
</script>