import request from '@/utils/request'

export function qry(data) {
  return request({
    url: '/test_vue/'+data.url,//'/test_vue/table/list',
    method: 'post',
    data: data.req
  })
}

export function add(data) {
  return request({
    url: '/test_vue/'+data.url,//'/test_vue/table/list',
    method: 'post',
    data: data.req
  })
}

export function del(data) {
  return request({
    url: '/test_vue/'+data.url,//'/test_vue/table/list',
    method: 'post',
    data: data.req
  })
}