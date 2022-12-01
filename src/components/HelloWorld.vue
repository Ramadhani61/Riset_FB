<template>
  <v-container>
      <!-- <v-facebook-login app-id="687646526313011"></v-facebook-login> -->
      <!-- <v-facebook-login v-model="model" @sdk-init="handleSdkInit" app-id="687646526313011" @login="ceklogin" @logout="cekLogout" @click="Cek"/>
      <button v-if="scope.logout && model.connected" @click="scope.logout">
        Logout
      </button> -->
      <facebook-login class="button" appId="687646526313011" @login="ceklogin" @logout="cekLogout"
        @get-initial-status="ceklogin">
      </facebook-login>
  </v-container>
</template>

<script>
import VFacebookLogin from 'vue-facebook-login-component'
import facebookLogin from 'facebook-login-vuejs';
  export default {
    name: 'HelloWorld',
    components:{
      VFacebookLogin,
      facebookLogin
    },

    data: () => ({
      FB: {},
      model: {},
      scope: {},
    }),
    mounted(){
    
    },
  methods: {
    handleSdkInit({ FB, scope }) {
      console.log(FB,"FB");
      console.log(scope,"SCOPE");
      this.FB = FB
      this.scope = scope
    },
    ceklogin(data){
      console.log(data,"dataslogin");
      console.log(this.scope,"login");
      
    },
    cekLogout(e){
     console.log(e,"eeee");
    },
    Cek(prm){
      console.log(prm,"void");

    }
  },
  }
</script>
