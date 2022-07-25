<template>
  <div class="footer" v-if="judge()">
    <div>
      <img style="height: 15vh;width: 100%" :src="image_url"/>
      <p class="footer_info" v-html="footer_info"></p>
    </div>
  </div>
</template>

<script>
import {_getImage} from "@/api/api";

export default {
  name: "MyFooter",
  data(){
    return{
      footer_info:"Powered By Blank_Fox<br>smg:bD0&aH9&fE1&eC2?",
      image_url:'',
      loading:true
    }
  },
  methods:{
    judge() {
      const whiteList = ["/login", "/loginpassword"]
      if (this.$route.fullPath.startsWith('/manage')||this.$route.fullPath.startsWith('/main')  || whiteList.indexOf(this.$route.path) !== -1)
        return false
      else
        return true
    },
    getFooterImage(){
      this.loading=true
      _getImage(2).then((res)=>{
        this.image_url=res.data
        this.loading=false
      })
    }
  },
  created() {
    this.getFooterImage()
  }
}
</script>

<style scoped>
.footer_info{
  text-align: center;
  font-size: 10px;
  width: 100%;
  height: 5vh;
}
</style>
