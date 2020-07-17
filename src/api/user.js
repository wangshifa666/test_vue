import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/test_vue/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/test_vue/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(data) {
  return request({
    url: '/test_vue/user/logout',
    method: 'post',
    data
  })
}

export function chgpwd(data) {
  return request({
    url: '/test_vue/user/chgpwd',
    method: 'post',
    data
  })
}
