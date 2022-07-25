<template>
  <el-dialog
      custom-class="my-el-dialog"
      v-model="dialogVisible"
      width="80%"
      :show-close=false
      :center=true>
    <template #header >
      <div style="margin-top: -20px">
        <h4>{{ title }}</h4>
      </div>
    </template>

    <div style="margin-top: -50px">
      <h4 v-html="content" />
    </div>

    <template #footer>
      <div style="margin-top: -30px">
        <el-button type="info" @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled/>
          </el-icon>
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import {ref} from 'vue'
import {CircleCloseFilled} from '@element-plus/icons-vue'

export default {
  components: {
    CircleCloseFilled
  },
  data() {
    return {
      title:'',
      content: '',
      dialogVisible: ref(false)
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    }
  }
}
</script>
<style scoped>
.my-el-dialog .el-dialog__body{
  height: 0px;
  margin-top: 0px;
}
</style>
