<template>
  <v-container >
    <!-- v-if="Showlogin" -->
    <v-row class="justify-center align-center" fluid>
      <v-col class="align-center">
      <!-- <v-facebook-login app-id="687646526313011"></v-facebook-login> -->
      <!-- <v-facebook-login v-model="model" @sdk-init="handleSdkInit" app-id="687646526313011" @login="ceklogin" @logout="cekLogout" @click="Cek"/>
      <button v-if="scope.logout && model.connected" @click="scope.logout">
        Logout
      </button> -->
      <facebook-login   class="button" appId="687646526313011" @login="ceklogin" @logout="cekLogout"
        @get-initial-status="GetInisial" @sdkLoaded="handleSdkInit">
      </facebook-login>
      </v-col>
      </v-row>
      <v-row class="justify-center align-center" fluid v-show="Showlogin=true" >
        <v-col class="align-center">
          <h1 class="justify-center d-flex mb-5">Hi, {{Name}}</h1>
          <h1 class="justify-center d-flex mb-5">PILIH ZODIAK KAMU</h1>
          <v-row class="justify-center align-center" fluid>
            <v-col cols="12" md="3 offset-md-2" class="justify-end">
              <v-select :items="items" label="Pilih Bintang" outlined dense v-model="item.star"
                v-on:change="CekBintang(item.star)" hide-details=""></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-btn color="primary" dark @click="Cari()"> CEK</v-btn>
            </v-col>
          </v-row>
          <v-row class="justify-center align-center" fluid>
            <v-col cols="12" md="6">
              <v-textarea name="input-7-1" filled v-model="item.content"></v-textarea>
            </v-col>
          </v-row>
  
         
        </v-col>
      </v-row>
        </v-container>
</template>

<script>
// import VFacebookLogin from 'vue-facebook-login-component'
import axios from 'axios'
import facebookLogin from 'facebook-login-vuejs';
  export default {
    name: 'HelloWorld',
    components:{
      // VFacebookLogin,
      facebookLogin
    },

    data: () => ({
      FB: {},
      model: {},
      scope: {},
      item: {
        star: "",
        content: "",
      },
      Showlogin:true,
      items: [
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",

        "Capricorn",
      ],
      form: {
        email: "",
        username: "",
        password: "",
      },

      loading: false,
      valid: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      UserID:"",
      Token:"",
      Name:"",
      checkbox: false,
    }),
    mounted(){
      this.handleSdkInit();
    
    },
    methods:{
    handleSdkInit(data) { 
      
      if (data.status =="unknown") {
        this.Showlogin=true;
        
      }else{
        this.Showlogin=false;
      }
    },
    GetInisial(data){
      console.log(data,"datas,");
    },

    GetAPIData(){
      let AccessToken=this.Token
      let url = `https://graph.facebook.com/USER-ID?metadata=1&access_token=${AccessToken}`
        axios
          .get(url, {
          })
          // headers: {
          //   access_token: AccessToken, //the token is a variable which holds the token
          // },
          .then((res) => {
           console.log(res,"response GETAPI");
          })
          .catch((err) => {
          console.log(err,"erors");
          });
    
    },
    ceklogin(data){
      this.Token = data.response.authResponse.accessToken;
      this.UserID = data.response.authResponse.userID;    
      
    },
    // if (data.response.status == "connected") {
    //   this.Showlogin=false;
    //   this.UserID = data.response.authResponse.userID;
    // }else{
    //   this.Showlogin=true;

    // }
    cekLogout(e){
     console.log(e,"eeee");
    },
    CekBintang(e) {
      this.item.star = e;
    },
    Cari() {
      console.log(this.item.star);
      if (this.item.star == "Aries") {
        this.item.content =
          "Aries tak segan untuk terjun ke dalam situasi yang paling berbahaya sekalipun. Mereka pun akan berusaha keras untuk selalu menjadi yang teratas.";
      } else if (this.item.star == "Taurus") {
        this.item.content =
          "Rasi bintang zodiak Taurus dikenal dengan sikapnya yang keras kepala. Menjadi bagian dari lambang bumi, pemilik zodiak ini termasuk materialistis, praktis, dan sangat tekun.";
      } else if (this.item.star == "Gemini") {
        this.item.content =
          "Zodiak Gemini sering menganggap dirinya sebagai orang yang luar biasa dan terdepan dari yang lain. Gemini didorong oleh rasa ingin tahunya yang tak terpuaskan. Ia pun senang bergaul dengan siapa pun di sekitarnya..";
      } else if (this.item.star == "Cancer") {
        this.item.content =
          "Rasi bintang zodiak Cancer menyukai sesuatu yang berkaitan dengan ketulusan dan selalu mengedepankan kerja keras. Untuk berteman dengan pemilik zodiak ini, seseorang harus membangun kepercayaan yang tinggi.";
      } else if (this.item.star == "Leo") {
        this.item.content =
          "Rasi bintang zodiak Leo berlambang raja hutan, yaitu singa. Berlambang api, Leo cenderung bersemangat, berhati hangat, dan tak kenal takut akan apa pun.";
      } else if (this.item.star == "Virgo") {
        this.item.content =
          "Pekerja keras dan penuh kerpraktisan adalah sifat seorang Virgo lain yang jarang dikenali. Kelemahan mereka adalah obsesinya dengan detail dan hal-hal terperinci.";
      } else if (this.item.star == "Libra") {
        this.item.content =
          "Rasi bintang dari Libra adalah timbangan. Keseimbangan, harmonis, dan keadilan adalah karakteristik utama pemilik zodiak Libra.";
      } else if (this.item.star == "Capricorn") {
        this.item.content =
          "Capricorn sangat berdedikasi pada tujuan mereka. Meskipun keras kepala, ia bersedia bersabar dan bekerja keras untuk mencapai tujuan tersebut.";
      }
    },
  
  },
  }
</script>
