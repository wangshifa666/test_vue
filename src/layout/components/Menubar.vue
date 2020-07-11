<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :collapse="isCollapse">
      <menubar-item v-for="child in routes" :item="child" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import MenubarItem from './MenubarItem'
  import {
    mapGetters,mapActions
  } from 'vuex'
  export default {
    name: 'Menubar',
    components: {
      MenubarItem
    },
    computed: {
      ...mapGetters({
        isCollapse: 'menubar/menubarCollapse'
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
    },
    methods: {
      ...mapActions({
        resetMenuBar: "menubar/resetMenuBar"
      })
    }
  }
</script>
