<template>
  <el-row>
    <el-button type="primary" style="margin: 20px;position: fixed" @click="oldFile">浏览上一版本</el-button>
    <el-col>
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
      timer:60,
      ctrl_timer:'',
      loading:false,
      type:[],
      title:[],
      isCollapse: false,
      /* eslint-disable */
      content:``
      /* eslint-disable */,
    }
  },
  methods: {
    oldFile(){
      window.open(location.href.replace(/ArticlePage.*/g,'')+'OldArticlePage/'+this.$route.params.article, '_blank')
    }
  },
  props: [

  ],
  mounted() {
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

</style>
