<template>
<div>
  <div class="home">
    <h1>（仮置き）___8月X日____________________________________22g/150g(目標値)</h1>

    <div class="food-all">食品一覧
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
      contactLists: [],
      uid:"",
    };
  },
  methods: {
    // async getContact() {
    //   const resData = await this.$axios.get(
    //     "http://127.0.0.1:8000/api/food/"
    //   );
    //   this.contactLists = resData.data.data;
    // },
    async send() {
      firebase.auth().onAuthStateChanged(async(user) => {
        const sendData = {
          name: this.newName,
          protein: this.newProtein,
          user_id: user.uid,
        };
        this.uid = user.uid;
        await this.$axios.post("http://127.0.0.1:8000/api/v1/food/", sendData);
      })
      // this.getContact();
    },
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
  margin: 20px;
  padding: 20px 20px 0;
  background-color: #f2f2f2;
  max-width: 80%;
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
</style>