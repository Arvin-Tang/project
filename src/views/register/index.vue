<template>
  <div class="register-page">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm register-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click = "toLogin" style="width: 120px; height: 40px; font-size: 10px"
          >已有账号,点我登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { register } from "@/api/user/user";
export default {
  data() {
    // 校验手机号
    const validatePhone = (rule, value, callback) => {
      const regExp =
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!regExp.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        phoneNumber: "",
        password: "",
        checkPass: "",
      },
      rules: {
        username: [{ required: true }],
        phoneNumber: [
          { required: true,  message: "请输入手机号", trigger: "blur" },
          {
            validator:validatePhone
          }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    toLogin(){
      this.$router.push("/login")
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.ruleForm)
            .then((res) => {
              console.log(res.data);
              this.$message({
                message: "注册成功",
                type: "success",
              });
              this.$router.push("/login");
            })
            .catch((err) => {
              err;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.register-form {
  width: 400px;
  height: 200px;
}
</style>
