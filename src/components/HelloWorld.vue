<template>
  <v-container>
      <!-- <v-facebook-login app-id="687646526313011"></v-facebook-login> -->
      <v-facebook-login v-model="model" @sdk-init="handleSdkInit" app-id="687646526313011" @login="ceklogin" @logout="cekLogout"/>
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
      // console.log(FB,"FB");
      // console.log(scope,"SCOPE");
      this.FB = FB
      this.scope = scope
    },
    ceklogin(data){
      console.log(data,"datalogin");
    },
    cekLogout(data){
      console.log(data,"datallog");
    }
  },
  }
</script>
