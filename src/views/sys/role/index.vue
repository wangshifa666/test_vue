<template>
  <query-form ref="queryForm" :aModel="aModel" :qModel="qModel" :dModel="dModel" :itemCodes="itemCodes" :batchOptButtons="batchOptButtons"/>

</template>

<script>
  import QueryForm from '@/components/QueryPage/QueryForm'

  export default {
    components: {
      QueryForm
    },
    data() {
      return {
        aModel: {
          url: 'sys/role/add',
          req: {
            title:'创建表单',
            items:{
              name:{type:'text',name:'a.name',label:'名称',symbol:'=',val:'张三',disabled:false,visibled:true},
              sex:{type:'radio',name:'a.sex',label:'性别',symbol:'=',val:'',itemCode:'sex',disabled:false,visibled:true},
              age:{type:'text',name:'a.age',label:'年龄',symbol:'=',val:'',disabled:false,visibled:true},
              birthdate:{type:'date',name:'a.birthdate',label:'出生年月',symbol:'=',disabled:false,visibled:true},
              region:{type:'selector',name:'a.region',label:'家庭地址',symbol:'=',disabled:false,visibled:true},
              delivory:{type:'switch',name:'a.delivory',label:'联系电话',symbol:'=',val:true,disabled:false,visibled:true}
            },
            initVals:{
              name:'张三',
              age:10
            }
          },
          resp: {}
        },
        qModel: {
          url: 'sys/role/qry',
          req: {
            pageNo:1,
            pageSize:0,
            qryConds:{
              cname:{type:'text',name:'a.cname',label:'角色名称',symbol:'=',val:''},
              code:{type:'text',name:'a.code',label:'角色代码',symbol:'=',val:''},
              status:{type:'radio',name:'a.status',label:'状态',symbol:'=',val:'',itemCode:'status'},
              sex:{type:'radio',name:'a.sex',label:'性别',symbol:'=',val:'',itemCode:'sex'},
            },
            header: [
              {name:'id',label:'ID',width:'120px'},
              {name:'eSex',label:'性别',width:'50px',codeName:'sex'},
              {name:'title',label:'标题',width:'200px'},
              {name:'status',label:'状态',width:'100px'},
              {name:'name',label:'姓名',width:'120px'},
              {name:'author',label:'笔名',width:'120px'},
              {name:'pageviews',label:'其他',width:'50px'},
              {name:'display_time',label:'发布日期',width:'140px'},
            ],
          },
          resp: {
            total:0,
            list:[],
          },
        },
        dModel: {
          url: 'sys/role/del',
          req: {
            title:'删除提示',
            items: []
          },
          resp: {}
        },
        itemCodes:{
          status: [
            {label:'启用',code:'1',status: '1'},
            {label:'禁用',code:'0',status: '1'},
          ],
          sex: {
            NAN:{label:'男',code:'NAN',status: '1'},
            NV:{label:'女',code:'NV',status: '1'},
          },
        },
        batchOptButtons:[
          {label:'创建',type:'link',icon:'el-icon-document-add',visible:false},
          {label:'删除',type:'del',icon:'el-icon-delete',visible:false,tips:'确定要删除选中内容吗？'},
          {label:'下载',type:'download',icon:'el-icon-download',visible:false},
        ]
      }
    },
    created() {
      //this.fetchData();
    },
    mounted(){
    }

  }
</script>
