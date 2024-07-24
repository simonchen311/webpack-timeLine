<template>
  <div id="app">
    <!-- <div class="header"> -->
      <!-- <img draggable @dragstart="dragStartHandle" src="./assets/logo.png" />
      <h1>MIX智慧数据平台</h1> -->
    <!-- </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
    name: "App",
    methods: {
        dragStartHandle() {
            console.log("开始拖拽")
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
