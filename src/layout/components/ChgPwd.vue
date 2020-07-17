<template>
  <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="chg-pwd">
      <el-form-item label="原密码" prop="oldPass">
        <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { chgpwd } from '@/api/user'
  import elValidate from '@/utils/elValidate'
  export default {
    name: 'ChgPwd',
    data() {
      return {
        dialogVisible: false,
        ruleForm: {
          pass: '',
          checkPass: '',
          oldPass: ''
        },
        rules: {
          oldPass: [{
            label: "原密码",
            validator: elValidate.notNull,
            trigger: 'blur'
          }],
          pass: [{
            label: "新密码",
            validator: elValidate.notNull,
            trigger: 'blur'
          }],
          checkPass: [{
            label: "确认密码",
            validator: elValidate.notNullAndEqual,
            trigger: 'blur',
            ref: this,
            refForm: 'ruleForm',
            refField: 'pass',
          }],
        }
      };
    },
    computed: {
      ...mapGetters({
        username: 'user/username',
        token: 'user/token'
      }),
    },
    methods: {

      showDialog() {
        this.dialogVisible = true;
      },
      closeDialog() {
        this.dialogVisible = false;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert("username"+this.username);
            var userInfo = {username: this.username, password: this.ruleForm.oldPass, newpassword: this.ruleForm.pass}
            chgpwd(userInfo).then(response=>{
              const {data} = response;
              if(response.code==20000){
                alert("修改密码成功");
                this.closeDialog();
                this.resetForm(formName);
                return true;
              }else{
                alert(response.message);
                return true;
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
