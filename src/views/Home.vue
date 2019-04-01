<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :xs="24" :sm="22" :md="20" :lg="20" :xl="22">
      <el-card class="box-card" body-style="list-wrapper">
        <el-row :gutter="30" type="flex" justify="space-around" align="middle">
          <el-col :span="22">
            <el-input
              @keyup.enter.native="addNewItem"
              placeholder="Please input the activity"
              v-model="title"
              clearable
              type="text"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              class="add-item-btn hidden-sm-only"
              :disabled="!title.length > 0"
              @click="addNewItem"
            >Add</el-button>
          </el-col>
        </el-row>
      </el-card>
      <transition name="el-zoom-in-top" v-if="currentList.length > 0">
        <div>
          <ListItem
            v-for="item in currentList"
            :key="item.id"
            :itemId="item.id"
            :itemTitle="item.title"
            :isDone="item.state"
          />
        </div>
      </transition>
      <transition name="el-zoom-in-bottom" v-else>
        <el-card v-loading="loading" shadow="hover" class="card-item-wrapper">
          <strong>No items</strong>
        </el-card>
      </transition>
    </el-col>
  </el-row>
</template>

<script>
  import { mapState } from "vuex";
  import { GET_CURRENT_LIST, GET_ADD_ITEM } from "@/store/mutation-types";
  import ListItem from "@/components/ListItem";

  export default {
    name: "home",
    data: () => ({
      title: "",
      loading: true
    }),
    components: {
      ListItem
    },
    computed: {
      ...mapState({
        currentList: state => state.currentList
      })
    },
    created() {
      this.$store.dispatch(GET_CURRENT_LIST).then(res => {
        this.loading = false;
      });
    },
    methods: {
      addNewItem() {
        if (this.title.length > 0) {
          this.loading = true;
          const newItem = { title: this.title, state: false };
          this.$store.dispatch(GET_ADD_ITEM, newItem).then(res => {
            this.loading = false;
            this.$store.dispatch(GET_CURRENT_LIST);
            this.title = "";
          });
        }
      }
    }
  };
</script>


