<template>
  <el-dialog ref="dialog" :title="dataModel.req.title" :visible.sync="dialogVisible" width="50%" :modal-append-to-body="false" >
        <el-form class="createFrom" ref="form" inline :model="dataModel.req.items"  >
          <el-form-item v-show="item.visibled" v-for="(item,k,index) in dataModel.req.items" :label="item.label" :type="item.type">
            <el-input v-if="item.type=='text'" v-model="item.val" :disabled="item.disabled"/>
            <el-date-picker v-else-if="item.type=='date'" type="date" placeholder="选择日期" v-model="item.val" :disabled="item.disabled"/>
            <el-select v-else-if="item.type=='selector'" v-model="item.val" placeholder="please select your zone" :disabled="item.disabled">
              <el-option  v-for="item in codes[item.itemCode]" :label="item.label" :key="item.code" :value="item.code" />
            </el-select>
            <el-switch v-else-if="item.type=='switch'" v-model="item.val" :disabled="item.disabled"/>
            <el-date-picker v-else-if="item.type=='timerange'" v-model="item.val" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期":default-time="['00:00:00', '23:59:59']" :disabled="item.disabled" />
            <el-checkbox-group v-else-if="item.type=='checkbox'" v-model="item.val" :disabled="item.disabled">
              <el-checkbox v-for="item in codes[item.itemCode]" :label="item.code" >{{item.label}}</el-checkbox>
           </el-checkbox-group>
            <el-radio-group v-else-if="item.type=='radio'" v-model="item.val" :disabled="item.disabled">
              <el-radio v-for="item in codes[item.itemCode]"  :label="item.code">{{item.label}}</el-radio>
            </el-radio-group>
           </el-form-item>
        </el-form>
        <div ref="buttons" style="width:100%;text-align:center;display:block">
          <el-button v-if="optType=='add'" type="primary"  icon="el-icon-document-add" @click="onAdd">新增</el-button>
          <el-button v-else-if="optType=='edit'" type="primary"  icon="el-icon-document-edit" @click="onEdit">修改</el-button>
          <el-button icon="el-icon-refresh-left" @click="closeDialog()">取消</el-button>
        </div>
  </el-dialog>
</template>

<script>
import { add } from '@/api/component'
export default {
  name: 'AevForm',
  data() {
    return {
      dialogVisible: false,
      dataModel: {
        url: '',
        req: {
          title:'创建表单1',
          items:{
            name:{type:'text',name:'a.name',label:'名称',symbol:'=',val:'张三'},
            sex:{type:'radio',name:'a.sex',label:'性别',symbol:'=',val:'',itemCode:'sex'},
            age:{type:'text',name:'a.age',label:'年龄',symbol:'=',val:''},
            birthdate:{type:'date',name:'a.birthdate',label:'出生年月',symbol:'='},
            region:{type:'selector',name:'a.region',label:'家庭地址',symbol:'='},
            delivory:{type:'switch',name:'a.delivory',label:'联系电话',symbol:'='}
          }
        },
        resp: {}
      },
      optType:'',
      codes:{}
    }
  },
  methods: {
      showDialog(aModel,vModel,itemCodes,optType) {
        this.dialogVisible = true;
        this.dataModel = aModel;
        let items = this.dataModel.req.items;
        if(vModel){
          for(let key in items){
            if(vModel[key]){
              items[key].val = vModel[key]
            }else{
              items[key].val = null;
            }
          }
        }
        this.optType = optType;
        this.codes = itemCodes;
      },
      closeDialog() {
        this.dialogVisible = false;
      },
      onAdd() {
        add(this.dataModel).then(response => {
          this.dialogVisible = false;

          //console.debug(response);
        })
      },
      onEdit() {
        add(this.dataModel).then(response => {
          this.dialogVisible = false;

          //console.debug(response);
        })
      }
  }
}
</script>
