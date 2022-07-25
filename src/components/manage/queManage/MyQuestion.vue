<template>
  <div id="my_question">
    <ShowDialog ref="showDialog"/>
    <AddDialog ref="addDialog"/>
    <el-row justify="center">
      <el-button @click="openAddDialog">新增</el-button>
      <el-button>查询</el-button>
    </el-row>

    <el-table :data="questionList" width="100%"
              :row-style="{height:'35px'}"
              :cell-style="{padding:'0px'}">
      <el-table-column label="标题" width="auto">
        <template #default="scope">
          <p @click="showDialog(scope.row)">{{ scope.row.title }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100px">
        <template #default="scope">
          <el-button-group>
            <el-button circle text v-if="scope.row.replyIndex===false" @click="changeComboIndex(scope.row)">
              <el-icon v-if="scope.row.comboIndex===true" color="#008000">
                <Check/>
              </el-icon>
              <el-icon v-else color="#FF0000">
                <Close/>
              </el-icon>
            </el-button>
            <el-button circle text @click="openChangeDialog(scope.row)">
              <el-icon color="#483D8B">
                <Edit/>
              </el-icon>
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <RecordPage/>
  </div>
</template>

<script>
import {Check, Close, Edit} from '@element-plus/icons-vue'
import {getQuestionList, putQuestionCIndex} from "@/api/api";
import ShowDialog from "@/components/manage/queManage/dialog/ShowDialog";
import AddDialog from "@/components/manage/queManage/dialog/AddDialog";
import RecordPage from "@/components/general/recordPage/RecordPage";

export default {
  name: "MyQuestion",
  components: {RecordPage, AddDialog, Check, Close, Edit, ShowDialog},
  data() {
    return {
      activeName: 'one',
      questionList: [{
        id: '',
        title: '标题',
        content: '内容',
        comboIndex: false,
        replyIndex: false
      }]
    }
  },
  methods: {
    getData() {
      getQuestionList().then((res) => {
        this.questionList = res.data
      })
    },
    showDialog(row) {
      this.$refs.showDialog.q = row
      this.$refs.showDialog.show()
    },
    changeComboIndex(i) {
      console.log(i)
      putQuestionCIndex(i).then(() => {
        this.getData()
      })
    },
    openAddDialog() {
      this.$refs.addDialog.q = {
        title: '',
        content: '',
        oneQuestion: '',
        twoQuestion: '',
        threeQuestion: ''
      }
      this.$refs.addDialog.addIndex = true
      this.$refs.addDialog.show()
    },
    openChangeDialog(row) {
      this.$refs.addDialog.q = row
      this.$refs.addDialog.addIndex = false
      this.$refs.addDialog.show()
    },
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
</style>
