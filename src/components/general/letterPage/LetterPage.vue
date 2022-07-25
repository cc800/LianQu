<template>
  <div :key="reload">
    <ShowLetterDialog @close="closeDialog" ref="showLetterDialog"></ShowLetterDialog>
    <el-table height="60vh" v-loading="loading" :data="letterList" style="width: 100%">
      <el-table-column prop="title" label="标题" width="auto"/>
      <el-table-column label="时间" width="80px">
        <template #default="scope">
          <span v-text="dataFormat(scope.row.date)"></span>
        </template>
      </el-table-column>
      <el-table-column label="详情" width="70px">
        <template #default="scope">
          <el-button size="small" text @click="show(scope.row)">
            <el-icon :size="20" :color="scope.row.tcolor">
              <Message/>
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {_dataFormat, getLetterList} from "@/api/api";
import {Message} from '@element-plus/icons-vue'
import {ref} from "vue";
import ShowLetterDialog from './dialog/ShowLetterDialog'

export default {
  components: {
    Message, ShowLetterDialog
  },
  data() {
    return {
      letterList: [],
      loading: ref(true),
      reload:false
    }
  },
  methods: {
    myGetRecordList() {
      this.loading = true
      getLetterList().then((res) => {
        this.letterList = res.data
        this.loading = false
      })
    },
    show(row) {
      // console.log(row)
      this.$refs.showLetterDialog.url = row.url
      this.$refs.showLetterDialog.show()
    },
    dataFormat(d) {
      return _dataFormat(d)
    },
    closeDialog(){
      this.reload=!this.reload
    }
  },
  created() {
    this.myGetRecordList()
  }
}
</script>

<style scoped>

</style>
