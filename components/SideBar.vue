<template>
<div>
  <div class="menu">
  <p @click="$router.push('/')">ユーザー情報</p>
  <p @click="$router.push('/')">week</p>
  <p @click="$router.push('/')">month</p>
  <p @click="$router.push('/')">year</p>
  <p @click="$router.push('/')">設定</p>
  </div>
</div>
</template>

<script>
export default {}
</script>

<style scoped>
.menu{
  margin: 50px 20px 0;
}

.menu p {
  max-width: 200px;
  padding: 10px 30px;
  margin: 2em 0;
  border-bottom: solid 5px green;
  font-size: 18px;
}
</style>

