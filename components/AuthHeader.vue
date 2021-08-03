<template>
  <div class="header flex">
    <div class="headericon">
      <div class="title">
        <h2>health-in</h2>
      </div>
    </div>
    <div class="btn flex">
      <p @click="$router.push('/register')">新規登録</p>
      <p @click="$router.push('/login')">ログイン</p>
    </div>
  </div>
</template>

<style scoped>
.header{
  margin: 20px;
  align-items: center;
}
.title{
  color: green;
}

.flex{
  display: flex;
  justify-content: space-between;
}

/* .btn{
  align-items: center;
} */

.btn p{
  margin-right: 20px;
  cursor: pointer;
}

</style>