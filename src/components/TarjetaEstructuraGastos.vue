<template>
  <div>
    <v-card class="mx-auto my-1" width="96%">
      <!-- <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Estructura de Gastos</v-list-item-title>
            <v-card-title primary-title>{{hola}}</v-card-title>
           
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn text color="secondary" outlined>
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </v-list-item-icon>
      </v-list-item>-->

      <!--  <v-list>
        <v-list-item v-for="(cuenta, i) in saldoCuentas" :key="i">
          <v-list-item-content>
            <v-list-item-title>{{ story.title }}</v-list-item-title>
            <v-list-item-subtitle>{{story.author}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-star</v-icon>
            {{story.upvoted}}
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-text-field v-model="searchTerm" label="Filter by author" id="id"></v-text-field>-->

      <v-list>
        <v-list-item v-for="(cuenta, i) in filtrarGastosCategorias" :key="i">
          <v-list-item-content>
            <v-list-item-title>{{ cuenta.nombre }}</v-list-item-title>
            <v-list-item-subtitle>{{cuenta.tipo}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action color="cuenta.color">
            <v-icon>mdi-cash-usd</v-icon>
            {{cuenta.saldo}}
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-text-field v-model="searchTerm" label="Filter by author" id="id"></v-text-field>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TarjetaCuentaLista",
  data: () => ({
    hola: 1,
    cuentas: [
      { nombre: "Cuenta RUT", saldo: "50", color: "teal", tipo: "debito" },
      {
        nombre: "Cuenta corriente",
        saldo: "90",
        lineaCreditoAutorizada: "1.000.000",
        lineaCreditoUsada: "0",
        color: "orange",
        tipo: "debito con sobregiro",
      },
      { nombre: "Cuenta Ahorro ", saldo: "70", color: "red", tipo: "ahorro" },
      {
        nombre: "Banco Estado Mastercard ",
        lineaCreditoAutorizada: "700.000",
        lineaCreditoUsada: "200.000",
        color: "blue",
        tipo: "credito",
      },
      {
        nombre: "CMR visa",
        color: "green",
        tipo: "credito",
        lineaCreditoAutorizada: "700.000",
        lineaCreditoUsada: "200.000",
      },
      { nombre: "Efectivo", saldo: "5", color: "cyan", tipo: "efectivo" },
      { nombre: "MACH", saldo: "3", color: "violet", tipo: "debito" },
    ],
    stories: [
      { title: "Once upon a time in Berlin", author: "Alex", upvoted: 10 },
      { title: "Once upon a time in Milan", author: "Alex", upvoted: 11 },
      { title: "The sky is the limit", author: "Tobi", upvoted: 100 },
      { title: "Until the end", author: "Tobi", upvoted: 9 },
      { title: "Once upon a time in Berlin", author: "Patrick", upvoted: 10 },
      { title: "Once upon a time in Milan", author: "Patrick", upvoted: 11 },
      { title: "The sky is the limit", author: "Patrick", upvoted: 101 },
      { title: "Until the end", author: "Tobi", upvoted: 9 },
    ],
    searchTerm: "",
  }),
  computed: {
    filteredStories() {
      let filteredStories = this.stories.filter((story) => {
        return story.author.includes(this.searchTerm);
      });
      let orderedStories = filteredStories.sort((a, b) => {
        return b.upvoted - a.upvoted;
      });
      return orderedStories;
    },
    filtrarGastosCategorias() {
      let saldoCuenta = this.cuentas.filter((cuenta) => {
        return cuenta.tipo === "debito" || cuenta.tipo === "efectivo";
      });
      return saldoCuenta;
    },
  },
};
</script>