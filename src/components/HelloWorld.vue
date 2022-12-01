<template>
  <v-container>
      <v-facebook-login app-id="687646526313011"></v-facebook-login>
  </v-container>
</template>

<script>
import VFacebookLogin from 'vue-facebook-login-component'
  export default {
    name: 'HelloWorld',
    components:{
      VFacebookLogin
    },

    data: () => ({

    }),
  }
</script>
