<template>
  <el-table :data="tableData" style="width: 100%" max-height="550">
    <el-table-column fixed prop="webUrl" label="url" width="700">
    </el-table-column>
    <el-table-column label="操作" width="100" align="center">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">跳转</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getWebUrl } from "@/api/webUrl/webUrl";
export default {
  methods: {
    handleClick(e) {
      console.log(e);
      window.open(e.webUrl, "_blank");
    },
    getWebLinks() {
      console.log(1);
    },
  },
  async created() {
    const res = await getWebUrl();
    console.log(res.data);
    this.tableData = res.data;
  },
  data() {
    return {
      tableData: [],
    };
  },
};
</script>
