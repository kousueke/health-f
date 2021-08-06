<template>
  <div class="header flex">
    <div class="headericon">
      <div class="title">
        <p>health-in</p>
      </div>
    </div>
      <div class="logout" @click="logout()">ログアウト</div>
  </div>  
</template>

<script>
import firebase from "~/plugins/firebase"; //輸入
export default { //輸出

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトが完了しました");
          this.$router.replace("/login");
        });
    },

  },
};

</script>

<style scoped>
.header{
  margin: 30px 0 0 30px;
  align-items: center;
}

.title{
  color: green;
  font-size: 30px;
  font-weight: bold;
}

.flex{
  display: flex;
  justify-content: space-between;
}

.btn p{
  margin-right: 20px;
  cursor: pointer;
}

.logout{
  font-size: 12px;
  color: red;
  font-weight: bold;
  margin-right: 10%;
  background-color: #f2f2f2;
  padding: 15px;
  border-radius: 5px;
}
</style>