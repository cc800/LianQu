<template>
  <el-dialog v-model="dialogVisible" width="75%">
    <h4 style="margin-top: -20px" v-html="content"></h4>
  </el-dialog>
</template>

<script>
export default {
  name: "ShowDialog",
  data() {
    return {
      dialogVisible: false,
      content: ''
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
