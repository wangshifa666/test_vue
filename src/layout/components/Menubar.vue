<template>
  <el-aside >
    <el-scrollbar class="scrollbar aside-scrollbar">
    <el-menu  :collapse="isCollapse" :default-active="$route.path">
      <menubar-item v-for="child in routes" :item="child" />
    </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
  import MenubarItem from './MenubarItem'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'Menubar',
    components: {
      MenubarItem
    },
    computed: {
      ...mapGetters({
        isCollapse: 'menubarCollapse'
      }),
      routes() {
        //this.resetMenuBar();
        var routes = this.$router.options.routes;
        for(let route of routes){
          if(route.tag=='layout'){
            return route.children;
          }
        }
      }
    }
  }
</script>
