<template>
<div>
  <IndexHeader />
  <div class="course_all">
    <div class="step">
      <ul>
        <ul>step① ご自身の体重を入力</ul><br>
        <ul>step② ご自身の目指す体型に合わせたコース選択</ul><br>
        <ul>step③ 登録ボタンをクリックし登録を完了させましょう！</ul>
      </ul>
    </div>
    <div class="course">
          <div class="aaa">
            <label for="name">体重：</label>
            <input type="number" min="1" max="500" placeholder="1" v-model="myWeight">kg
          </div>
          <div class="aaa">
            <label for="protein">コース選択：</label>
              <select size="1" v-model="myCourse">
                  <option value="1.2">健康コース</option>
                  <option value="1.6">マッチョコース</option>
                  <option value="2">超マッチョコース</option>
              </select>
          </div>
          <div class="aaa">
            目標値：{{ target }}g
            <ul ></ul>
          </div>
          <div class="bbb">
            <button class="btn" @click="send">登録</button>
          </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data(){
  return {
    myCourse: '',
    myWeight: '',
    myTarger: '',
    myLists: [],
    };
  },
  methods: {
    async send() {
      //体重またはコースが偽の時
      if (!this.myCourse || !this.myWeight) {
        alert("体重またはコースが入力されていません。");
        return;
      }
      firebase.auth().onAuthStateChanged(async(user) => {
        const sendData = {
          name: this.myCourse,
          weight: this.myWeight,
          target: this.target,
          user_id: user.uid,
        };
        this.uid = user.uid;
        console.log(sendData);
        await this.$axios.post("https://health-in-b.herokuapp.com/api/v1/course/", sendData);
        this.$router.push("/");
      })
    },
  },
  computed: {
    target: function(){
      return this.myCourse * this.myWeight;
    },
  }

}

</script>

<style scoped>
.course_all{
  margin: 100px 5% 5% 5%;
  height: 100vh;
}

.step{
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  max-width: 500px;
  background-color: #f2f2f2;
}

.course{
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  max-width: 500px;
}

.aaa{
  margin: 10px;
  padding: 20px;
  border: 4px solid;
  border-color: green;
  font-size: 18px;
}
.bbb{
  margin: 10px;
  text-align: right;
}

.btn{
  font-size: 18px;
  padding: 10px;
}
</style>