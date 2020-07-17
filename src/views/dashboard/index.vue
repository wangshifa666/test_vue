<template>
  <div class="app-container">
    <div class="dashboard-text">123123132</div>
    <el-button type="info" icon="el-icon-edit"  circle></el-button>

  </div>
</template>

<script>
// console.debug(this.$store.state.user.menubars.length)
// if(this.$store.state.user.menubars.length>0){
//   this.$router.resetRouter(this.$store.state.user.menubars)
//   this.$router.push({
//     path: '/layout'
//   })
// }
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
