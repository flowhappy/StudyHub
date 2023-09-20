<template>
  <div>
    <el-dialog
        title="Update?"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="name" prop="name">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="type" prop="name">
          <el-input v-model="ruleForm.type"></el-input>
        </el-form-item>
        <el-button @click="centerDialogVisible = false" style="margin-left: 6rem">cancel</el-button>
        <el-button type="primary" @click="publishArticle">update
        </el-button>
      </el-form>

    </el-dialog>
    <el-dialog
        title="Share Edit?"
        :visible.sync="centerDialogVisibleShare"
        width="30%"
        center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="共享口令">
          <el-input v-model="codes"></el-input>
        </el-form-item>

        <el-button @click="centerDialogVisibleShare = false" style="margin-left: 6rem">cancel</el-button>
        <el-button type="primary" @click="confirm_share">share
        </el-button>
      </el-form>

    </el-dialog>
    <div :class="{animate__animated:true, animate__fadeIn:true}">
      <commit-menu :publish="publish" :share="share" v-if="!is_edit"/>
      <stop-share-menu :stopShare="stopShare" v-if="is_edit"/>
      <el-skeleton :rows="5" animated  v-if="is_edit" style="margin: 50px;"/>
      <el-skeleton :rows="5" animated  v-if="is_edit" style="margin: 50px;"/>
      <el-skeleton :rows="5" animated  v-if="is_edit" style="margin: 50px;"/>
      <div id="editor" style="height: 90vh" v-if="!is_edit">
        <textarea id="md-area" @keyup=mdConverter() v-model="md"></textarea>
        <article style="overflow: scroll" id="view-area" v-html="content" class="markdown-body"></article>
      </div>

    </div>
  </div>
</template>

<script>
import showdown from 'showdown'
import table from 'showdown-table'
import commitMenu from "@/components/CommitMenu";
import axios from "axios";
import stopShareMenu from "@/components/StopShareMenu.vue";

export default {
  name: "CompilePush",
  components: {
    commitMenu,
    stopShareMenu
  },
  data() {
    return {
      author:'',
      codes:'对方输入你的口令才可以编辑文章',
      is_edit:false,
      md: `# Text Here
       When you ready to publish your article, click the Publish`,
      content: "",
      centerDialogVisible: false,
      centerDialogVisibleShare:false,
      title:'',
      ruleForm: {
        name: '',
        type: '',
      },
      rules: {
        name: [
          { required: true, message: 'Please enter the article name.', trigger: 'blur' },
        ],
        type: [
          { required: true, message: 'Please enter article type', trigger: 'blur' },
        ],
      }
    }
  },
  props: [

  ],
  methods: {
    confirm_share(){
      this.$confirm('共享期间您无法修改文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        //给onedit库增加一个 code 字段，共享时上传共享口令
        //非作者编辑时，输入共享口令

        axios.get(
            `https://www.lloydyide.cn/stuhub/updateCode.php?code=${this.codes}&title=${this.$route.query.title}`).then(res=>{
          console.log(res)
          this.$message({
            type: 'success',
            message: '成功创建共享密码!'
          });
        })

        this.$message({
          type: 'success',
          message: '共享成功!'
        });
        this.is_edit = true
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消共享'
        });
      });
      this.centerDialogVisibleShare = false
    },
    mdConverter() {
      let converter = new showdown.Converter({extensions: [table]});
      this.content = converter.makeHtml(this.md);
    },
    publish(){
      this.centerDialogVisible = true
    },
    stopShare(){
      this.is_edit=false
      axios.get(
          `https://www.lloydyide.cn/stuhub/getMd.php?title=${this.$route.query.title}`).then(res=>{
        console.log(res)
        this.md = res.data[0].md
        this.ruleForm.name = res.data[0].title
        this.title = res.data[0].title
        this.ruleForm.type = res.data[0].type
        this.mdConverter();
      })
    },
    share(){
      this.centerDialogVisibleShare = true
    },
    publishArticle(){
      let md = this.md.replace(/\s/g,'%20');
      md = this.md.replace(/#/g,'%23');
      if(this.author!==sessionStorage.getItem('name')){
        this.$message({
          message: '您不是原作者，没有权限发布文章，请联系文章作者。',
          type: 'warning'
        });
        axios.get(
            `https://www.lloydyide.cn/stuhub/getEdit.php?md=${md}&title=${this.title}`).then(res=>{
          console.log(res)
          this.$message({
            message: '您的编辑信息已保存',
            type: 'success'
          })
        })
        return
      }
      let {name,type} = {...this.ruleForm}
      let content = this.content.replace(/\s/g,'%20');
      console.log(this.content)
      if(name&&type){
        console.log(md)
        axios.get(
            `https://www.lloydyide.cn/stuhub/initOldArticle.php?title=${this.$route.query.title}`).then(res=>{
          console.log(res)
          axios.get(
              `https://www.lloydyide.cn/stuhub/updateArticle.php?name=${name}&type=${type}&content=${content}&md=${md}&title=${this.title}`).then(res=>{
            console.log(res)
            this.$router.push({ name: 'ArticlePage', params: { article: name } });
          })
        })

      }
    }
  },
  mounted() {
    //https://www.lloydyide.cn/stuhub/getMd.php?title=2

    axios.get(
        `https://www.lloydyide.cn/stuhub/getMd.php?title=${this.$route.query.title}`).then(res=>{
      console.log(res)
      if(res.data[0]){
        this.md = res.data[0].md
        this.author = res.data[0].author
        this.ruleForm.name = res.data[0].title
        this.title = res.data[0].title
        this.ruleForm.type = res.data[0].type
        this.mdConverter();
      }else{
        console.log('edit')
        axios.get(
            `https://www.lloydyide.cn/stuhub/initEdit.php?title=${this.$route.query.title}`).then(res=>{
          console.log(res)
          this.md = res.data[0].md
          this.author = res.data[0].author
          this.ruleForm.name = res.data[0].title
          this.title = res.data[0].title
          this.ruleForm.type = res.data[0].type
          this.mdConverter();
        })
      }
      console.log(sessionStorage.getItem('name'))
      console.log(this.author)
      if(this.author!==sessionStorage.getItem('name')){
        this.$prompt('请输入共享密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let author_code = ''
          axios.get(
              `https://www.lloydyide.cn/stuhub/getCode.php?title=${this.$route.query.title}`).then(res=>{
            console.log(res)
            author_code = res.data[0].code
            if(author_code!==value){
              this.$message({
                type: 'warning',
                message: '密码错误'
              });
              setTimeout(()=>{
                location.reload()
              },1500)
            }else{
              this.$message({
                type: 'success',
                message: '您可以开始编辑了！ '
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
          setTimeout(()=>{
            location.reload()
          },2000)
        });
      }
    })


  }
}
</script>

<style scoped>
.el-drawer{

}
#md-area, #view-area {
  margin: 1rem;
}

#editor {
  display: flex;
  min-height: 80vh;
  width: 100%;
}

#md-area {
  width: 49vw;
  box-shadow: 0 0 30px 0 #eeeeee;
  border: 0;
  border-radius: 20px;
  padding: 20px;
}

#view-area {
  width: 49vw;
  box-shadow: 0 0 30px 0 #eeeeee;
  border-radius: 20px;
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