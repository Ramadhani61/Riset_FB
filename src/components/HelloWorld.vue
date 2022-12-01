<template>
  <v-container>
      <!-- <v-facebook-login app-id="687646526313011"></v-facebook-login> -->
      <v-facebook-login v-model="model" @sdk-init="handleSdkInit" app-id="687646526313011"/>
      <button v-if="scope.logout && model.connected" @click="scope.logout">
        Logout
      </button>
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
      FB: {},
      model: {},
      scope: {},
    }),
  methods: {
    handleSdkInit({ FB, scope }) {
      this.FB = FB
      this.scope = scope
    },
  },
  }
</script>
