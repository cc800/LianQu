<template>
  <div>
    <ShowRecordDialog ref="showDialog" @deleted="myGetRecordList"></ShowRecordDialog>
    <el-table height="60vh" v-loading="loading" :data="recordList" style="width: 100%">
      <el-table-column prop="title" label="标题" width="auto"/>
      <el-table-column label="时间" width="80px">
        <template #default="scope">
          <span v-text="dataFormat(scope.row.dataTime)"></span>
        </template>
      </el-table-column>
      <el-table-column label="详情" width="70px">
        <template #default="scope">
          <el-button size="small" text @click="show(scope.row)">
            <el-icon>
              <More/>
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {_dataFormat, getReplyRecordList} from "@/api/api";
import ShowRecordDialog from './dialog/ShowRecordDialog'
import {More} from '@element-plus/icons-vue'
import {ref} from "vue";

export default {
  components: {
    ShowRecordDialog,More
  },
  data() {
    return {
      recordList: [],
      loading:ref(true)
    }
  },
  methods: {
    myGetRecordList() {
      this.loading=true
      getReplyRecordList().then((res) => {
        this.recordList = res.data
        this.loading=false
      })
    },
    show(row) {
      this.$refs.showDialog.id=row.id
      this.$refs.showDialog.content = row.content
      this.$refs.showDialog.reply = row.reply
      this.$refs.showDialog.show()
    },
    dataFormat(d){return _dataFormat(d)}
  },
  created() {
    this.myGetRecordList()
  }
}
</script>

<style scoped>

</style>
