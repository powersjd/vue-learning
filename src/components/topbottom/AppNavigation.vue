<template>
    <v-toolbar dense short color="#27272F">
        <v-toolbar-title class="grey--text">
            Cool stuff happens here
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title v-if="user.loggedIn" class="grey--text">Hello, {{ user.data.displayName }}</v-toolbar-title>
        <v-btn v-if="user.loggedIn" v-on:click="this.logout" icon color="grey">
            <v-icon class="material-icons">login</v-icon>
        </v-btn>
        <v-btn icon color="grey">
            <v-icon v-on:click="this.gohome" class="material-icons">home</v-icon>
        </v-btn>
        <v-btn icon color="grey">
            <v-icon v-on:click="this.gologin" class="material-icons">help_outline</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
    name: "AppNavigation",
    data() {
        return {
            
        };
    },
    methods: {
        logout: async function() {
            firebase.auth().signOut()
            .then(() => {
                this.$router.replace('/');
            })
        },
        gohome: function() {
            this.$router.push('home')
        },
        gologin: function () {
            this.$router.push('/');
        }
    },
    computed: {
        ...mapGetters({
            user: "user"
        })
    }
};
</script>
