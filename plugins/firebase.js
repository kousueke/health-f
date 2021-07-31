import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyCRmQfmDmid2WT9xHBvNlj9MafT9HERKU0",
      authDomain: "health-f-90fa1.firebaseapp.com",
      projectId: "health-f-90fa1",
      storageBucket: "health-f-90fa1.appspot.com",
      messagingSenderId: "1006830083485",
      appId: "1:1006830083485:web:c1210578b552a9a55d2374",
      measurementId: "G-CCGE994FZE"
    }
  )
}
  
export default firebase
