<template>
    <v-container v-if="user.loggedIn">
        <v-flex>
            <v-layout column>
                <v-card>
                    <v-card-title class="justify-center">Test an image!</v-card-title>
                    <v-card-text class="justify-center">{{this.adultresult}}</v-card-text>
                    <v-card-text class="justify-center">{{this.spoofresult}}</v-card-text>
                    <v-card-text class="justify-center">{{this.medicalresult}}</v-card-text>
                    <v-card-text class="justify-center">{{this.violenceresult}}</v-card-text>
                    <v-card-text class="justify-center">{{this.racyresult}}</v-card-text>
                    <v-layout class="justify-center">
                        <input type="file" @change="this.prepareImage" accept="image/*">
                        <v-btn outlined rounded color="#72deff" v-on:click="this.onUpload">Upload Image</v-btn>
                    </v-layout>
                </v-card>

            </v-layout>
        </v-flex>
    </v-container>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import { mapGetters } from "vuex";

export default {
    name: 'SafeSearch',
    data() {
        return {
            imageData: null,
            adultresult: "Adult Result: ",
            spoofresult: "Spoof Result: ",
            medicalresult: "Medical Result: ",
            violenceresult: "Violence Result: ",
            racyresult: "Racy Result: ",
            imageresults: ""
        }
    },
    methods: {
        prepareImage: function(event) {
            this.imageData = event.target.files[0];
        },
        async onUpload() {
            var file = null;
            var storageRef = firebase.storage().ref();
            var imageDirectoryRef = storageRef.child('images/' + this.imageData.name)
            file = this.imageData;

            await imageDirectoryRef.put(file)
            .then(function(snapshot) {
                console.log('File uploaded', snapshot);
            })

            await axios.get('http://localhost:8081/safeimage?image='+this.imageData.name)
            .then(res => (
                console.log(res),
                this.adultresult += res.data.Adult,
                this.spoofresult += res.data.Spoof,
                this.medicalresult += res.data.Medical,
                this.violenceresult += res.data.Violence,
                this.racyresult += res.data.Racy
            ))
        }
    },
    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
        user: "user"
        })
    }
}
</script>