<template>
<el-dialog v-model="dialogVisible" width="80%">
  <div style="margin-top: -40px">
    <h4 v-html="q.content"/>
    <el-divider>&</el-divider>
    <p v-html="q.oneQuestion"/>
    <p v-html="q.twoQuestion"/>
    <p v-html="q.threeQuestion"/>
  </div>
</el-dialog>
</template>

<script>
export default {
  name: "ShowDialog",
  data(){
    return{
      q:{
        content:'',
        oneQuestion:'',
        twoQuestion:'',
        threeQuestion:''
      },
      dialogVisible:false
    }
  },
  methods:{
    show(){
      this.dialogVisible=true
    },
    close(){
      this.dialogVisible=false
    }
  }
}
</script>

<style scoped>

</style>
