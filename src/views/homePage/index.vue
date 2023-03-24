<template>
  <div class="homePage">
    <HomePageHeader style="width: 100% ;" />
    <div class="home-body">
      <LeftMenu />
      <HomePageTable class="homePage-table" />
    </div>
  </div>
</template>

<script>
import LeftMenu from "@/components/HomePage/LeftMenu.vue";
import HomePageTable from "../../components/HomePage/HomePageTable.vue";
import HomePageHeader from "@/components/HomePage/HomePageHeader.vue";
export default {
  components: {
    LeftMenu,
    HomePageTable,
    HomePageHeader,
  },
};
</script>

<style scoped>
.homePage {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
.home-body {
  display: flex;
  height: 100%;
}
.homePage-table {
  margin: 100px 0 0 80px;
}
</style>
