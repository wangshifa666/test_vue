const routers = [{
      path: '/login',
      name: 'login',
      iconName: 'el-icon-location',
      tag: 'login',
      component: 'login/index',
    },
    {
      path: '/main',
      name: 'layout',
      iconName: 'el-icon-location',
      tag: 'layout',
      component: 'layout',
      redirect: '/dashboard',
      children: [{
          path: '/dashboard',
          name: 'Dashboard',
          iconName: 'el-icon-location',
          tag: 'menu',
          component: 'dashboard/index',
        },
        {
          path: '/form',
          name: 'Form',
          tag: 'menu',
          component: 'form/index',
          iconName: 'el-icon-location',
        },
        {
          path: '/example',
          name: 'example',
          iconName: 'el-icon-location',
          tag: 'menu',
          component: 'index',
          redirect: '/example/table',
          children: [{
              path: '/example/table',
              name: 'Table',
              component: 'table/index',
              tag: 'menu',
              iconName: 'el-icon-location'

            },
            {
              path: '/example/tree',
              name: 'Tree',
              component: 'tree/index',
              tag: 'menu',
              iconName: 'el-icon-location'
            }
          ]
        },
        {
          path: '/sys',
          name: '权限管理',
          iconName: 'el-icon-key',
          tag: 'menu',
          component: 'sys/index',
          redirect: '/sys/role',
          children: [{
              path: '/sys/role',
              name: '角色',
              component: 'sys/role/index',
              tag: 'menu',
              iconName: 'el-icon-key'

            },
            {
              path: '/sys/menu',
              name: '菜单',
              component: 'sys/menu/index',
              tag: 'menu',
              iconName: 'el-icon-menu'
            },
            {
              path: '/sys/user',
              name: '用户',
              component: 'sys/user/index',
              tag: 'menu',
              iconName: 'el-icon-user'
            }
          ]
        }
      ]
    }
  ]


const users = {
  admin: {
    username: 'admin',
    password: 111111,
    token: 'admin-token-001',
    lastLoginTime: 1,
    lastUpdateTime: 1,
    menubars: routers
  },
  editor: {
    token: 'editor-token'
  }
}


export default [
  // user login
  {
    url: '/test_vue/user/login',
    type: 'post',
    response: config => {
      const { username,password,lastUpdateTime } = config.body
      const user = users[username]
      console.log("token-----" + user.token)
      // mock error
      if (user.password!=password) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'+user.password
        }
      }

      return {
        code: 20000,
        data: user
      }
    }
  },

  // get user info
  {
    url: '/test_vue/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  {
    url: '/test_vue/user/logout',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/test_vue/user/chgpwd',
    type: 'post',
    response: config => {
      const { username,password,newpassword,token } = config.body
      const user = users[username]
      // mock error
      if(user==null){
        return {
          code: 60204,
          message: 'Account are incorrect.'+username
        }
      }else if (user.password!=password) {
        return {
          code: 60204,
          message: 'password are incorrect.'
        }
      }else{
        user.password = newpassword
        return {
          code: 20000,
          data: user
        }
      }
    }
  },
]
