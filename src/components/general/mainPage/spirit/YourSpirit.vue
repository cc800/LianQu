<template>
<div>
  <YourInfoManageDialog ref="infoManage"/>
  <div v-loading="loading" style="position:relative;min-height:100px;z-index: 1000" >
    <el-button class="addButton" circle type="danger" @click="showInfoManage" size="small"></el-button>
    <img @click="get_my_info()" :src="image_url" class="my_absolute"/>
    <div v-if="my_info_show" class="tip"><p class="my_info_content" v-html="my_info"/></div>
  </div>
</div>
</template>

<script>
import {_getImage, getRandomInfo} from "@/api/api";
import YourInfoManageDialog from "@/components/general/mainPage/spirit/dialog/YourInfoManageDialog";

export default {
  components: {YourInfoManageDialog},
  data() {
    return {
      question: null,
      my_info_show: false,
      my_info: '正在等待消息...',
      image_url:'',
      loading:true
    }
  },
  methods: {
    get_my_info() {
      if (this.my_info_show === false) {
        getRandomInfo(1).then((res) => {
          this.my_info = res.data.info
          this.my_info_show = true
        })
      } else {
        this.my_info_show = false
      }
    },
    getSpiritImage(){
      this.loading=true
      _getImage(4).then((res)=>{
        this.image_url=res.data
        this.loading=false
      })
    },
    showInfoManage(){
      this.$refs.infoManage.show()
    }
  },
  created() {
    this.getSpiritImage()
  }
}
</script>

<style scoped>
.addButton{
  position: absolute;
  top:80px;
  left:5px;
  z-index: 1001;
}
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


.my_absolute {
  float: left;
  /*top: -20px;*/
  /*left: 60%;*/
  width: 30%;
  height: 100px;
}


.tip {
  float: left;
  margin-top: 20px;
  margin-right: 20px;
  min-height: 10px;
  width: 60%;
  height: auto;
  border: 1px solid #09F;
  border-radius:10px 10px 10px 10px;
  position: relative;
  background-color: #FFF;
  font-size: 10px;
  align-items: center;
  justify-content: center;
}

.tip:after {
  content: '';
  display: block;
  border-width: 6px;
  position: absolute;
  top: 5px;
  right: 100%;
  border-color:transparent #09F  transparent transparent ;
  border-style: dashed dashed dashed solid;
}

.my_info_content{
  margin: 5px;
  text-align: center;
  font-family: "YouYuan";
  font-weight:700;
}

</style>

