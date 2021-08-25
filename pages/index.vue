<template>
<div>
  <IndexHeader />
  <div class="flex">
    <div class="sideall">
      <SideBar />
    </div>
    <div class="home">
      <Home />
    </div>
  </div>
</div>
</template>



<script>
//middlewareフォルダのauth.jsの処理の呼び出し
export default {
  middleware: "auth",
  }
</script>

<style scoped>
  .flex{
  display: flex;
  width: 100%;
  }

  .sideall{
  height: 100vh;
  width: 25%;
  }

  .home{
  height: 100vh;
  width: 75%;
  }
</style>