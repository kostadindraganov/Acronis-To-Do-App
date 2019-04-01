<template>
  <el-card
    v-loading="loading"
    shadow="hover"
    class="card-item-wrapper"
    @mouseenter.native="mouseOver = true"
    @mouseleave.native="mouseOver = false"
    :class="{'bg-on': mouseOver, 'bg-off': !mouseOver}"
  >
    <el-row :gutter="0" type="flex" justify="space-between" align="middle">
      <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" class="item-left">
        <el-checkbox @change="editItem" :checked="isDone" v-model="checked" size="medium"></el-checkbox>
      </el-col>
      <el-col :xs="19" :sm="22" :md="22" :lg="22" :xl="22" class="item-left">
        <span>{{itemTitle}}</span>
      </el-col>
      <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" class="item-right">
        <transition name="el-fade-in-linear">
          <i v-show="mouseOver" class="el-icon-close" @click="deleteItem"></i>
        </transition>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import {
    GET_DELETE_ITEM,
    GET_CURRENT_LIST,
    GET_EDIT_ITEM
  } from "@/store/mutation-types";
  export default {
    name: "ListItem",
    props: {
      itemId: {
        type: Number,
        required: true,
        default: 1,
        useDefaultForNull: true
      },
      itemTitle: {
        type: String,
        required: true,
        default: "",
        useDefaultForNull: true
      },
      isDone: {
        type: Boolean,
        required: true,
        default: false,
        useDefaultForNull: true
      }
    },
    data: () => ({
      checked: false,
      loading: false,
      mouseOver: false
    }),
    methods: {
      deleteItem() {
        this.loading = true;
        this.$store.dispatch(GET_DELETE_ITEM, this.itemId).then(res => {
          if (res) {
            ///check response return status ok
          }
          this.loading = false;
          this.$store.dispatch(GET_CURRENT_LIST);
        });
      },
      editItem() {
        this.loading = true;
        const item = { id: this.itemId, title: this.title, state: this.checked };
        this.$store.dispatch(GET_EDIT_ITEM, item).then(res => {
          if (res) {
            ///check response return status ok
          }
          this.loading = false;
          this.$store.dispatch(GET_CURRENT_LIST);
        });
      }
    }
  };
</script>
<style  lang="scss" scoped>
  .item-left {
    color: #727272;
    line-height: 20px;
    text-align: left;
    padding-left: 0px;
  }
  .item-right {
    text-align: right;
  }
  .el-icon-close {
    cursor: pointer;
  }
  .bg-on {
    background-color: #3b8de240;
  }
</style>


