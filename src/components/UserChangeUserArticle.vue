<template>
  <el-table
      :data="tableData"
      style="width: 100%;" max-height="750">
    <el-table-column
        prop="type"
        label="文章类别"
        width="400">
    </el-table-column>
    <el-table-column
        prop="title"
        label="文章"
        width="300">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="300">
      <template  slot-scope="scope">
        <el-button
            @click="toCommit(scope.$index, tableData)"
            type="text"
            size="small">
          编辑文章
        </el-button>
      </template>
    </el-table-column>

    <el-table-column
        fixed="right"
        label="操作"
        width="250">
      <template  slot-scope="scope">
        <el-button
            @click="delArticle(scope.$index, tableData)"
            type="text"
            size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    delArticle(index,tableData){
      let title = tableData[index].title
      axios.get(`https://www.lloydyide.cn/stuhub/delArticle.php?title=${title}`).then(
          response => {
            this.tableData = response.data
            axios.get(`https://www.lloydyide.cn/stuhub/getUserTitle.php?author=${sessionStorage.getItem('name')}`).then(
                response => {
                  this.tableData = response.data
                }
            )
          }
      )
    },
    notifyMsg_loaded() {
      this.$notify({
        title: 'Successfully Loaded!',
        type: 'success'
      });
    },
    notifyMsg_normal() {
      this.$notify.info({
        title: 'Loading...',
      });
    },
    toCommit(index,tableData){
      console.log(tableData[index].title)
      this.$router.push({name:'CommitPush',query:{title:tableData[index].title}});
    }
  },
  data() {
    return {
      tableData: [{}],
    }
  },
  mounted() {
    this.notifyMsg_normal()
    axios.get(`https://www.lloydyide.cn/stuhub/getUserTitle.php?author=${sessionStorage.getItem('name')}`).then(
        response => {
          this.tableData = response.data
          this.notifyMsg_loaded()
        }
    )
  }
}
</script>

<style scoped>
el-table {
  height: 100vh;
  overflow: auto;
}
</style>