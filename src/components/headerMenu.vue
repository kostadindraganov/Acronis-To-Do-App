<template>
  <el-row height="70px" type="flex" justify="start" align="middle" class="header-menu">
    <el-col :span="3">
      <router-link :to="{name: 'about'}" v-if="route !== 'about'">
        <el-button type="text" size="medium">About</el-button>
      </router-link>
      <router-link :to="{name: 'home'}" v-else>
        <el-button type="text" size="medium">Home</el-button>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "HeaderMenu",
    computed: {
      ...mapState({
        route: state => state.route.name
      })
    }
  };
</script>


