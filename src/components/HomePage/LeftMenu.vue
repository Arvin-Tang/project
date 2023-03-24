<template>
  <div class="leftMenu">
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <div class="el-item1">
            <el-menu-item style="font-size: 22px"> 首页 </el-menu-item>
            <el-menu-item style="font-size: 22px"> 退出 </el-menu-item>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {},
};
</script>

<style scoped>
.leftMenu {
  width: 200px;
  height: 100%;
  background-color: pink;
}
.el-item1 {
  display: flex;
  flex-direction:column;
  text-align: center;
}
</style>
