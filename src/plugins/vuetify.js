import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
import es from "vuetify/es5/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                primary: "#FF9800", //orange500
                primaryVariant: "#F57C00", //orange 700
                secondary: "#03DAC6", // teal200
                secondaryVariant: "#004D40", // teal900
                background: "#FFFFFF",
                surface: "#FFFFFF",
                error: "#B00020",
                onPrimary: "#FFFFFF", //white
                onSecundary: "#000000", //black
                onSurface: "#000000", //black
                onBackground: "#000000", //black
            },
            dark: {
                primary: "#FFCC80", //orange200
                primaryVariant: "#F57C00", //orange 700
                secondary: "#03DAC6", // teal200
                background: "#121212",
                surface: "#121212",
                error: "#CF6679",
                onPrimary: "#000000", //black
                onSecundary: "#000000", //black
                onBackground: "#FFFFFF", //white
                onSurface: "#FFFFFF", //white
            },
        },
    },
    lang: {
        locales: { es },
        current: "es",
    },
});