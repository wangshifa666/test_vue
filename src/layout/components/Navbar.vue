<template>
  <el-button-group class="menubar_collapse">
        <el-button type="primary" icon="el-icon-d-arrow-right" v-if="isCollapse"  @click="toggleMenuBar"></el-button>
        <el-button type="primary" icon="el-icon-d-arrow-left" v-if="!isCollapse"  @click="closeMenuBar"></el-button>
  </el-button-group>

</template>

<script>
  import { mapGetters,mapActions } from 'vuex'
    export default {
      name: 'Navbar',
      computed:{
        ...mapGetters({
           isCollapse: 'menubar/menubarCollapse'
        })
      },
      methods: {
        ...mapActions({
          toggleMenuBar: "menubar/toggleMenuBar",
          closeMenuBar: "menubar/closeMenuBar"
        })
      }
    }

</script>
