<template>
  <div>
    <router-view></router-view>

    <button class="titleBtn searchInput" @click="openSearch">Search <i class="el-icon-search"/></button>
    <el-drawer
        style="text-align: center"
        title="查询你想找的文章（支持模糊查询）"
        :visible.sync="drawer"
        direction="ttb"
        size="100%">

      <el-input @keyup.native="searchTitle" style="width: 50vw" v-model="searchTxt" placeholder="请输入内容"></el-input>

      <el-table
          :data="titleData"
          @current-change="toArticle"
          stripe
          style="width: 50vw;margin: auto">
        <el-table-column
            prop="title"
            label="相似结果："
            width="1000">
        </el-table-column>
      </el-table>




    </el-drawer>

    <div style="background-color: #FFECE9"
         :class="{animate__animated:true}">
      <el-row class="rowMain">
        <el-col :span="9">
          <div class="fontMain">
            <i>StuHub</i>
          </div>
          <div class="bIntro">
            <div style="line-height: 0;font-size: 3rem">"</div>
            In StuHub, <br>
            you can find all kinds of learning resources, <br>
            you can publish your articles <br>
            you can share your points <br>
            you can find like-minded people <br>
            you come here to make progress&nbsp;<div style="line-height: 0;font-size: 3rem;display: inline-block">"
          </div>
          </div>
          <div style="margin: 3rem" class="animate__animated animate__fadeInUp">
            <button class="titleBtn" @click="signIn = true" v-show="!loginUser">SignIn <i class="el-icon-hot-water"/>
            </button>
            <button class="titleBtn" @click="signOut" v-show="loginUser">SignOut <i class="el-icon-hot-water"/></button>
            <button class="titleBtn" @click="reg">SignUp <i class="el-icon-coffee-cup"/></button>
            <button class="titleBtn titleBtn2" @click="toClass">
              Enter the management<i class="el-icon-cold-drink"/>
            </button>
            <button class="titleBtn titleBtn2 router_btn" > <router-link class="router_link" to="/ContentPage"> {{ enterMessage }}</router-link><i class="el-icon-cold-drink"/>
            </button>
            <button class="titleBtn titleBtn2 router_btn">
              <router-link class="router_link" event="click.prevent"  @click.native="can_edit" to="/CompilePush">
              {{ editMessage }}</router-link><i class="el-icon-cold-drink"/>
            </button>
          </div>
        </el-col>
        <el-col :span="15" style="height: 100vh;overflow: hidden;z-index: 1">
          <video src="../assets/welcome.mp4" muted autoplay loop/>
        </el-col>
      </el-row>


    </div>
    <el-dialog
        title="SignIn"
        :visible.sync="signIn"
        width="30%"
        center>
      <el-form :model="InForm" status-icon :rules="InRules">
        <el-form-item label="username" prop="name">
          <el-input v-model="InForm.name"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="pass">
          <el-input type="password" v-model="InForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSignIn">SignIn</el-button>
          <el-button @click="signIn=false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
        title="SignUp"
        :visible.sync="signUp"
        width="30%"
        center>
      <el-form :model="UpForm" status-icon :rules="UpRules">
        <el-form-item label="username" prop="name">
          <el-input v-model="UpForm.name"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="pass">
          <el-input type="password" v-model="UpForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="check password" prop="checkPass">
          <el-input type="password" v-model="UpForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSignUp">SignUp</el-button>
          <el-button @click="signUp=false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "WelcomeStuHub",
  components: {},

  data() {
    var inPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter the password'));
      }

      callback()
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter the password'));
      }
      callback();

    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter the password again'));
      } else if (value !== this.UpForm.pass) {
        callback(new Error('The password entered twice is inconsistent!'));
      } else {
        callback();
      }
    };
    return {
      titleData: [{}],
      editMessage: 'Compile and Publish',
      loginUser: sessionStorage.getItem('name'),
      enterMessage:  sessionStorage.getItem('name')==null?'Enter directly without login':'Welcome ' + sessionStorage.getItem('name') + '! Let\' get started!',
      signIn: false,
      signUp: false,
      InForm: {
        name: '',
        pass: '',
      },
      InRules: {
        pass: [
          {validator: inPass, trigger: 'blur'},
          {required: 'yes', min: 6, max: 8, message: 'length in 6 to 8 characters'}
        ],
        name: [
          {required: 'yes', message: 'input your name', trigger: 'blur'},
          {min: 3, max: 5, message: 'length in 3 to 5 characters', trigger: 'blur'}
        ],
      },
      UpForm: {
        pass: '',
        checkPass: '',
        name: ''
      },
      UpRules: {
        name: [
          {required: 'yes', message: 'input your name', trigger: 'blur'},
          {min: 3, max: 5, message: 'length in 3 to 5 characters', trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'},
          {required: 'yes', min: 6, max: 8, message: 'length in 6 to 8 characters'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'},
          {required: 'yes'}
        ]
      },
      searchTxt:'',
      drawer:false
    }
  },
  props: [
  ],
  methods: {
    toArticle(e){
      console.log(e.title)
      window.open(location.href+'ArticlePage/'+e.title, '_blank')
    },
    openSearch(){
      this.drawer = true
    },
    toClass(){
      if(this.loginUser === 'admin'){
        this.$router.push('/ManagePage');
      }else if(this.loginUser){
        this.$router.push('/UserManagePage');
      }else{
        this.welError('You should SignIn first')
      }
    },
    can_edit(event){
      if(!this.loginUser){
        event.preventDefault();
        this.welError('You should SignIn first')
      }else{
        this.$router.push('/CompilePush');
      }
    },
    reg() {
      if (this.loginUser) {
        this.welError('oops.. You should SignOut first!')
      } else {
        this.signUp = true
      }
    },
    signOut() {
      this.loginUser = ''
      this.enterMessage = 'Enter directly without login'
      sessionStorage.removeItem('name')
      this.welSuccess('Sign Out Successfully!')
    },
    welSuccess(message) {
      this.$message({
        message,
        type: 'success'
      });
    },
    welError(msg) {
      this.$message.error(msg);
    },
    onSignUp() {
      let {pass, checkPass, name} = {...this.UpForm}
      if(name==='admin'){
        this.$message.error('用户名不可为admin');
        return
      }
      console.log(pass + name)
      if (pass === checkPass && pass && name.length >= 3 && name.length <= 5 && pass.length <= 8 && pass.length >= 6) {
        axios.post(`https://www.lloydyide.cn/stuhub/signup.php?name='${name}'&pass='${pass}'`).then(
            response => {
              if (response.data === 1) {
                this.signUp = false;
                this.welSuccess('Successful registration!');
                setTimeout(() => {
                  this.signIn = true
                }, 800)
              } else {
                this.welError(response.data)
              }
            }
        )
      }
    },
    onSignIn() {
      let {pass, name} = {...this.InForm}
      if (pass.length <= 8 && pass.length >= 6 && name.length >= 3 && name.length <= 5) {
        axios.get(`https://www.lloydyide.cn/stuhub/signin.php?name=${name}&pass=${pass}`).then(
            res => {
              if (res.data === 1) {
                this.welSuccess('Successfully logged in!')
                this.loginUser = name;
                this.enterMessage = 'Welcome ' + name + '! Let\' get started!'
                sessionStorage.setItem('name',name)
                this.signIn = false
                setTimeout(() => {
                  this.welSuccess('Welcome to the StuHub! ' + name);
                }, 800)
              } else {
                this.welError(res.data)
              }
            }
        )
      }
    },
    searchTitle(){
      if(!this.searchTxt){
        this.titleData = []
        return
      }
      axios.get(`https://www.lloydyide.cn/stuhub/getLikelyTitle.php?title=${this.searchTxt}`).then(
          response=> {
            console.log(response.data)
            this.titleData = response.data
          }
      )
    }
  },
  watch: {
    loginUser(newValue) {
      if (!newValue) this.enterMessage = 'Enter directly without login'
    }
  }
}
</script>

