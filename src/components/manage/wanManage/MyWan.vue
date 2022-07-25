<template>
  <div id="myWan">
    <ShowDialog ref="showDialog"></ShowDialog>
    <AddDialog ref="addDialog" @change="myGetWanList"/>
    <SearchDialog ref="searchDialog" @search="getSearch"/>

    <el-row justify="center">
      <el-button type="success" @click="openAddDialog">添加</el-button>
      <el-button @click="openSearchDialog">查询</el-button>
      <el-button @click="information">通知</el-button>
    </el-row>

    <el-table :data="wanList" style="width: 100%"
              :row-style="{height:'35px'}"
              :cell-style="{padding:'0px'}">
      <el-table-column sortable prop="good" label="U" width="60px"/>
      <el-table-column prop="type" label="标题" width="auto">
        <template #default="scope">
          <p @click="showContentDialog(scope.row)">{{scope.row.type}}</p>
        </template>
      </el-table-column>
<!--      自定义日期显示格式-->
      <el-table-column label="时间" width="auto">
        <template #default="scope">
          <span v-text="dataFromat(scope.row.createTime)"/>
        </template>
      </el-table-column>
<!--      查看和编辑栏-->
      <el-table-column prop="content" label="操作" width="auto">
        <template #default="scope">
          <el-button-group>
            <el-button size="small" text @click="openChangeDialog(scope.row)">
              <el-icon>
                <Edit/>
              </el-icon>
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import AddDialog from './dialog/AddDialog'
import ShowDialog from "./dialog/ShowDialog";
import SearchDialog from "./dialog/SearchDialog";

import {_dataFormat, _information, getWanList} from "@/api/api";
import {Edit} from '@element-plus/icons-vue'

export default {
  name: "AddWanPage",
  components: {ShowDialog, SearchDialog, AddDialog , Edit},
  data() {
    return {
      wanList: [],
      wan: {
        id: '',
        content: '',
        type: ''
      },
    }
  },
  methods: {
    myGetWanList() {
      getWanList().then((res) => {
        this.wanList = res.data
      })
    },
    showContentDialog(d) {
      this.$refs.showDialog.title = d.type
      this.$refs.showDialog.content = d.content
      this.$refs.showDialog.show()
    },
    dataFromat(d) {
      return _dataFormat(d)
    },
    openAddDialog() {
      this.$refs.addDialog.update = true
      this.$refs.addDialog.wan = this.wan
      this.$refs.addDialog.show()
    },
    openChangeDialog(r) {
      this.$refs.addDialog.update = false
      this.$refs.addDialog.wan = r
      this.$refs.addDialog.show()
    },
    openSearchDialog() {
      this.$refs.searchDialog.show()
    },
    getSearch(r){
      this.wanList=r
    },
    information(){
      let user={
        // email:'2812451926@qq.com'
        email:'2547016180@qq.com'
      }
      _information(user).then(()=>{
      })
    }
  },
  created() {
    this.myGetWanList()
  }
}
</script>

<style scoped>
#myWan {
  margin-top: 10px;
}
</style>
