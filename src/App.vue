<template>
  <el-container id="app">
    <el-header height="70px" class="custom-shadow">
      <HeaderMenu/>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  import HeaderMenu from "@/components/headerMenu";

  export default {
    name: "app",
    components: { HeaderMenu }
  };
</script>

