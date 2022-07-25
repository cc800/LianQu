<template>
  <div>
    <el-card class="my_card">
      <QuestionShow @test="myGetQuestion" v-if="question!==null" :question="question"/>
      <WanShow v-else/>
    </el-card>
      <div v-loading="loading" @click="get_my_info()" style="min-height:100px;z-index: 1000" >
        <img :src="image_url" class="my_absolute"/>
        <div v-if="my_info_show" class="tip"><p class="my_info_content" v-html="my_info"/></div>
      </div>
    <YourSpirit/>
  </div>
</template>

<script>
import {_getImage, getQuestion, getRandomInfo} from "@/api/api";
import WanShow from "@/components/general/mainPage/content/WanShow";
import QuestionShow from "@/components/general/mainPage/content/QuestionShow";
import YourSpirit from "@/components/general/mainPage/spirit/YourSpirit";

export default {
  props: {},
  components: {
    QuestionShow,
    WanShow,
    YourSpirit
  },
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
    myGetQuestion() {
      getQuestion().then((res) => {
        this.question = res.data
      })
    },
    get_my_info() {
      if (this.my_info_show === false) {
        getRandomInfo(0).then((res) => {
          this.my_info = res.data.info
          this.my_info_show = true
        })
      } else {
        this.my_info_show = false
      }
    },
    getSpiritImage(){
      this.loading=true
      _getImage(0).then((res)=>{
        this.image_url=res.data
        this.loading=false
      })
    }
  },
  created() {
    this.myGetQuestion()
    this.getSpiritImage()
  }
}
</script>

<style scoped>
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

.my_card {
  text-align: center;
  margin-top: 10px;
}

.my_absolute {
  float: right;
  width: 100px;
  height: 100px;
}


.tip {
  float: right;
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
  left: 100%;
  border-color: transparent transparent transparent #09F;
  border-style: dashed dashed dashed solid;
}

.my_info_content{
  margin: 5px;
  text-align: center;
  font-family: "YouYuan";
  font-weight:700;
}

/*.tip:after {*/
/*  left: -16px;*/
/*  border-color: transparent transparent #fff;*/
/*}*/
</style>
