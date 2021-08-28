<template>
<div>
  <div class="home">

    <div class="data">
        <th>{{ some_date | format-date }}</th>
        <!-- getcontactみたいに各処理の後に動く処理を作成。その処理はカレントユーザーの登録してある食品のタンパク質量と数量をかけた合計値 -->
    </div>

    <div class="food-all">

      <div class="new">
        <div class="newfood">
          <label for="name">食品名:</label>
          <input type="text" id="name" v-model="newName">
        </div>
        <div class="newfood">
          <label for="protein">タンパク質量：</label>
          <input type="number" id="protein" min="1" max="100" v-model="newProtein">g
        </div>
        <div class="newfood">
          <label for="amount">数量：</label>
          <input type="number" id="amount" min="1" max="20" v-model="newAmount">
        </div>
        <div class="newfood">
          <button class="btn" @click="send">追加</button>
        </div>
      </div>

      <div class="food">
          <div class="total_target">
            <div class="target">
              <ul v-for="item in myTarget" :key="item.id" >
                <ul>目標値：<textarea name="" id="" cols="4" rows="1" v-model="item.target"></textarea>g</ul>
              </ul>
            </div>
            <div class="total">
              <ul>現在の合計値：{{ totalProtein }}g</ul>
            </div>
          </div>
        <table>
          <tr>
            <th>食品名</th>
            <th>タンパク質量</th>
            <th>数量</th>
            <!-- <th>変更</th>
            <th>削除</th> -->
          </tr>
          <tr v-for="item in foodLists" :key="item.id" >
            <!-- <td><button @click="deleteContact(item.id)">削除</button></td> -->
            <td><div class="flex icon-field" @click="deleteContact(item.id)"><img class="icon" src="../assets/delete.png" /></div></td>
            <td><input type="name" v-model="item.name" /></td>
            <td><input type="number" min="1" max="100" v-model="item.protein">g</td>
            <td><input type="number" min="1" max="20" v-model="item.amount">個</td>
            <!-- <td><button @click="updateContact(item.id, item.name, item.protein, item.amount)">変更</button></td> -->
            <td><div class="flex icon-field" @click="updateContact(item.id, item.name, item.protein, item.amount)"><img class="icon" src="../assets/update.png" /></div></td>
          </tr>
        </table>
      </div>
    </div>



  </div>
</div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      newName: "",
      newProtein: "",
      newAmount:"",
      uid:"",
      foodLists: [],
      myTarget:[],
    };
  },
  methods: {
    //getUserDataの処理の最後にgetContactの処理が動作する
    getUserData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // console.log(user);
          this.uid = user.uid; //カレントユーザーを取得
        }
        this.getCourse(); //カレントユーザーの目標値を表示
        this.getContact();
      });
    },
    async getContact() { //getUserDataの処理の最後にgetCourseの処理が動く
      const uid = this.uid //apiと一緒に送るuidを定義
      // console.log(uid)
      const resData = await this.$axios.get(
        "https://health-in-b.herokuapp.com/api/v1/food/" + uid
      );
      // console.log(resData);
      this.foodLists = resData.data.data;
    },
    async getCourse(){ //getUserDataの処理の最後にgetCourseの処理が動く
      const uid = this.uid //apiと一緒に送るuidを定義
      const myTarget = await this.$axios.get(
        "https://health-in-b.herokuapp.com/api/v1/course/" + uid
      );
      // this.myTarget = myTarget.data.data[0];
      this.myTarget = myTarget.data.data;

      // console.log(uid);
      // console.log(myTarget);
      // console.log('aaa');
    },

    async send() {
      if (!this.newName || !this.newProtein || !this.newAmount) {
        alert("食品名またはタンパク質量または数量が入力されていません。");
        return;
      }
      firebase.auth().onAuthStateChanged(async(user) => {
        const sendData = {
          name: this.newName,
          protein: this.newProtein,
          amount: this.newAmount,
          user_id: user.uid,
        };
        this.uid = user.uid;
        await this.$axios.post("https://health-in-b.herokuapp.com/api/v1/food", sendData);
        this.getContact();
      })
    },
    async updateContact(id, name, protein, amount) {
      const sendData = {
        name: name,
        protein: protein,
        amount: amount,
      };
      await this.$axios.put(
        "https://health-in-b.herokuapp.com/api/v1/food/" + id,
        sendData
      );
      this.getContact();
    },
    async deleteContact(id) {
      await this.$axios.delete("https://health-in-b.herokuapp.com/api/v1/food/" + id);
      this.getContact();
    },
  },
  computed: {
       // 合計値
       totalProtein: function() {
         return this.foodLists.reduce(function(sum, item) { //reduceメソッドとは、配列の要素を一つずつ取り出し、指定した処理を行っていき、最終的に一つの値を返す関数
           return sum + (item.protein * item.amount); //sumに足されていく
     }, 0) //sumの初期値を0とする
    },
  },

  created() {
    this.getUserData();
  },

  // beforeDestroy(id, name, protein, amount){
  //     const sendData = {
  //       name: name,
  //       protein: protein,
  //       amount: amount,
  //     };
  //      this.$axios.put(
  //       "http://127.0.0.1:8000/api/v1/food/" + id,
  //       sendData
  //     );
  //         this.postProtein();
  //   console.log(postProtein);
  //   console.log("zzz");
  //   },

}
</script>

<style scoped>
.home{
  margin: 40px 0 0 40px;
}
.food-all{
  margin: 40px 0 0 40px;
  height: 100vh;
}

.new{
  display: flex;
  margin: 40px 0;
  padding: 20px 10px 5px 10px;
  background-color: #f2f2f2;
  max-width: 700px;
  justify-content: center;
  border-radius: 5px;
}

.newfood{
  margin-right: 10px;
  font-size: 18px;
}

textarea {
	font-size: 100%;
  resize: none;
}

.btn{
  padding: 1px 5px;
  margin: -10px 0 0 0;
  font-size: 18px;
}

table,
td,
th {
  /* border: 1px solid #000;
  border-collapse: collapse; */
  margin-top: 40px;  
  text-align: center;
}
td,
th {
  padding: 10px 20px;
}
th {
  background: #f2f2f2;
}

.total_target{
  font-size: 20px;
  margin: 20px;
  display: flex;
  justify-content: space-between;
  width: 500px;
}

.target{
  padding: 5px;
  border-bottom: solid 5px green;
  width: 200px;
}

.total{
  padding: 20px 5px 0 5px;
  border-bottom: solid 5px green;
  width: 200px;
}

.icon-field {
  margin-top: 15px;
  cursor: pointer;
}
.icon {
  width: 20px;
}
</style>