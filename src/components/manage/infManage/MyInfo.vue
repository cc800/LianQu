<template>
  <div>
    <AddDialog @change="myGetInfoList" ref="addDialog"/>
    <ShowDialog ref="showDialog"/>
    <el-row justify="center">
      <el-button round type="success" @click="openAddDialog">
        <el-icon>
          <Plus/>
        </el-icon>
        添加
      </el-button>
    </el-row>
    <el-table :data="infoList"
              :row-style="{height:'35px'}"
              :cell-style="{padding:'0px'}">
      <el-table-column label="标题">
        <template #default="scope">
          <p @click="showContent(scope.row)">{{ scope.row.title }}</p>
        </template>
      </el-table-column>
      <el-table-column label="开关" width="60px">
        <template #default="scope">
          <el-switch @change="changUindex(scope.row.id)" v-model="scope.row.useIndex"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间" width="80px">
        <template #default="scope">
          <p v-text="myDataFormat(scope.row.createTime)"></p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="60px">
        <template #default="scope">
          <el-button text @click="showChangeDialog(scope.row)">
            <el-icon>
              <Edit/>
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {Edit, Plus} from '@element-plus/icons-vue'
import {_dataFormat, getInfoList, putInfoUid, showMsgBox} from "@/api/api";
import ShowDialog from "@/components/manage/infManage/dialog/ShowDialog";
import AddDialog from "@/components/manage/infManage/dialog/AddDialog";

export default {
  name: "MyInfo",
  components: {AddDialog, ShowDialog, Edit, Plus},
  props:["sid"],
  data() {
    return {
      infoList: []
    }
  },
  methods: {
    myDataFormat(time) {
      return _dataFormat(time)
    },
    myGetInfoList() {
      let my_sid=0
      console.log(this.sid)
      if(this.sid!==undefined)
        my_sid=this.sid
      getInfoList(my_sid).then((res) => {
        this.infoList = res.data
      })
    },
    showContent(row) {
      this.$refs.showDialog.content = row.info
      this.$refs.showDialog.show()
    },
    openAddDialog() {
      this.$refs.addDialog.myInfo = {
        title: '',
        info: '',
      }
      this.$refs.addDialog.addIndex = true
      this.$refs.addDialog.show()
    },
    showChangeDialog(row) {
      this.$refs.addDialog.myInfo = row
      this.$refs.addDialog.addIndex = false
      this.$refs.addDialog.show()
    },
    changUindex(id) {
      putInfoUid(id).then(() => {
        showMsgBox("修改状态成功")
      })
    }
  },
  created() {
    this.myGetInfoList()
  }
}
</script>

<style scoped>

</style>
