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
          url: 'sys/user/add',
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
          url: 'sys/user/qry',
          req: {
            pageNo:1,
            pageSize:0,
            qryConds:{
              name:{type:'text',name:'a.name',label:'名称',symbol:'=',val:'张三'},
              sex:{type:'radio',name:'a.sex',label:'性别',symbol:'=',val:'',itemCode:'sex'},
              age:{type:'text',name:'a.age',label:'年龄',symbol:'=',val:''},
              birthdate:{type:'date',name:'a.birthdate',label:'出生年月',symbol:'='},
              region:{type:'selector',name:'a.region',label:'活动区域',symbol:'=',itemCode:'region'},
              delivory:{type:'switch',name:'a.delivory',label:'即时配送',symbol:'='},
              hdsj:{type:'timerange',name:'a.sj',label:'活动时间',symbol:'='},
              hdxz:{type:'checkbox',name:'a.xz',label:'活动性质',symbol:'=',val:[],itemCode:'hdxz'},
              tszy:{type:'radio',name:'a.zy',label:'特殊资源',symbol:'=',itemCode:'tszy'}
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
          url: 'sys/user/del',
          req: {
            title:'删除提示',
            items: []
          },
          resp: {}
        },
        itemCodes:{
          sex: {
            NAN:{label:'男',code:'NAN',status: '1'},
            NV:{label:'女',code:'NV',status: '1'},
          },
          region:[
            {label:'Zone onee',code:'shanghai'},
            {label:'Zone two',code:'beijing'},
          ],
          hdxz:[
              {label:'地推活动',code:'DTHD'},
              {label:'线下主题活动',code:'XXZTHD'},
              {label:'单纯品牌曝光',code:'PPBG'},
              {label:'美食餐厅线上活动',code:'XSHD'}
          ],
          tszy:[
              {label:'Sponsor',code:'Sponsor22'},
              {label:'Venue',code:'Venue1'},
          ]
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
