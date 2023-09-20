<template>
  <el-row>
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
        《{{ titleName }}》当前评分：
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
    <el-col>
      <div style="float: right">
        <el-button type="primary" style="margin-top: 2%;" @click="openChat">打开评论区</el-button>
        <el-button type="primary" style="margin-top: 2%;margin-right: 10px" @click="oldFile">浏览上一版本</el-button>
      </div>
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
      timer:60,
      ctrl_timer:'',
      loading:false,
      type:[],
      title:[],
      isCollapse: false,
      /* eslint-disable */
      content:``
      /* eslint-disable */,
      titleName:'',
      direction: 'rtl',
      chat_content:'写下你的评论吧~',

    }
  },
  methods: {
    send_chat(){
      this.is_unLogin()
      if(sessionStorage.getItem('name')){
        axios.get(`https://www.lloydyide.cn/stuhub/getChat.php?title=${this.titleName}&content=${this.chat_content}&author=${sessionStorage.getItem('name')}`).then(
            response=> {
              console.log(response)
              this.$message({
                message: '感谢您的评论！',
                type: 'success'
              });
              this.chat_content='写下你的评论吧～'
              axios.get(`https://www.lloydyide.cn/stuhub/getChatInf.php?title=${this.titleName}`).then(
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

      axios.get(`https://www.lloydyide.cn/stuhub/getScore.php?title=${this.titleName}&author=${sessionStorage.getItem('name')}&score=${this.article_score}`).then(
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
      axios.get(`https://www.lloydyide.cn/stuhub/getChatInf.php?title=${this.titleName}`).then(
          response=> {
            this.chatData = response.data
          }
      )
    },
    oldFile(){
      window.open(location.href.replace(/ArticlePage.*/g,'')+'OldArticlePage/'+this.$route.params.article, '_blank')
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

  ],
  mounted() {
    this.titleName = this.$route.params.article
    console.log(this.$route.params.article)
    axios.get(`https://www.lloydyide.cn/stuhub/getContent.php?title='${this.$route.params.article}'`).then(
        response=> {
          this.content = response.data[0].content
          this.loading = false
          console.log(response.data[0].content)
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
