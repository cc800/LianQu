<template>
  <div id="mylogin" class="example1" :style="{backgroundImage: image_url}">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card class="marginTop10">
          <h1>登录界面</h1>
          <el-form>
            <el-switch style="margin-bottom: 10px" active-value="1" inactive-value="0" v-model="user.level"/>
            <el-form-item>
              <el-input v-model="user.name" placeholder="输入用户名">
                <template #prepend>
                  <el-icon>
                    <Avatar/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="user.password" placeholder="输入密码">
                <template #prepend>
                  <el-icon>
                    <Ticket/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="login">登录</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {_getImage, login} from "@/api/api";
import {ElMessage} from "element-plus";
import {Avatar, Ticket} from '@element-plus/icons-vue'

export default {
  components: {Avatar, Ticket},
  data() {
    return {
      user: {
        name: '',
        password: '',
        level: '0',
      },
      image_url: ''
    }
  },
  methods: {
    login() {
      login(this.user).then((res) => {
        if (res.data !== null) {
          localStorage.setItem("user",JSON.stringify(res.data))
          ElMessage({
            duration: 1000,
            type: 'success',
            message: '登录成功',
            center: true
          })
          sessionStorage.setItem("user", res.data)
          if (res.data.level !== '1')
            this.$router.push({path: '/main'})
          else
            this.$router.push({path: '/manage/wanManage'})
        } else {
          ElMessage({
            duration: 1000,
            type: 'error',
            message: '用户或密码错误',
            center: true
          })
        }
      })
    },
    getImage() {
      _getImage(3).then((res) => {
        this.image_url = res.data
        this.image_url='url('+this.image_url+')'
      })
    }
  },
  created() {
    let u=localStorage.getItem("user")
    if(u!==null){
      if(JSON.parse(u).level==='1')
        this.$router.push({path: '/manage/wanManage'})
      else
        this.$router.push({path: '/main'})
    }
    this.getImage()
  }
}

</script>

<style scoped>
#mylogin {
  text-align: center;
  height: 100vh;
}

.example1 {
  background-position: right bottom, left top;
  background-size: 100% 100%;
  background-repeat: no-repeat, repeat;
}

.marginTop10 {
  margin-top: 100px;
  text-align: center;
}
</style>
