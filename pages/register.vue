<template>
  <div>
    <AuthHeader />
    <div class="card">
      <p>新規登録</p>
      <div class="form">
        <input placeholder="ユーザーネーム" type="text" v-model="name" />
        <input placeholder="メールアドレス" type="email" v-model="email" />
        <input placeholder="パスワード" type="password" v-model="password" />
        <button @click="register">新規登録</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    register() {
      if (!this.email || !this.password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {  //thenメソッドの非同期処理
          console.log(data);
          const sendData = {
            // user_id: data.user.uid,
            id: data.user.uid,
            //uid...リクエストしているユーザーに割り当てられた一意のユーザー ID。
            name: this.name, //nameカラムは20行目のdataの中のname
          };
          console.log(sendData);
          this.$axios.post("http://127.0.0.1:8000/api/v1/user", sendData);
          //postメソッドに対応するphpのユーザーコントローラーのアクションのstoreにsendDataが送られる
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/email-already-in-use":
              alert("このメールアドレスはすでに使われています。");
              break;
            case "auth/weak-password":
              alert("パスワードは6文字以上で入力してください。");
              break;
            default:
              alert("エラーが起きました。しばらくしてから再度お試しください。");
              break;
          }
        });
    },
  },
};
</script>

<style scoped>

.icon{
  width: 100px;
  cursor: pointer;
}

.flex{
  display: flex;
  justify-content: space-between;
}

.btn{
  align-items: center;
}

.btn p{
  margin-right: 20px;
  cursor: pointer;
}

button {
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff;
  background-color:green;
  border-radius: 25px;
  cursor: pointer;
}

.card {
  margin: 100px auto;
  width: 350px;
  /* background: #CBFFD3; */
  border-radius: 5px;
  padding: 20px;
}
.card p {
  color: black;
  font-weight: bold;
  text-align: center;
}
input {
  margin-top: 15px;
  width: 80%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid black;
  color: black;
}
.form {
  text-align: center;
}
.form button {
  margin-top: 15px;
}

</style>