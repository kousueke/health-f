<template>
<div>
  <IndexHeader />
  <div class="week">monthページ</div>
  <div class="btn"><button @click="$router.push('/')">ホームへ戻る</button></div>
</div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  middleware: "auth",
  data(){
  return {
    myCourse: '',
    myWeight: '',
    myTarget: '',
    myLists: [],
    uid:"",
    myName:"",
    };
  },
  methods: {
    getUserData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // console.log(user);
          this.uid = user.uid; //カレントユーザーを取得
        }
        this.getUser();
        this.getCourse(); //カレントユーザーの目標値を表示
      });
    },

    async getUser(){
      const uid = this.uid //apiと一緒に送るuidを定義
      const myName = await this.$axios.get(
        "http://127.0.0.1:8000/api/v1/user/" + uid
        // "https://health-in-b.herokuapp.com/api/v1/user/" + uid
      );
      this.myName = myName.data.data;
      console.log(this.myName);
    },

    async getCourse(){ //getUserDataの処理の最後にgetCourseの処理が動く
      const uid = this.uid //apiと一緒に送るuidを定義
      const myTarget = await this.$axios.get(
        "http://127.0.0.1:8000/api/v1/course/" + uid
        // "https://health-in-b.herokuapp.com/api/v1/course/" + uid
      );
      this.myTarget = myTarget.data.data;
      console.log(item.name);
    },
  },


  created() {
    this.getUserData();
  },
}


</script>

<style scoped>

</style>