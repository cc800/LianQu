<template>
  <el-dialog
      v-model="visibleIndex"
      width="80%"
      :center="true"
      :show-close="false">
    <div>
      <el-tabs @tab-click="clearContent">
        <el-tab-pane label="ByName">
          <el-input placeholder="输入标题" v-model="type"></el-input>
        </el-tab-pane>

        <el-tab-pane label="ByDate">
          <div class="demo-date-picker">
            <div class="block">
              <el-date-picker
                  v-model="startTime"
                  type="date"
                  placeholder="from"
                  style="width: auto"
              />
              <el-date-picker
                  v-model="endTime"
                  type="date"
                  placeholder="to"
                  style="width: auto"
              />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <template #footer>
      <div align="center">
        <el-button-group>
          <el-button @click="search">查询</el-button>
          <el-button @click="close">关闭</el-button>
        </el-button-group>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import {_dataFormat, searchWanByData, searchWanByName} from "@/api/api";

export default {
  name: "SearchDialog",
  data() {
    return {
      visibleIndex: false,
      startTime: '',
      endTime: '',
      type: ''
    }
  },
  methods: {
    show() {
      this.visibleIndex = true
    },
    close() {
      this.visibleIndex = false
    },
    clearContent() {
      this.type = ''
      this.endTime = ''
      this.startTime = ''
    },
    search() {
      if (this.type !== '')
        searchWanByName(this.type).then((res) => {
          this.$emit('search', res.data)
          this.close()
        })
      else
        searchWanByData(this.startTime, _dataFormat(this.endTime)).then((res) => {
          this.$emit('search', res.data)
          this.close()
        })
    }
  }
}
</script>

<style scoped>

</style>
