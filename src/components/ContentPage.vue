<template>
  <el-row>
    <el-button type="primary" style="margin-left: 90%;position: fixed;margin-top: 2%" @click="openChat">打开评论区</el-button>

    <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :with-header="false">
        <div class="chat_title">
            给文章评分：
            <el-rate
                @change="change_score"
                v-model="article_score"
                :colors="colors">
            </el-rate>
        </div>
      <div class="chat_title">
        《{{ cur_title }}》当前评分：
        <el-rate disabled
                 @change="change_score"
                 v-model="origin_score"
                 :colors="colors">
        </el-rate>
      </div>
        <div class="chat_content">
          <el-table
              :data="chatData"
              stripe
              style="width: 100%">
            <el-table-column
                prop="author"
                width="80">
            </el-table-column>
            <el-table-column
                prop="content"
            label="评论区">
            </el-table-column>
          </el-table>
        </div>
        <div class="chat_box">
          <textarea cols="45" rows="4" v-model="chat_content"></textarea>
          <i @click="send_chat" class="el-icon-s-promotion send"/>
        </div>
    </el-drawer>

    <el-col :span="3" style="position: sticky;top: 0">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">open</el-radio-button>
        <el-radio-button :label="true">close</el-radio-button>
      </el-radio-group>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               :collapse="isCollapse">
        <el-submenu v-for="(item_type,index) of type" :index="item_type+index" :key="item_type+index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item_type.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="changeArticle" v-for="(item_title,index) of title" v-show="item_title.type===item_type.name" :index="item_title" :key="item_title+index">{{ item_title.title }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="item_type+index" key="item_type+index">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <router-link class="router_link" to="/"><span>Quit the document</span></router-link>
          </template>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <article class="markdown-body" v-html="content" v-loading="loading"></article>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  name: "ContentPage",
  data() {
    return {
      chatData: [],
      article_score:null,
      origin_score:5,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      cur_title:'title',
      drawer: false,
      direction: 'rtl',
      timer:60,
      ctrl_timer:'',
      loading:false,
      type:[],
      title:[],
      isCollapse: false,
      chat_content:'写下你的评论吧~',
      /* eslint-disable */
      content:`<!doctype html>
<html>
<head>
<meta charset='UTF-8'><meta name='viewport' content='width=device-width initial-scale=1'>
<title>Welcome to StuHub, an introductory article</title>
</head>
<body><h1 id='welcome-to-stuhub-an-introductory-article'>Welcome to StuHub, an introductory article. </h1>
<p><strong>It will teach you how to use the website.</strong> </p>
<p><strong>At present, the content of this site is relatively simple, but with the continuous development of this site, the content and types will become more and more abundant.</strong> </p>
<h3 id='on-the-left-side-of-your-screen-is-the-title-of-the-article-click-on-what-you-want-to-know-about-it'>On the left side of your screen is the title of the article, click on what you want to know about it!</h3>
<pre><code class='language-c' lang='c'>Hope you can get what you are looking for!
</code></pre>
</body>
</html>`
      /* eslint-disable */
    }
  },
  methods: {
    send_chat(){
      this.is_unLogin()
      if(sessionStorage.getItem('name')){
        axios.get(`https://www.lloydyide.cn/stuhub/getChat.php?title=${this.cur_title}&content=${this.chat_content}&author=${sessionStorage.getItem('name')}`).then(
            response=> {
              console.log(response)
              this.$message({
                message: '感谢您的评论！',
                type: 'success'
              });
              this.chat_content='写下你的评论吧～'
              axios.get(`https://www.lloydyide.cn/stuhub/getChatInf.php?title=${this.cur_title}`).then(
                  response=> {
                    this.chatData = response.data
                  }
              )
            }
        )
      }
    },
    change_score(){
      this.is_unLogin()
      if(!sessionStorage.getItem('name')) return

      axios.get(`https://www.lloydyide.cn/stuhub/getScore.php?title=${this.cur_title}&author=${sessionStorage.getItem('name')}&score=${this.article_score}`).then(
          response=> {
            console.log(response.data)
            //res.data是分数对象，求平均值
            let score_num = response.data.length
            this.origin_score = 0
            for(let i of response.data){
              console.log(i.score)
              this.origin_score += Number(i.score)
            }
            this.origin_score/=score_num
            console.log(this.origin_score)
            this.$message({
              message: '感谢您的评分！',
              type: 'success'
            });
          }
      )
    },
    openChat(){
      this.drawer=true
    },
    notifyMsg_loaded(title) {
      this.$notify({
        title: 'Successfully Loaded!',
        message: 'Hope you can find what you are looking for in \''+title+'\'',
        type: 'success'
      });
    },
    notifyMsg_normal(title) {
      this.$notify.info({
        title: 'Loading...',
        message: 'Requesting from the server \''+title+'\'',
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeArticle(e){
      //todo::加载评分，加载评论
      axios.get(`https://www.lloydyide.cn/stuhub/getChatInf.php?title=${e.index.title}`).then(
          response=> {
            this.chatData = response.data
          }
      )
      this.cur_title = e.index.title
      this.loading = true
      this.notifyMsg_normal(e.index.title)
      axios.get(`https://www.lloydyide.cn/stuhub/getContent.php?title='${e.index.title}'`).then(
          response=> {
            this.notifyMsg_loaded(e.index.title)
            this.content = response.data[0].content
            this.loading = false
          }
      )
    },
    is_unLogin(){
      if(!sessionStorage.getItem('name')){
        this.$message({
          message: '您还没有登陆，请返回主页登陆！',
          type: 'warning'
        });
      }
    }
  },
  props: [
    'welcomeFade'
  ],
  mounted() {
    axios.get(`https://www.lloydyide.cn/stuhub/getArticleType.php`).then(
        response=> {
          this.type = response.data
        }
    )
    axios.get(`https://www.lloydyide.cn/stuhub/getArticleTitle.php`).then(
        response=> {
          this.title = response.data
        }
    )
  }
}
</script>

<style scoped>
@import "github-markdown-css";
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 16rem;
  min-height: 0;
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
.chat_title{
  padding: 0.5rem;
  height: 4.5vh;
  width: 100%;
  display: flex;
  color: #61a4ff;
}
.chat_content{
  height: 80vh;
  width: 100%;
  overflow: auto;
}
.chat_box{
  height: 11vh;
  width: 100%;
  padding: 10px;
  display: flex;
}

/deep/ .el-rate__icon{
  font-size: 2rem;
}

textarea{
  box-shadow: 0 0 10px 0 #aaaaaa;
  border-radius: 20px;
  padding: 10px;
  border: none;
}

.send{
  font-size: 4rem;
  margin-left: 15px;
  color: #6382ff;
  transition: 300ms;
  cursor: pointer;
}

.send:hover{
  color: #4232ff;
  transition: 300ms;
}

</style>
