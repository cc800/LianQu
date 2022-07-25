<template>
<el-dialog v-model="dialogVisible" :show-close="false" width="90%">
  <MyInfo style="margin-top: -50px" sid="1" ref="myinfo"/>
</el-dialog>
</template>

<script>
import MyInfo from "@/components/manage/infManage/MyInfo";
export default {
  components: {MyInfo},
  data(){
    return{
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
  },
  created() {
  }
}
</script>

<style scoped>

</style>
