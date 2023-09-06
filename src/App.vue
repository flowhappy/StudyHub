<template>
  <div id="app">
    <router-view>

    </router-view>
    <!--  类别介绍页面  -->
    <!--  搜索页面  -->

    <!--  管理员管理文章页面  -->
    <!--  管理员管理用户页面  -->
    <!--  用户管理文章页面  -->
  </div>
</template>

<script>
import 'animate.css';
export default {
  name: 'App',
  components: {

  },
  data(){
    return{
    }
  },
  methods:{
  }

}
</script>

<style>
@import "github-markdown-css";
.el-dialog{
  background-color: rgba(255,255,255,0.9);
  border-radius: 20px;
}
body{
  background-color: #FFECE9;
  transition: 300ms !important;
}

.router_link{
  text-decoration: none;
  color:#3cb371
}

.router_btn:hover .router_link{
  color: #FFECE9;
  transition: 300ms;
}
</style>
