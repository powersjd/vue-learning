<template>
    <v-app style="background: #33333D">
        <v-card tile>
            <AppNavigation></AppNavigation>
        </v-card>
        <v-content transition="slide-x-transition">
        <router-view />
        </v-content>
        <v-card tile>
            <Footer></Footer>
        </v-card>
    </v-app>
</template>

<script>
import AppNavigation from "@/components/topbottom/AppNavigation.vue";
import Footer from "@/components/topbottom/Footer.vue";
/* eslint-disable */
export default {
  name: "App",
  components: {
    AppNavigation,
    Footer
  }
};
</script>
