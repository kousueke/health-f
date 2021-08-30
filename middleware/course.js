import firebase from '../plugins/firebase'
import axios from 'axios'

export default function ({ redirect }) {
  firebase.auth().onAuthStateChanged(async(user) => {
    console.log(user);
    console.log(user.uid);
    // this.uid = user.uid; //カレントユーザーを取得
    console.log("course");
    const uid = user.uid //apiと一緒に送るuidを定義
    const les = await axios.get(
       "http://127.0.0.1:8000/api/v1/course/" + uid
        // "https://health-in-b.herokuapp.com/api/v1/course/" + uid
    );
    // this.myTarget = myTarget.data.data[0];
    const myTarget = les.data.data;
  
    // console.log(uid);
    // console.log(myTarget);
    // console.log('aaa');
    if (!myTarget) {
      redirect('/course')
      console.log("course");
    }
  })
}
