import request from '@/utils/request'

export function getTables(data) {
  return request({
    url: '/test_vue/table/list',
    method: 'get',
    data
  })
}
