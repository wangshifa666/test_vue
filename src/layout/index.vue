<template>
  <div :class="{collapse:isCollapse==true}" class="app-wrapper" >
    <menubar class="sidebar-container" v-if="isAlive" ></menubar>
    <div class="main-container">
      <div>
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
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
      isCollapse: 'menubar/menubarCollapse'
    })
  },
  method: {
  //   reload(){
  //     this.isAlive = false;
  //     this.$nextTick(() => (this.isAlive = true))
  //   }
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
