<template>
  <MyHead/>
  <router-view/>
  <MyFooter/>
</template>

<script>
// import HelloWorld from './components/MainPage.vue'
//Test Change

import MyHead from "@/components/helper/headerandfooter/MyHead";
import MyFooter from "@/components/helper/headerandfooter/MyFooter";
export default {
  name: 'App',
  components: {
    MyFooter,
    MyHead
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: -8px;
}
/*.example-showcase .el-dropdown + .el-dropdown {*/
/*  margin-left: 15px;*/
/*}*/
/*.example-showcase .el-dropdown-link {*/
/*  cursor: pointer;*/
/*  color: var(--el-color-primary);*/
/*  display: flex;*/
/*  align-items: center;*/
/*}*/
</style>
