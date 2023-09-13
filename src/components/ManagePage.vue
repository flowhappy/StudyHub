<template>
  <div style="height: 100vh;overflow: hidden">
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1" @click="backHome">
        <i class="el-icon-back"></i>
        退出后台管理
      </el-menu-item>
    </el-menu>
    <el-row class="tac" >
      <el-col :span="4" id = 'menubar1'>
        <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/ChangeUserName" id="deluser">
                  删除用户
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <router-link to="/ChangeUserArticle">
                  删除文章
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-col>
      <el-col :span="20">
          <div class="backContent">
            <router-view>

            </router-view>
          </div>
      </el-col>
    </el-row>
  </div>

</template>


<script>
// import axios from 'axios'

export default {
  name: "ClassPage",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    backHome(){
      this.$router.push('/')
    }
  },
  data() {
    return {
      title: [],
    }
  },
  // mounted() {
  //   axios.get(`https://www.lloydyide.cn/stuhub/getArticleTitle.php`).then(
  //       response => {
  //         this.title = response.data
  //         console.log(response.data)
  //       }
  //   )
  // }
}
</script>

<style scoped>
body{
  background-color: white;
}
#menubar1 ul{
  height: 100vh;
}
.backContent{
  height: 100%;
  width: 100%;
  //border-radius: 20px;
  //box-shadow: 0 0 35px 0 #aaaaaa;
  //margin: 10px;
}
router-link{
  text-decoration: none;
}
a{
  text-decoration: none;
  color: white;
}
</style>
