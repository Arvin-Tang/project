<template>
  <div class="login-page">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm login-form"
    >
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

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="login"
          >
          注册
          </el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import { login } from "@/api/user/user";
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

    // 校验密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        phoneNumber: "",
        password: "",
      },
      rules: {
        phoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: validatePhone,
            message: "请输入正确的手机号",
            trigger: ["blur"],
          },
        ],
        password: [
          { validator: validatePass, trigger: "blur", required: true },
        ],
      },
    };
  },
  methods: {
    login(){
      this.$router.push("/register")
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm)
            .then((res) => {
              let { token } = res.data;
              localStorage.setItem("token", token);
              const decoded = jwt_decode(token);
              console.log(decoded);
              // 存储到vuex
              this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
              this.$store.dispatch("setUser", decoded);
              this.$router.push("/home");
            })
            .catch((err) => err);
        } else {
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-form {
  width: 400px;
  height: 200px;
}
</style>
