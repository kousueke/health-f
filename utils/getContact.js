import axios from 'axios';
export default async function getContact() { //getUserDataの処理の最後にgetCourseの処理が動く
  const uid = this.uid //apiと一緒に送るuidを定義
  // console.log(uid)
  const resData = await axios.get(
    "http://127.0.0.1:8000/api/v1/food/" + uid
    // "https://health-in-b.herokuapp.com/api/v1/food/" + uid
  );
  // console.log(resData);
  return foodresData.data.data;
}

関数毎にファイルを作成して
使用したいファイルで
import
する

pagesのファイルにはできるだけ
html/cssのみの方がいい！