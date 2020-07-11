<template>
  <router-link :to="resolvePath(item)" v-if="childrenLength(item)=='menu'">
    <el-menu-item  :index="resolvePath(item)">
      <i :class="item.iconName"></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>
  </router-link>
  <el-submenu v-else-if="childrenLength(item)=='submenu'":index="resolvePath(item)">
    <template slot="title">
      <i :class="item.iconName"></i>
      <span slot="title">{{item.name}}</span>
    </template>
    <menubar-item v-for="child in item.children" :key="child.path" :item="child"/>
  </el-submenu>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
export default {
  name: 'MenubarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    childrenLength(item){
      if(item.tag=='menu'){
        if(!item.children || item.children.length==0){
          return 'menu';
        }else{
          return 'submenu';
        }
      }else{
        return undefined;
      }
    },
    resolvePath(item) {
      console.log("item.path1:"+item.path)
      if (isExternal(item.path)) {
        return item.path
      }
      console.log("item.path2:"+path.resolve(item.path))
      return path.resolve(item.path)
    }
  }
}
</script>