<style scoped>

.bIntro {
  line-height: 2.2rem;
  margin: 1rem 3rem 4rem 4rem;
  font-size: 1.3rem;
  color: #D35854;
}

#app {
  width: 100%;
  background-color: #FFECE9 !important;
}

.rowMain {
  /*height: 48rem;*/
  overflow: hidden;
}

.titleBtn {
  line-height: 3rem;
  border-radius: 20px;
  width: 10rem;
  border: 2px solid #D35854;
  color: #D35854;
  font-weight: bold;
  font-size: 1.2rem;
  background-color: rgba(0, 0, 0, 0);
  margin-left: 2rem;
  transition: 300ms;
}

.titleBtn2 {
  width: 22rem;
  margin-top: 1.3rem;
  border-color: mediumseagreen;
  color: mediumseagreen;
}

.titleBtn2:hover {
  background-color: mediumseagreen !important;
  scale: 1;
}

.titleBtn:hover {
  cursor: pointer;
  background-color: #D35854;
  color: #FFECE9;
  scale: 1.2;
}

el-col {
  overflow: hidden;
}

div {
  font-family: Helvetica;
}

.fontMain {
  margin-top: 2rem;
  font-size: 8rem;
  line-height: 10rem;
  font-weight: 900;
  background-image: -moz-linear-gradient(90deg, rgba(255, 0, 136, 0.82), rgba(103, 0, 255, 0.89));
  background-image: -webkit-linear-gradient(90deg, rgba(255, 0, 136, 0.82), rgba(103, 0, 255, 0.89));
  background-image: linear-gradient(90deg, rgba(255, 0, 136, 0.82), rgba(103, 0, 255, 0.89));
  -webkit-background-clip: text;
  color: transparent;
  padding: 1rem;
}

video {
  transform: translateY(-3rem);
  width: 63rem;
  height: 63rem
}

.searchInput{
  position: fixed;
  margin-left: 85vw;
  margin-top: 1vh;
  z-index: 99;
}

el-drawer{
  z-index: 9999;
  background-color: red;
}

/deep/.el-drawer.ttb {
  opacity: 85%;
}

</style>