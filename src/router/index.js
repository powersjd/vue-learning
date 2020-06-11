import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/Login.vue";
import Home from "../views/homepage/Home.vue";
import SafeSearch from "../components/testingpages/safesearch/Safesearch.vue";
import UserManagement from "../components/testingpages/usermanagement/UserManagement.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: "/safesearch",
        name: "Safe Search",
        component: SafeSearch
    },
    {
        path: "/usermanagement",
        name: "User Management",
        component: UserManagement
    }


];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
