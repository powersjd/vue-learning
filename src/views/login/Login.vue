<template>
  <div>
    <Greeting></Greeting>
    <Login></Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Greeting from "@/components/login/Greeting.vue";
import Login from "@/components/login/Login.vue";

export default {
  name: "login",
  components: {
    Greeting,
    Login
  }
};
</script>
