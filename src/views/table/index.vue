<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
     <el-table-column v-for="(value,key,index) in header" :label="value">
        <template slot-scope="scope">
          {{ scope.row[key] }}
        </template>
     </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import { getTables } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      header: {
        id: 'ID',
        title: '标题',
        'status': '状态',
        author: '作者',
        pageviews: '其他',
        display_time: '发布日期'
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTables().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
