<template>
<div>
  <IndexHeader />
  <div class="week">monthページ</div>
  <div class="btn"><button @click="$router.push('/')">ホームへ戻る</button></div>
</div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  middleware: "auth",
  data(){
  return {
    myCourse: '',
    myWeight: '',
    myTarget: '',
    myLists: [],
    uid:"",
    myName:"",
    };
  },
}


</script>

<style scoped>

</style>