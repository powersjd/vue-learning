<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-data-table :loading="dumpButtonLoading" loading-text="Loading... Please Wait" :headers="headers" :items="userdata" :items-per-page="5" dark class="elevation-1 mb-2" @click:row="handleRowClick"></v-data-table>
                <v-layout row>
                    <v-spacer></v-spacer>
                    <v-btn :loading="dumpButtonLoading" rounded outlined color="#72deff" v-on:click="this.getAllUsers">Click me to dump users</v-btn>
                    <v-btn v-on:click="this.getToken">Get Token</v-btn>
                    <v-spacer></v-spacer>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-dialog v-model="userDialog" max-width="800">
            <v-card dark outlined>
                <v-card-title class="headline justify-center">{{ this.currentNickname }}</v-card-title>
                <v-card-text>
                    <strong>Nickname: </strong>{{ this.currentNickname }}
                    <v-spacer></v-spacer>
                    <strong>Email: </strong>{{ this.currentEmail }}
                    <v-spacer></v-spacer>
                    <strong>Admin: </strong>{{ this.currentAdmin }} 
                    <v-spacer></v-spacer>
                    <strong>Moderator: </strong>{{ this.currentMod }}
                    <v-spacer></v-spacer>
                    <strong>User: </strong>{{ this.currentUser }}
                    <v-spacer></v-spacer>
                    <v-layout column>
                        <v-checkbox v-model="adminCheckbox" :label="`Set Admin: ${adminCheckbox.toString()}`"></v-checkbox>
                        <v-checkbox v-model="modCheckbox" :label="`Set Moderator: ${modCheckbox.toString()}`"></v-checkbox>
                        <v-checkbox v-model="userCheckbox" :label="`Set User: ${userCheckbox.toString()}`"></v-checkbox>
                    </v-layout>
                    <v-spacer></v-spacer>
                    <v-layout row>
                        <v-spacer></v-spacer>
                        <v-btn rounded outlined color="#72deff" v-on:click="hideDialog">Close</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn :loading="updateButtonLoading" rounded outlined color="#1eb980" v-on:click="updateUser">Update!</v-btn>
                        <v-spacer></v-spacer>
                    </v-layout>
                    
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';

export default {
    name: "UserManagement",
    data() {
        return {
            headers : [
                { text: 'User Nickname', align: 'start', value: 'nickname' },
                { text: 'User Email', value: 'email' },
                { text: 'Admin', value: 'admin' },
                { text: 'Moderator', value: 'moderator' },
                { text: 'User', value: 'user' }
            ],
            userdata : [],
            userDialog : false,
            currentEmail: "",
            currentNickname: "",
            currentAdmin: "",
            currentMod: "",
            currentUser: "",
            adminCheckbox: "",
            modCheckbox: "",
            userCheckbox: "",
            dumpButtonLoading: false,
            updateButtonLoading: false,
        }
    },
    methods: {
        getToken: function() {
            console.log(firebase.auth().currentUser)
        },
        handleRowClick: function(value) {
            this.userDialog = true
            this.currentEmail = value.email
            this.currentNickname = value.nickname
            this.currentAdmin = value.admin
            this.currentMod = value.moderator
            this.currentUser = value.user
            if(this.currentAdmin === "false"){
                this.adminCheckbox = false
            }else{
                this.adminCheckbox = true
            }
            if(this.currentMod === "false"){
                this.modCheckbox = false
            }else{
                this.modCheckbox = true
            }
            if(this.currentUser === "false"){
                this.userCheckbox = false
            }else{
                this.userCheckbox = true
            }
        },
        hideDialog: function() {
            this.userDialog = false
        },
        updateUser: function() {
            this.updateButtonLoading = true
            axios.post(`http://localhost:8081/UpdateClaims?email=${this.currentEmail}&admin=${this.adminCheckbox}&moderator=${this.modCheckbox}&user=${this.userCheckbox}`)
            .then(() => {
                this.getAllUsers()
                this.hideDialog()
                this.updateButtonLoading = false
            })
        },
        getAllUsers: function() {
            this.dumpButtonLoading = true
            this.userdata = []
            axios.get('http://localhost:8081/GetAllUsers')
            .then(data => {
                let users = data.data.users
                for(let i = 0; i < users.length; i += 1) {
                    this.userdata.push({ 
                        nickname : users[i].displayName,
                        email : users[i].email,
                        admin : users[i].customClaims.admin,
                        moderator : users[i].customClaims.moderator,
                        user : users[i].customClaims.user
                    })
                }
                this.dumpButtonLoading = false
            })
        }
    }
}
</script>