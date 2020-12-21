<template>
  <el-header class="navbar" style="width:100%">
    <el-dropdown style="float:right;">
      <el-button type="info" icon="el-icon-user"  circle></el-button>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  @click.native="$refs.chgPwd.showDialog();">修改密码</el-dropdown-item>
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item @click.native="handleLogout" divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>


    <chg-pwd ref="chgPwd" />


  </el-header>
</template>

<script>
  import { logout } from '@/api/user'
  import ChgPwd from './ChgPwd'
  import { mapActions } from 'vuex'

  export default {
    name: 'Navbar',
    data(){
      return {dialogVisible:false};
    },
    components: {
      ChgPwd
    },
    methods: {
      ...mapActions({
        _logout: "user/logout",
      }),

      handleLogout(){
        console.debug('logout')
        var userInfo = {username: '', token: ''}
        logout(userInfo).then(response=>{
          const {data} = response;
          this._logout();
          this.$router.push({
            path: '/login'
          })
        })
      }

    }
  }

</script>
