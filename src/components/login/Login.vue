<template>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex offset-xs3>
                <v-card max-width=500 color="#373740">
                    <v-card-title class="white--text">
                        <div>
                            Enter your stuff,
                            <div style="color: #1eb980;">
                                 Jacon!
                            </div>
                        </div>
                    </v-card-title>
                    <v-form pa-3>
                        <v-text-field outlined clearable color="#ff6859" class="ml-3 mr-3" v-model="email" label="Email" required dark></v-text-field>
                        <v-text-field v-if="showregister" v-model="nickname" outlined color="#ff6859" class="ml-3 mr-3" label="Nickname" required dark></v-text-field>
                        <v-text-field @keyup.enter="loginPressed()" clearable :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showpassword ? 'text' : 'password'" @click:append="showpassword = !showpassword" outlined color="#ff6859" class="ml-3 mr-3" v-model="password" label="Password" required dark></v-text-field>
                        <v-text-field @keyup.enter="registerPressed()" v-if="showregister" v-model="confirmpassword" clearable :append-icon="showconfirmpassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showconfirmpassword ? 'text' : 'password'" @click:append="showconfirmpassword = !showconfirmpassword" outlined color="#ff6859" class="ml-3 mr-3" label="Confirm Password" required dark></v-text-field>
                    </v-form>
                    <v-col>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-btn v-if="showregister == false" v-on:click="this.loginPressed" :loading="this.loginbuttonspin" class="mb-4" rounded outlined color="#1eb980">This is me submit button</v-btn>
                            <v-btn v-if="showregister == true" v-on:click="this.registerPressed" :loading="this.registerbuttonspin" class="mb-4" rounded outlined color="#1eb980">This is me register button</v-btn>
                            <v-spacer></v-spacer>
                        </v-row>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-btn class="mb-2" v-on:click="showregister = !showregister" rounded outlined color="#b15dff">Create an account!</v-btn>
                            <v-spacer></v-spacer>
                        </v-row>
                    </v-col>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog v-model="showwrongpassword" max-width="580">
            <v-card color="#27272F" light outlined dark>
                <v-card-title class="headline justify-center">Oops! Looks like your passwords didn't match 😔</v-card-title>

                <v-card-actions class="justify-center">
                    <v-btn rounded outlined color="#ff6859" text @click="showwrongpassword = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
/* eslint-disable */
    import firebase from "firebase";
    export default {
        data () {
            return {
                showpassword: false,
                showconfirmpassword: false,
                showregister: false,
                showwrongpassword: false,
                loginbuttonspin: false,
                registerbuttonspin: false,
                email: "",
                nickname: "",
                password: "",
                confirmpassword: "",
            }
        },
        methods: {
            loginPressed: async function() {
                this.loginbuttonspin = true;
                await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.push('home')
                })
                .catch(err => {
                    alert('Something went wrong 😔\n', err) 
                    this.loginbuttonspin = false;
                })
            },
            registerPressed: async function() {
                if(this.checkRegister()){
                    this.registerbuttonspin = true;
                    await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(data => {
                        data.user.updateProfile({
                            displayName: this.nickname
                        })
                        this.loginPressed()
                    })
                    .catch(err => {
                        alert('Something went wrong 😔\n', err)
                    })
                }else{
                    this.showwrongpassword = true;
                }
            },
            checkRegister: function() {
                if(this.password == this.confirmpassword){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style scoped>

.v-card__text, .v-card__title {
    word-break: normal;
}

</style>