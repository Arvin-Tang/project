<template>
  <div class="home-header">
    <el-menu
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="el-menu-header"
    >
      <el-menu-item index="1">个人中心</el-menu-item>
      <el-menu-item index="2">退出</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped> 
.el-menu-header {
  display: flex;
  justify-content: end;
}
.el-menu.el-menu--horizontal {
  border: none;
}
</style>
