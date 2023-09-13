<template>
  <el-table
      :data="users"
      style="width: 100%;" max-height="750">
    <el-table-column
        fixed
        prop="id"
        label="ID"
        width="300">
    </el-table-column>
    <el-table-column
        prop="username"
        label="用户名"
        width="300">
    </el-table-column>
    <el-table-column
        prop="password"
        label="密码"
        width="300">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="300">
      <template slot-scope="scope">
        <el-button
            @click.native.prevent="deleteUser(scope.$index, users)"
            type="text"
            size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    deleteUser(index, users) {
      let userid = users[index].id
      axios.get(`https://www.lloydyide.cn/stuhub/delUser.php?id=${userid}`).then(
          response => {
            this.tableData = response.data
            axios.get(`https://www.lloydyide.cn/stuhub/getAllUsers.php`).then(
                response => {
                  this.users = response.data
                  console.log(response.data)
                  this.notifyMsg_loaded()
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
    }
  },
  data() {
    return {
      users: [{

      }]
    }
  },
  mounted() {
    this.notifyMsg_normal()
    axios.get(`https://www.lloydyide.cn/stuhub/getAllUsers.php`).then(
        response => {
          this.users = response.data
          console.log(response.data)
          this.notifyMsg_loaded()
        }

    )
  }
}
</script>

<style scoped>
el-table{
  height: 100vh;
  overflow: auto;
}
</style>