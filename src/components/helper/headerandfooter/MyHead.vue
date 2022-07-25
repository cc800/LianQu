<template>
  <div class="header" v-if="judge()">
    <nav>
      <img v-loading="loading" :src="image_url" class="test_absolute"/>
      <el-space spacer="|">
        <router-link to="/main">主页</router-link>
        <router-link to="/record">记录</router-link>
        <router-link to="/letter">信件</router-link>
      </el-space>
    </nav>
  </div>
  <div class="header" v-else-if="judgeManage()">
    <nav>
      <h3>管理界面</h3>
      <el-space spacer="|">
        <router-link to="/manage/wanManage">Wan</router-link>
        <router-link to="/manage/queManage">Que</router-link>
        <router-link to="/manage/infManage">Inf</router-link>
      </el-space>
    </nav>
  </div>
</template>

<script>
import {_getImage} from "@/api/api";

export default {
  name: "MyHead",
  data() {
    return {
      test: false,
      image_url:'',
      loading:true
    }
  },
  components: {
    // Expand
  },
  methods: {
    judge() {
      const whiteList = ["/login"]
      if (this.$route.fullPath.startsWith('/manage')|| whiteList.indexOf(this.$route.path) !== -1)
        return false
      else
        return true
    },
    judgeManage() {
      if (this.$route.fullPath.startsWith('/manage'))
        return true
      else
        return false
    },
    getImage(){
      this.loading=true
      _getImage(1).then((res)=>{
        this.image_url=res.data
        this.loading=false
      })
    }
  },
  created() {
    this.getImage()
  }
}
</script>

<style scoped>

h3{
  margin-top: 30px;
}

.header {
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


.test_absolute {
  width: 100%;
  height: 50px;
}
</style>
