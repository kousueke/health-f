import firebase from '../plugins/firebase'

export default function ({ redirect }) {
  firebase.auth().onAuthStateChanged((user) => {
    // console.log("成功");
    if (!user) {
      redirect('/login')
      // console.log("失敗（処理は成功）");
    }
  })
}