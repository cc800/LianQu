<template>
  <el-dialog v-model="dialogVisible" width="80%">
    <el-form>
      <el-form-item label="标题">
        <el-input v-model="myInfo.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="textarea" placeholder="输入内容" v-model="myInfo.info"></el-input>
      </el-form-item>
    </el-form>
    <el-row justify="center">
      <el-button @click="addInfo" v-if="addIndex">新增</el-button>
      <el-button-group v-else>
        <el-button @click="changeInfo">修改</el-button>
        <el-button @click="deletedInfo">删除</el-button>
      </el-button-group>
    </el-row>
  </el-dialog>
</template>

<script>
import {_transFormEnter, postInfo, putInfoContent, putInforDid, showMsgBox} from "@/api/api";

export default {
  name: "AddDialog",
  data() {
    return {
      dialogVisible: false,
      myInfo: {
        id: '',
        title: '',
        info: '',
      },
      addIndex: true
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    deletedInfo() {
      putInforDid(this.myInfo.id).then(() => {
        this.changeEnvent("删除成功")
      })
    },
    changeInfo() {
      this.myInfo.info=_transFormEnter(this.myInfo.info)
      putInfoContent(this.myInfo).then(() => {
        this.changeEnvent("修改成功")
      })
    },
    addInfo() {
      this.myInfo.info=_transFormEnter(this.myInfo.info)
      postInfo(this.myInfo).then(() => {
        this.changeEnvent("添加成功")
      })
    },
    changeEnvent(message) {
      showMsgBox(message)
      this.$emit("change")
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
