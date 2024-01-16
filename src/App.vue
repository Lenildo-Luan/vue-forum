<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div class="container">
    <PageHome/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import PageHome from './components/PageHome.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    PageHome
  }
}
</script>

<style>
@import "./assets/style.css";
</style>
