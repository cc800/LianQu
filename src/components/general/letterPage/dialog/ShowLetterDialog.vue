<template>
  <el-dialog v-model="dialogVisible"
             width="90%"
             :before-close="close">
    <div v-loading="loading" style="margin-top: -50px">
      <p v-html="html"></p>
    </div>
  </el-dialog>

</template>
<script>
import axios from "axios";
import {ref} from "vue";

export default {
  data() {
    return {
      url: '',
      loading: ref(true),
      html: '',
      dialogVisible: false
    }
  },
  methods: {
    show() {
      this.load(this.url)
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
      this.$emit("close")
    },
    load(url) {
      this.loading = true
      if (url && url.length > 0) {
        // 加载中
        this.loading = true
        let param = {
          accept: 'text/html, text/plain'
        }
        axios.get(url, param).then((response) => {
          // 处理HTML显示
          this.html = response.data
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.html = '加载失败...'
        })
      }
    }
  }
}
</script>


<style>

</style>

