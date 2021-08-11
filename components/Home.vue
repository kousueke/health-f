<template>
<div>
  <div class="home">

    <div class="data">
        <th>{{ some_date | format-date }}</th>
        <th>仮___22g/150g(目標値)</th>
        
    </div>

    <div class="food-all">

      <!-- <p>{{uid}}</p> -->
      <div class="new">
        <div class="newfood">
          <label for="name">食品名:</label>
          <textarea name="name" id="name" cols="25" rows="1" v-model="newName"></textarea>
        </div>
        <div class="newfood">
          <label for="protein">タンパク質量(g):</label>
          <textarea name="protein" id="protein" cols="5" rows="1" v-model="newProtein"></textarea>
        </div>
        <div class="newfood">
          <button class="btn" @click="send">追加</button>
        </div>
      </div>

      <div class="food">
        <table>
          <tr>
            <th>食品名</th>
            <th>タンパク質量</th>
            <th>変更</th>
            <th>削除</th>
            <th>数量</th>
          </tr>
          <tr v-for="item in foodLists" :key="item.id">
            <td><input type="name" v-model="item.name" /></td>
            <td><input type="name" v-model="item.protein" /></td>
            <td>
              <button @click="updateContact(item.id, item.name, item.protein)">更新</button>
            </td>
            <td>
              <button @click="deleteContact(item.id)">削除</button>
            </td>
            <td>
              <!-- <input type="number" v-model:value="item.quantity"> -->
              <!-- <span><input type="number" v-model:value="item.quantity" min="0" max="10"></span> -->

              <span><input type="number" v-model="item.quantity" min="0" max="10"></span>
              <span>{{ item.protein * item.quantity }}g</span>

              <!-- <select name="num" id="num">
                <option value="zero">0</option>
                <option value="one">1</option>
                <option value="two">2</option>
                <option value="three">3</option>
                <option value="four">4</option>
                <option value="five">5</option>
                <option value="six">6</option>
                <option value="seven">7</option>
                <option value="eight">8</option>
                <option value="nine">9</option>
                <option value="ten">10</option>
              </select> -->
            </td>
          </tr>
          <div>合計値：{{ totalProtein }}g</div>
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
      uid:"",
      quantity:"",
      foodLists: [],
    };
  },
  methods: {
    async getContact() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/v1/food/"
      );
      console.log(resData);
      this.foodLists = resData.data.data;
    },

    async send() {
      firebase.auth().onAuthStateChanged(async(user) => {
        const sendData = {
          name: this.newName,
          protein: this.newProtein,
          user_id: user.uid,
        };
        this.uid = user.uid;
        await this.$axios.post("http://127.0.0.1:8000/api/v1/food/", sendData);
        this.getContact();
      })
    },
    async updateContact(id, name, protein) {
      const sendData = {
        name: name,
        protein: protein,
      };
      await this.$axios.put(
        "http://127.0.0.1:8000/api/v1/food/" + id,
        sendData
      );
      this.getContact();
    },
    async deleteContact(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/v1/food/" + id);
      this.getContact();
    },
  },
  
  computed: {
       // 合計値
       totalProtein: function() {
         return this.foodLists.reduce(function(sum, item) { //reduceメソッドとは、配列の要素を一つずつ取り出し、指定した処理を行っていき、最終的に一つの値を返す関数
           return sum + (item.protein * item.quantity); //sumに足されていく
     }, 0) //sumの初期値を0とする
    },
  },

   created() {
    this.getContact();
  },
}
</script>

<style scoped>
.home{
  margin: 50px 0 0 50px;
  /* height: 100vh; */
}
.food-all{
  margin: 50px 0 0 50px;
  height: 100vh;
}

.new{
  display: flex;
  margin: 50px 0;
  padding: 20px 0;
  background-color: #f2f2f2;
  max-width: 700px;
  justify-content: center;
  border-radius: 5px;
}

.newfood{
  margin-right: 10px;
  font-size: 18px;
  /* color: white; */
}

textarea {
	font-size: 100%;
  resize: none;
}

.btn{
  padding: 1px 5px;
  font-size: 18px;
}

table,
td,
th {
  border: 1px solid #000;
  border-collapse: collapse;
  text-align: center;
}
td,
th {
  padding: 10px 20px;
}
th {
  background: #f2f2f2;
}

</style>