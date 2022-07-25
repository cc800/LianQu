<template>
  <div v-loading="loading" id="wanShow">
    <h5 v-html="wan.content"></h5>
    <el-badge :value="wan.good" type="primary" :max="99" class="item">
      <el-button @click="good" size="large" type="danger" circle><el-icon color="#FFFF00" :size="30"><Medal /></el-icon></el-button>
    </el-badge>

  </div>
</template>

<script>
import {getRandomWan, putWan} from "@/api/api";
import {Medal} from '@element-plus/icons-vue'
import {ref} from "vue";
export default {
  components:{
    Medal
  },
  data(){
    return{
      wan: {
        id:'',
        content:'加载中...',
        good:''
      },
      loading:ref(true)
    }
  },
  methods:{
    myGetRandomWan(){
      this.loading=true
      getRandomWan().then((res)=>{
        this.wan=res.data
        this.wan.good=parseInt(this.wan.good)
        this.loading=false
      })
    },
    good(){
      this.wan.good++
      putWan(this.wan).then((res)=>{
        this.wan=res.data
        this.wan.good=parseInt(this.wan.good)
      })
    }
  },
  created() {
    this.myGetRandomWan()
  }
}
</script>

<style scoped>
#wanShow{
}
</style>
