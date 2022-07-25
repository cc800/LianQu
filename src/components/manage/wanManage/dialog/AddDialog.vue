<template>
  <el-dialog
      v-model="dialogVisible"
      width="80%"
      :show-close="false"
      :center="true">
    <div style="margin-bottom: -30px">
      <el-form>
        <el-form-item label="标题">
          <el-input v-model="wan.type" placeholder="Please input"/>
        </el-form-item>
        <el-form-item>
          <WanEditor ref="editor"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button-group>
        <el-button v-if="update" type="primary" @click="myPostWan">提交</el-button>
        <el-button v-if="!update" type="primary" @click="myPutWan">更新</el-button>
        <el-button v-if="!update" type="danger" @click="mydeleteWan">删除</el-button>
        </el-button-group>
        <el-button circle text @click="dialogVisible = false"><el-icon><Close/></el-icon></el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {ref} from 'vue'
import {deleteWanById, postWan, putWan, showMsgBox} from "@/api/api";
import WanEditor from "@/components/manage/wanManage/dialog/WanEditor";
import {Close} from '@element-plus/icons-vue'

export default {
  data() {
    return {
      dialogVisible: ref(false),
      wan: {
        id: '',
        content: '',
        type: ''
      },
      update: true
    }
  },
  components: {
    WanEditor, Close
  },
  methods: {
    myPostWan() {
      this.wan.content = this.$refs.editor.articleHtml
      postWan(this.wan).then(() => {
        this.change("提交成功")
      })
    },
    myPutWan() {
      this.wan.content = this.$refs.editor.articleHtml
      putWan(this.wan).then(() => {
        this.change("更新成功")
      })
    },
    mydeleteWan() {
      deleteWanById(this.wan.id).then(() => {
        this.change("删除成功")
      })
    },
    change(message) {
      showMsgBox(message)
      this.dialogVisible = false
      this.$emit("change")
    },
    show() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.editor.setInner(this.wan.content)
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
