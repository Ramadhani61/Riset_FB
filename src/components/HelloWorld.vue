<template>
  <v-container>
    <!-- <div class="header">
            <h1 class="title text-3xl text-white font-bold text-center">
              Kertas Gunting Batu
            </h1>
          </div>
          
          <div id="game">
            <div class="font-bold text-center text-2xl mt-16">
              <button id="startGame"
                class="button bg-green-400 hover:bg-teal-400 text-white rounded-full p-2 px-3 shadow focus:outline-none">
                Mulai
              </button>
            </div>
            <div id="gamePlay" class="font-bold text-center text-2xl mt-16 hidden">
              <h2 id="choice" class="text-4xl">Pilihan kamu</h2>
              <h2 id="compChoosesParent" class="text-2xl text-gray-600 hidden">
                Computer memilih
                <span class="p-1 rounded-full bg-black shadow" id="compChooses"></span>
              </h2>
              <div id="scores">
                Kamu: <span id="playerSc">0</span> Computer:
                <span id="compSc">0</span>
              </div>
            </div>
            <div id="buttongroup" class="text-5xl mr-auto text-center mt-5 hidden">
              <button id="rock" class="playbutton p-2 bg-white shadow rounded-full hover:bg-red-600 focus:outline-none">
                ✊
              </button>
              <button id="paper" class="playbutton p-2 bg-white shadow rounded-full hover:bg-blue-600 focus:outline-none">
                ✋
              </button>
              <button id="scissors" class="playbutton p-2 bg-white shadow rounded-full hover:bg-green-600 focus:outline-none">
                ✌
              </button>
            </div>
          </div> -->

    <v-row class="justify-center align-center" fluid>
      <v-col class="align-center">
        <facebook-login
          class="button"
          appId="687646526313011"
          @login="ceklogin"
          @logout="cekLogout"
          @get-initial-status="GetInisial"
          @sdkLoaded="handleSdkInit"
        >
        </facebook-login>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https://riset-fb-ramadhani61.vercel.app/"
        >
          Share
        </v-btn>
        <!-- <a
          class="btn-floating btn btn-tw"
          type="button"
          role="button"
          title="Share on facebook"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fparse.com"
          target="_blank"
          rel="noopener"
        >
          <i class="fab fa-2x fa-facebook-square"></i>
        </a> -->
      </v-col>
    </v-row>
    <v-row class="justify-center align-center" fluid v-if="Showlogin">
      <v-col class="align-center">
        <h1 class="justify-center d-flex mb-5">Hi, {{ Name }}</h1>
        <h1 class="justify-center d-flex mb-5">PILIH ZODIAK KAMU</h1>
        <v-row class="justify-center align-center" fluid>
          <v-col cols="12" md="3 offset-md-2" class="justify-end">
            <v-select
              :items="items"
              label="Pilih Bintang"
              outlined
              dense
              v-model="item.star"
              v-on:change="CekBintang(item.star)"
              hide-details=""
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn color="primary" dark @click="Cari()"> CEK</v-btn>
          </v-col>
        </v-row>
        <v-row class="justify-center align-center" fluid>
          <v-col cols="12" md="6">
            <v-textarea
              name="input-7-1"
              filled
              v-model="item.content"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
// import ApiData from "@/js/index";
import facebookLogin from "facebook-login-vuejs";
export default {
  name: "HelloWorld",

  components: {
    // VFacebookLogin,
    facebookLogin,
  },

  data: () => ({
    FB: {},
    model: {},
    scope: {},
    item: {
      star: "",
      content: "",
    },
    Showlogin: false,
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
    UserID: "",
    Token: "",
    Name: "",
    checkbox: false,
  }),
  mounted() {
    this.handleSdkInit();
    this.ConsumeApi();
    // ApiData.FBInstant;
  },
  methods: {
    handleSdkInit(data) {
      console.log(data, "handleSdkInit");
    },
    ConsumeApi() {
      let token =
        "AEMAMwBGADQAMABDADMAMAAtADcANgA3ADQALQA0AEYAMwAyAC0AOQA1ADIARQAtAEIANAA1ADUANAAxAEIAOQBDAEMAMAAxAHwAaQBtAHIAYQBtADAAMQB8ADEANgA3ADAAMwA5ADYANQA1ADQAMwA4ADY";
      let url =
        "/api-crm/KeluhanByIdWorkspace?id_workspace=RWJkZXNrIFRla25vbG9naVNlY29uZCB3b3Jrc3BhY2U&name=&page=1&size=5";
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Authorization: "Bearer " + token, //the token is a variable which holds the token
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    GetInisial(data) {
      console.log(data, "datas,");
    },
    GetAPIData() {
      let AccessToken = this.Token;
      let id = this.UserID;
      let url = `https://graph.facebook.com/${id}?metadata=1&access_token=${AccessToken}`;
      axios
        .get(url, {})
        // headers: {
        //   access_token: AccessToken, //the token is a variable which holds the token
        // },
        .then((res) => {
          this.Name = res.data.name;
          console.log(res, "response GETAPI");
        })
        .catch((err) => {
          console.log(err, "erors");
        });
    },
    GetAPICustom() {
      let AccessToken = this.Token;
      let id = this.UserID;
      let url = `https://graph.facebook.com/${id}?fields=id,name,email,birthday,gender,location,picture,friends,events&access_token=${AccessToken}`;
      axios
        .get(url, {})

        .then((res) => {
          this.Name = res.data.name;
          console.log(res, "response GetAPICustom");
        })
        .catch((err) => {
          console.log(err, "erors");
        });
    },
    ceklogin(data) {
      console.log(data.response.status, "data login");
      console.log(typeof data.response.status, "data login");
      if (data.response.status == "connected") {
        this.Showlogin = true;
        this.Token = data.response.authResponse.accessToken;
        this.UserID = data.response.authResponse.userID;
      } else {
        this.Showlogin = false;
      }
      this.GetAPIData();
    },

    // }
    cekLogout(e) {
      console.log(e, "eeee");
      this.Showlogin = false;
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
};
</script>
