<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-data-table :headers="headers" :items="userdata" :items-per-page="5" dark class="elevation-1 mb-2" @click:row="handleRowClick"></v-data-table>
                <v-layout row>
                    <v-spacer></v-spacer>
                    <v-btn rounded outlined color="#72deff" v-on:click="this.getAllUsers">Click me to dump users</v-btn>
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
                    <v-layout row>
                        <v-checkbox v-model="adminCheckbox" :label="`Set Admin: ${adminCheckbox.toString()}`"></v-checkbox>
                        <v-checkbox v-model="modCheckbox" :label="`Set Moderator: ${modCheckbox.toString()}`"></v-checkbox>
                        <v-checkbox v-model="userCheckbox" :label="`Set User: ${userCheckbox.toString()}`"></v-checkbox>
                    </v-layout>
                    <v-spacer></v-spacer>
                    <v-layout row>
                        <v-spacer></v-spacer>
                        <v-btn rounded outlined color="#72deff" v-on:click="hideDialog">Close</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn rounded outlined color="#1eb980" v-on:click="updateUser">Update!</v-btn>
                        <v-spacer></v-spacer>
                    </v-layout>
                    
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';

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
            adminCheckbox: false,
            modCheckbox: false,
            userCheckbox: false,
        }
    },
    methods: {
        handleRowClick: function(value) {
            this.userDialog = true
            this.currentEmail = value.email
            this.currentNickname = value.nickname
            this.currentAdmin = value.admin
            this.currentMod = value.moderator
            this.currentUser = value.user
            this.adminCheckbox = value.admin
            this.modCheckbox = value.moderator
            this.userCheckbox = value.user
        },
        hideDialog: function() {
            this.userDialog = false
        },
        updateUser: function() {
            axios.post(`http://localhost:8081/UpdateClaims?email=${this.currentEmail}&admin=${this.adminCheckbox}&moderator=${this.modCheckbox}&user=${this.userCheckbox}`)
            .then(() => {
                this.getAllUsers()
                this.hideDialog()
            })
        },
        getAllUsers: function() {
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
            })
        }
    }
}
</script>