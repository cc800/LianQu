<template>
<div id="questionShow">
  <h3 v-html="question.title"/>
  <h5 v-html="question.content"/>
  <el-divider content-position="center">&</el-divider>
  <el-row justify="center">
    <el-popconfirm v-if="question.oneQuestion!==null&&question.oneQuestion!==''"
                   @confirm="replayQuestion(1)" title="确认选择这个答案吗?">
      <template #reference>
        <p class="my_p" v-html="question.oneQuestion"></p>
      </template>
    </el-popconfirm>
  </el-row>
  <el-row justify="center">
    <el-popconfirm v-if="question.twoQuestion!==null&&question.twoQuestion!==''"
                   @confirm="replayQuestion(2)" title="确认选择这个答案吗?">
      <template #reference>
        <p class="my_p" v-html="question.twoQuestion"></p>
      </template>
    </el-popconfirm>
  </el-row>
  <el-row justify="center">
    <el-popconfirm v-if="question.threeQuestion!==null&&question.threeQuestion!==''"
                   @confirm="replayQuestion(3)" title="确认选择这个答案吗?">
      <template #reference>
        <p class="my_p" v-html="question.threeQuestion"></p>
      </template>
    </el-popconfirm>
  </el-row>
  <el-row justify="center">
    <p class="my_p" v-if="question.diyIndex===true"
               @click="diyOpen">其他回复</p>
  </el-row>
</div>
</template>

<script>
import {postReplyRecord, putQuestionRIndex, showMsgBox} from "@/api/api";
import {ElMessageBox} from "element-plus";

export default {
  name: "QuestionShow",
  props:{
    question:null
  },
  data(){
    return{
      diy_reply:'',
    }
  },
  methods:{
    replayQuestion(index){
      let r={
        name:this.question.title,
        qid:this.question.id,
        reply:''
      }
      switch (index) {
        case 1:r.reply=this.question.oneQuestion;break;
        case 2:r.reply=this.question.twoQuestion;break;
        case 3:r.reply=this.question.threeQuestion;break;
        default:r.reply=this.diy_reply;
      }
      let self=this
      postReplyRecord(r).then(()=>{
        putQuestionRIndex(this.question).then(()=>{
          showMsgBox('回答完成')
          self.$emit("test")
        })
      })
    },
    diyOpen(){
      ElMessageBox.prompt('请输入回答内容', '自定义回答', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        customStyle:'width:80%',
        inputType:"textarea"
      })
          .then((v) => {
            this.diy_reply=v.value.replace(/\n/g,'<br/>')
            this.replayQuestion(4)
          })
          .catch(() => {
            showMsgBox('取消')
          })
    }
  }
}
</script>

<style>
#questionShow{
}
.el-row{
  margin-top: 5px;
}
.my_p{
  border:2px solid aquamarine;
  border-radius: 20px;
  padding: 10px;
  margin-top: -8px;
  width: 75%;
  font-size: 10px;
}
</style>
