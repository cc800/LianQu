<template>

  <el-dialog
      v-model="dialogVisible"
      width="80%"
      :show-close="false">
    <div style="margin-top: -50px">
      <h4 v-html="content"/>
      <el-divider content-position="center">&</el-divider>
      <h5 v-html="reply"/>
    </div>
    <template #footer>
      <div align="center" style="margin-top: -20px">
        <el-popconfirm title="确认？"
        @confirm="deleteRecord">
          <template #reference>
            <el-button type="danger" round><el-icon><CloseBold /></el-icon>删除记录</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from 'vue'
import {CloseBold} from '@element-plus/icons-vue'
import {deleteReplyRecord} from "@/api/api";
export default {
  // props:['content','reply'],
  components:{CloseBold},
  data(){
    return{
      id:'',
      content:'',
      reply:'',
      dialogVisible:ref(false)
    }
  },
  methods:{
    show(){
      this.dialogVisible=true
    },
    close(){
      this.dialogVisible=false
    },
    deleteRecord(){
      deleteReplyRecord(this.id).then(()=>{
        this.$emit('deleted')
        this.dialogVisible=false
      })
    }
  }
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
