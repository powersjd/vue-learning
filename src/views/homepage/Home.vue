<template>
    <div v-if="user.loggedIn">
        <Home></Home>
    </div>
    <div v-else>
        <Unauthorized></Unauthorized>
    </div>
</template>

<script>
// @ is an alias to /src
import Home from "@/components/homepage/Home.vue";
import Unauthorized from "@/components/errors/Unauthorized.vue";
import { mapGetters } from "vuex";

export default {
    name: "home",
    components: {
        Home,
        Unauthorized
    },
    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
        user: "user"
        })
    }
};
</script>
