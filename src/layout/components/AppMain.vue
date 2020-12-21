<template>
  <el-main class="app-body">
    <el-button-group class="menubar_collapse">
      <el-button  type="primary" icon="el-icon-s-unfold" v-if="isCollapse" @click="hideMenuBar"></el-button>
      <el-button  type="primary" icon="el-icon-s-fold" v-if="!isCollapse" @click="openMenuBar"></el-button>
    </el-button-group>
    <el-tabs v-model="tabIndex" type="card" closable @tab-click="tabClick" @tab-remove="tabRemove">
      <el-tab-pane v-for="(tab,index) in tabs" :key="tab.name" :label="tab.title" :name="tab.name" />
      </el-tab-pane>
    </el-tabs>
    <router-view class="app-content" />
  </el-main>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    name: 'AppMain',
    computed: {
      ...mapGetters({
        isCollapse: 'menubarCollapse',
        tabs:'tablist',
      }),
      tabIndex:{
        get(){
          return this.$route.path;
        },
        set(val){
        }
      }
    },
    methods: {
      ...mapActions({
        openMenuBar: "user/openMenuBar",
        hideMenuBar: "user/hideMenuBar",
        resetMenuBar: "user/resetMenuBar",
        tabRemove: "user/removeTab"
      }),
      	// tab切换时，动态的切换路由
      tabClick (tab) {
        this.$router.replace({path: tab.name});
      },
    }
  }
</script>
