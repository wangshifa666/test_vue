import Mock from 'mockjs'



function mockList(total,size,pageNo){
    var len = size;
    if(size*pageNo>total){
      len = total-size*(pageNo-1)
    }

    var option={};
    option['items|'+len]=[{
      id: '@id',
      title: '@sentence(1, 5)',
      'status|1': ['published', 'draft', 'deleted'],
      name: '@name',
      author: '@name',
      display_time: '@datetime',
      pageviews: '@integer(300, 5000)',
      age: '@integer(18,25)',
      cSex: '男',
      eSex: 'NV'
    }];
    return Mock.mock({option});
}
function mockReq(){
    var data = [];
    var urls = ['/test_vue/sys/role/qry','/test_vue/sys/role/del','/test_vue/sys/role/add',
                '/test_vue/sys/user/qry','/test_vue/sys/user/del','/test_vue/sys/user/add',

                ];
    var o=null;
    for(var j = 0; j < urls.length; j++) {
              console.debug(`mockReq${urls[j]}`)
      if(urls[j].endsWith("qry")){
        o={ url: urls[j],
            type: 'post',
            response: config => {
              console.debug(`qry请求参数${config}`)
              //console.debug(config);
              const data = mockList(30,config.body.pageSize,config.body.pageNo);
              const items = data.option.items;
              console.debug(data);
              return {code: 20000,data: {total: 30,items: items}}
          }
        }
      }else if(urls[j].endsWith("add")){
        o={ url: urls[j],
            type: 'post',
            response: config => {
              console.debug(`add请求参数${config}`)
              return {code: 20000}
          }
        }
      }else if(urls[j].endsWith("del")){
        o={ url: urls[j],
            type: 'post',
            response: config => {
              console.debug(`del请求参数${config}`)
              return {code: 20000}
          }
        }
      }

      data.push( o )

    }
    console.debug(data)

    return data;
}
const req = mockReq();
export default [
  {
    url: '/test_vue/sys/role/qry',
    type: 'post',
    response: config => {
      console.debug(`qry请求参数${config}`)
      //console.debug(config);
      const data = mockList(30,config.body.pageSize,config.body.pageNo);
      const items = data.option.items;
      console.debug(data);
      return {
        code: 20000,
        data: {
          total: 30,
          items: items,
        }
      }
    }
  },
  {
    url: '/test_vue/sys/role/add',
    type: 'post',
    response: config => {
      console.debug(`add请求参数${config}`)
      //console.debug(config);
      return {
        code: 20000
      }
    }
  },
  {
    url: '/test_vue/sys/role/del',
    type: 'post',
    response: config => {
      console.debug(`del请求参数${config}`)
      return {
        code: 20000
      }
    }
  },
    {
      url: '/test_vue/sys/user/qry',
      type: 'post',
      response: config => {
        console.debug(`qry请求参数${config}`)
        //console.debug(config);
        const data = mockList(30,config.body.pageSize,config.body.pageNo);
        const items = data.option.items;
        console.debug(data);
        return {
          code: 20000,
          data: {
            total: 30,
            items: items,
          }
        }
      }
    },
    {
      url: '/test_vue/sys/user/add',
      type: 'post',
      response: config => {
        console.debug(`add请求参数${config}`)
        //console.debug(config);
        return {
          code: 20000
        }
      }
    },
    {
      url: '/test_vue/sys/user/del',
      type: 'post',
      response: config => {
        console.debug(`del请求参数${config}`)
        return {
          code: 20000
        }
      }
    }
]
