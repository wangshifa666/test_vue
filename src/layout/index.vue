<template>
  <el-container  >
    <navbar />
    <el-container class="s-main" :class="{collapse:isCollapse==true,open:!isCollapse}" >
      <menubar v-if="isAlive" ></menubar>
      <app-main />
    </el-container>
  </el-container>
</template>

<script>

import {Menubar,Navbar,AppMain} from './components'
import { mapGetters } from 'vuex'

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
      isCollapse: 'menubarCollapse'
    })
  },
  method: {
    reload(){
      console.debug("layout refresh")
      //重置menubars???
    }
  },
  watch: {
  }
}
</script>
