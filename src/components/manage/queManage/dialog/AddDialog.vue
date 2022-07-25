<template>
  <el-dialog v-model="dialogVisible" :show-close="false"
             width="90%">
    <el-form style="margin-top: -30px">
      <el-form-item label="标题">
        <el-input v-model="q.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <WanEditor ref="wanEditor"/>
      </el-form-item>
      <el-form-item label="选1">
        <el-input type="textarea" v-model="q.oneQuestion"></el-input>
      </el-form-item>
      <el-form-item label="选2">
        <el-input type="textarea" v-model="q.twoQuestion"></el-input>
      </el-form-item>
      <el-form-item label="选3">
        <el-input type="textarea" v-model="q.threeQuestion"></el-input>
      </el-form-item>
      <el-form-item label="是否自定义回复">
        <el-switch v-model="q.diyIndex"/>
      </el-form-item>
    </el-form>
    <el-row justify="center">
      <el-button v-if="addIndex" @click="myPostQuestion">新增</el-button>
      <el-button-group v-else>
        <el-button @click="myPutQuestionContent">修改</el-button>
        <el-button disabled>删除</el-button>
      </el-button-group>
    </el-row>
  </el-dialog>
</template>

<script>
import WanEditor from '../../../helper/WanEditor'
import {_transFormEnter, postQuestion, putQuestionContent, showMsgBox} from "@/api/api";
export default {
  name: "AddDialog",
  components:{WanEditor},
  data() {
    return {
      dialogVisible: false,
      q: {
        title: '',
        content: '',
        oneQuestion: '',
        twoQuestion: '',
        threeQuestion: '',
        diyIndex:false
      },
      addIndex: false
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.wanEditor.setInner(this.q.content)
      })
    },
    close() {
      this.dialogVisible = false
    },
    myPostQuestion(){
      this.formatQ()
      postQuestion(this.q).then(()=>{
        showMsgBox("添加成功")
        this.dialogVisible=false
      })
    },
    myPutQuestionContent(){
      this.formatQ()
      putQuestionContent(this.q).then(()=>{
        showMsgBox("更新成功")
        this.dialogVisible=false
      })
    },
    formatQ(){
      this.q.content=this.$refs.wanEditor.articleHtml
      this.q.oneQuestion=_transFormEnter(this.q.oneQuestion)
      this.q.twoQuestion=_transFormEnter(this.q.twoQuestion)
      this.q.threeQuestion=_transFormEnter(this.q.threeQuestion)
    }
  }
}
</script>

<style scoped>

</style>
