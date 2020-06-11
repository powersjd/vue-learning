<template>
    <v-container grid-list-lg>
        <v-layout column>
            <v-card dark class="mt-4 mb-2">
                <v-card-title>
                    Welcome!
                </v-card-title>
                <v-card-text>
                    This is an exhuastive list of various resources developed by Jacob Powers for VueJS development.  Most of these services available are dependant on Google's Firebase platform.  Clicking on each button will take you to an example implementation as well as links to their source code that will be hosted on <a href='https://www.github.com/powersjd'>Github</a>.
                </v-card-text>
            </v-card>
            <v-flex class="justify-center" row xs3>
                <v-card dark v-for="card in cardInformation" :key="card.title" class="ml-1 mr-1 mb-2 justify-center" width="350">
                    <v-card-title>
                        {{card.title}}
                    </v-card-title>
                    <v-card-text>
                        {{card.content}}
                    </v-card-text>
                    <v-layout row>
                        <v-spacer></v-spacer>
                        <v-btn v-on:click="gotosafesearch(card.link)" class="mb-4" outlined rounded color="#72deff">Safe Search Testing</v-btn>
                        <v-spacer></v-spacer>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            cardInformation: {
                card1: {
                    title: "Safe Search",
                    content: "Safe search is used to upload an image to Firebase storage, then this image will be inspected by Google Cloud Vision API to check for any obscene content, this will return a json back to the user.",
                    link: "/safesearch"
                },
                card2: {
                    title: "User Management",
                    content: "This is a portal to look into user management of firebase users.  Assign specific roles to each user.",
                    link: "/usermanagement"
                },
                card3: {
                    title: "test3",
                    content: "test3",
                },
                card4: {
                    title: "Test Card 1",
                    content: "test card 1",
                    link: "/safesearch"
                },
                card5: {
                    title: "test card 2",
                    content: "test card 2",
                    link: "/"
                },
                card6: {
                    title: "test3",
                    content: "test3",
                }
            }
        }
    },
    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
        user: "user"
        })
    },
    methods: {
        gotosafesearch: function (link) {
            console.log("Link ", link)
            this.$router.push(link);
        }
    }
};
</script>