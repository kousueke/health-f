<template>
<div>
  <IndexHeader />
      <div class="user">
          <div class="title"><h1>ユーザー情報</h1></div>
          <div class="target">
              <div class="textAll" v-for="item in myName" :key="item.id" >
                <div class="myname">
                  ユーザー名：<textarea name="" id="" cols="12" rows="1" v-model="item.name" ></textarea>
                </div>
              </div>
            <div class="textAll" v-for="item in myTarget" :key="item.id" >
              <div class="text">体重：<textarea name="" id="" cols="4" rows="1" v-model="item.weight"></textarea>g</div>
              <div class="text">選択中のコース:
                <textarea name="" id="" cols="12" rows="1" v-if="item.name == 1.2" style="overflow:hidden;">健康コース</textarea>
                <textarea name="" id="" cols="12" rows="1" v-else-if="item.name == 1.6" style="overflow:hidden;">マッチョコース</textarea>
                <textarea name="" id="" cols="12" rows="1" v-else style="overflow:hidden;">超マッチョコース</textarea>
              </div>
              <!-- v-modelの記述はいらないーーーv-ifの引数がv-modelの値 -->
              <div class="text">目標値：<textarea name="" id="" cols="4" rows="1" v-model="item.target"></textarea>g</div>
            </div>
          </div>
          <div class="btn"><button @click="$router.push('/')">ホームへ戻る</button></div>
      </div>
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
.user{
  margin: 50px;
  height: 100vh;
}

.title{
  font-size: 22px;  
}

.target{
  margin-top: 50px;
  font-size: 22px;
  text-align: center;
}

.textAll{
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 500px;
}
.myname{
  font-size: 22px;
  border-bottom: solid 5px green;
  margin: 20px;
  padding: 10px 25px;
}

.text{
  background-color: #f2f2f2;
}

.ul, ul{
  margin: 20px;
}

.ul, textarea{
  resize: none;
  font-size: 22px;
}

.btn{
 float: right; 
 margin-right: 100px;
}
</style>