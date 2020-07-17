<template>
  <el-container  >
    <navbar />
    <el-container :class="{collapse:isCollapse==true,open:!isCollapse}" >
      <menubar v-if="isAlive" ></menubar>
      <app-main />
    </el-container>
  </el-container>
</template>

<script>

import {Menubar,Navbar,AppMain} from './components'
import { mapGetters } from 'vuex'
import { resetRouter } from '@/router'

export default {
  name: 'Layout',
  data(){
    return {
      isAlive: true
    }
  },
  components: {
    Navbar,
    Menubar,
    AppMain
  },
  computed:{
    ...mapGetters({
      isCollapse: 'user/menubarCollapse'
    })
  },
  method: {
    reload(){
      console.debug("layout refresh")
      console.debug(this.$store.state.user.menubars)
      resetRouter(this.$store.state.user.menubars)
    }
  },
  watch: {
    // '$store.state.menubar.menubars':function () {
    //     console.debug("menubar reload....");
    //     this.isAlive = false;
    //     this.$nextTick(() => (this.isAlive = true))
    // }
  }
}
</script>
