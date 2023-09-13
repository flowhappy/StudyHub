<template>
  <div>

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
        <template>
          <el-button
              @click.native.prevent="dialogFormVisible = true"
              type="text"
              size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="新的用户名" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新的密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">提交更改</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import axios from "axios";

export default {
  methods: {
    editUser() {
      let {name, password} = {...this.form}
      let username = sessionStorage.getItem('name')
      if(name.length >= 3 && name.length <= 5 && password.length <= 8 && password.length >= 6){
        axios.get(`https://www.lloydyide.cn/stuhub/updateUserInf.php?name=${name}&pass=${password}&username=${username}`).then(
            response => {
              sessionStorage.setItem('name', this.form.name)
              axios.get(`https://www.lloydyide.cn/stuhub/getUserInf.php?name=${sessionStorage.getItem('name')}`).then(
                  response => {
                    this.users = response.data
                    console.log(response.data)
                    this.notifyMsg_loaded()
                  }
              )
              console.log(response.data)
              this.dialogFormVisible = false
            }
        )
      }else{
        this.$message.error('用户名3～5位，密码6～8位');
      }

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
      users: [{}],
      dialogFormVisible: false,
      form: {
        name: '',
        password: ''
      },
    }
  },
  mounted() {
    this.notifyMsg_normal()
    axios.get(`https://www.lloydyide.cn/stuhub/getUserInf.php?name=${sessionStorage.getItem('name')}`).then(
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
el-table {
  height: 100vh;
  overflow: auto;
}
</style>