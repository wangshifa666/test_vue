<template>
  <div class="dashboard-container">
    <div class="dashboard-text">123123132</div>
    <el-button type="info" icon="el-icon-edit" @click="_updateMenuBar" circle></el-button>

  </div>
</template>

<script>
import { mapActions} from 'vuex'
import Layout from '@/layout'
const constantRoutes = [{
      path: '/login',
      name: 'login',
      iconName: 'el-icon-location',
      tag: 'login',
      component: () => import('@/views/login/index'),
    },
    {
      path: '/',
      name: 'layout',
      iconName: 'el-icon-location',
      tag: 'layout',
      component: Layout,
      redirect: '/dashboard',
      children: [{
          path: '/dashboard',
          name: 'Dashboard',
          iconName: 'el-icon-location',
          tag: 'menu',
          component: () => import('@/views/dashboard/index'),
        },
        {
          path: '/example',
          name: 'example',
          iconName: 'el-icon-location',
          tag: 'menu',
          component: () => import('@/layout/components/AppMain'),
          redirect: '/example/table',
          children: [{
              path: '/example/table',
              name: 'Table',
              component: () => import('@/views/table/index'),
              tag: 'menu',
              iconName: 'el-icon-location'

            },
            {
              path: '/example/tree',
              name: 'Tree',
              component: () => import('@/views/tree/index'),
              tag: 'menu',
              iconName: 'el-icon-location'
            }
          ]
        }
      ]
    }
  ];

export default {
  name: 'Dashboard',
  methods: {
    ...mapActions({
      updateMenuBar: "menubar/updateMenuBar",
    }),
    _updateMenuBar(){
      this.updateMenuBar(constantRoutes);
    }
  }
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
