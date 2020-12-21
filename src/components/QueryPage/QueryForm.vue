<template>
  <div class="app-container qry-container" >
    <div ref="conditions" class="conditions" :class="{twoLine:_showAllLine==-1,allLine:_showAllLine>=0}">
      <el-form class="qryFrom" ref="form" inline :model="qModel.req.qryConds"  >
        <el-form-item v-for="(qryCond,k,index) in qModel.req.qryConds" :label="qryCond.label" :type="qryCond.type">
          <el-input v-if="qryCond.type=='text'" v-model="qryCond.val" />
          <el-date-picker v-else-if="qryCond.type=='date'" type="date" placeholder="选择日期" v-model="qryCond.val" />
          <el-select v-else-if="qryCond.type=='selector'" v-model="qryCond.val" placeholder="please select your zone">
            <el-option  v-for="(item,k,index) in itemCodes[qryCond.itemCode]" :label="item.label" :key="item.code" :value="item.code" />
          </el-select>
          <el-switch v-else-if="qryCond.type=='switch'" v-model="qryCond.val" />
          <el-date-picker v-else-if="qryCond.type=='timerange'" v-model="qryCond.val" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期":default-time="['00:00:00', '23:59:59']" />
          <el-checkbox-group v-else-if="qryCond.type=='checkbox'" v-model="qryCond.val">
            <el-checkbox v-for="(item,k,index) in itemCodes[qryCond.itemCode]" :label="item.code" >{{item.label}}</el-checkbox>
         </el-checkbox-group>
          <el-radio-group v-else-if="qryCond.type=='radio'" v-model="qryCond.val">
            <el-radio v-for="(item,k,index) in itemCodes[qryCond.itemCode]"  :label="item.code">{{item.label}}</el-radio>
          </el-radio-group>
         </el-form-item>
      </el-form>
    </div>
    <div class="showQryCondFoldBar" @click="showQryConditions()" v-if="showQryFlag==-1" >
      <i class="el-icon-caret-bottom"></i>
    </div>
    <div class="showQryCondFoldBar" @click="showQryConditions()" v-else-if="showQryFlag==1">
     <i class="el-icon-caret-top"></i>
    </div>

    <div ref="buttons" style="width:100%;text-align:center;display:block">
      <el-button type="primary"  icon="el-icon-search" @click="queryData">查询</el-button>
      <el-button icon="el-icon-refresh-left">重置</el-button>
    </div>


  <div class="batchOptButtonsBar">
    <div v-for="(item,i) in batchOptButtons" >
      <el-button type="primary" size="small" slot="reference" v-if="item.type=='link'" @click="onAdd()" :icon="item.icon" >{{item.label}}</el-button>

      <el-popover :title="dModel.req.title" placement="right"  width="300" v-else-if="item.type=='del'" v-model="item.visible">
        <div v-if="$refs.table==null || $refs.table.selection.length==0">
          <p style="">请选择删除项！</p>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" @click="item.visible = false">取消</el-button>
          </div>
        </div>
        <div v-else >
          <p >确定要删除选中内容吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" icon="el-icon-refresh-left" @click="item.visible = false">取消</el-button>
            <el-button type="primary" size="mini" :icon="item.icon" @click="onDelete(item)">确定</el-button>
          </div>
        </div>
        <el-button type="primary" size="small" slot="reference" :icon="item.icon" >{{item.label}}</el-button>
      </el-popover>


      <el-popover title="下载选项" placement="right" width="300" v-else-if="item.type=='download'" v-model="item.visible">
        <p v-if="$refs.table==null || $refs.table.data.length==0">无下载数据</p>
        <el-radio-group v-else v-model="downloadPage" >
          <el-radio label="csv">csv</el-radio>
          <el-radio label="xlsx" disabled>xlsx</el-radio>
        </el-radio-group>
        <div style="text-align: center; margin-top: 5px">
          <el-button type="primary" size="mini" icon="el-icon-refresh-left" @click="item.visible = false">取消</el-button>
          <el-button type="primary" size="mini" :icon="item.icon" @click="onDownload(item)">确定</el-button>
        </div>
        <el-button type="primary" size="small" slot="reference" :icon="item.icon" >{{item.label}}</el-button>
      </el-popover>
    </div>
  </div>
    <el-table ref="table" v-loading="listLoading" :data="qModel.resp.list" element-loading-text="Loading" border  >
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column v-for="(item,index) in qModel.req.header" :label="item.label" :min-width="item.width" >
          <template slot-scope="scope">
            <div v-if="!item.codeName && item.codeName!=''" >
            {{ scope.row[item.name] }}
            </div>
            <div v-else >
            {{ itemCodes[item.codeName][scope.row[item.name]].label }}
            </div>
          </template>
        </el-table-column>
       <el-table-column label="操作" width="110" >
        <el-button-group slot-scope="scope" class="rowOptButton">
          <el-button icon="el-icon-edit" @click="onEdit(scope.$index, scope.row)"></el-button>
          <el-button icon="el-icon-view" @click="onView(scope.$index, scope.row)"></el-button>
        </el-button-group>
      </el-table-column>

    </el-table>
    <el-pagination
      :hide-on-single-page=false
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="qModel.req.pageNo"
      :page-sizes="pageSizes"
      :page-size="qModel.req.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="qModel.resp.total">
    </el-pagination>
  <create-form ref="createForm"/>
  <aev-form ref="aevForm"/>
  </div>

</template>

<script>
  import { qry,del } from '@/api/component'
  import CreateForm from './CreateForm'
  import AevForm from './AevForm'
  import filedownload from '@/utils/filedownload'

  export default {
    name: 'QueryForm',
    props: {
      // route object
      aModel: {
        type: Object,
        required: true
      },
      qModel: {
        type: Object,
        required: true
      },
      dModel: {
        type: Object,
        required: true
      },
      itemCodes: {
        type: Object,
        required: true
      },
      batchOptButtons: {
        type: Array,
        required: true
      },

    },
    components: {
      CreateForm,
      AevForm
    },
    data() {
      return {
        showQryFlag:0,//0-无 -1 不折叠 1 折叠
        listLoading: false,
        visible: false,
        downloadPage:'csv',
        pageSizes:[10,20,100,1000]
      }
    },
    computed:{
      _showAllLine:{
        get:function(){
          return this.showQryFlag
        },
        set:function(v){
          this.showQryFlag=v;
        }
      }
    },
    created() {
      //this.fetchData();
    },
    mounted(){
      if(this.$refs.conditions.firstElementChild.offsetHeight>112){
        this._showAllLine = -1;
      }

    },
    methods: {
      showQryConditions(){
        this._showAllLine = -this._showAllLine;
      },
      queryData() {
        this.listLoading = true
        if(this.qModel.req.pageSize==0){
          this.qModel.req.pageSize=this.pageSizes[0];
        }
        qry(this.qModel).then(response => {
          this.qModel.resp.list = response.data.items;
          this.qModel.resp.total =  response.data.total;
          this.listLoading = false;
          //console.debug(this.page.total);
        })
      },
      handleSizeChange(val) {
        this.qModel.req.pageSize=val;
        this.qModel.req.pageNo=1;
        this.queryData();
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.qModel.req.pageNo = val;
        this.queryData();
        //console.log(`当前页: ${val}`);
      },
      toggleSelection() {
        this.$refs.table.clearSelection();
      },
      onDelete(item) {
        item.visible = false;
        let ids = this.$refs.table.selection;
        this.dModel.req.items = ids;
        del(this.dModel).then(response => {
            //console.debug(response);
          })

        console.log(`删除ids: `);
        console.log(ids);
      },
      onDownload(item){
        item.visible = false;
        filedownload.tableToCsv();
        console.log(`下载选项：${this.downloadPage} `);

      },
      onAdd(){
        this.$refs.aevForm.showDialog(this.aModel,this.aModel.req.initVals,this.itemCodes,'add');
      },
      onEdit(index,row){
        console.log("onedit:")
        console.log(row)
        this.$refs.aevForm.showDialog(this.aModel,row,this.itemCodes,'edit');
      },
      onView(index,row){
        this.$refs.aevForm.showDialog(this.aModel,row,this.itemCodes,'view');
      }
    }
  }
</script>
<style lang="scss">
  .conditions.twoLine {
      //position: fixed;
      z-index: 99;
      background: rgba(255, 255, 255,1);
      padding-top:13px;
      height:106px;
      overflow: hidden;
  }
  .conditions.allLine {
      //position: fixed;
      z-index: 99;
      background: rgba(255, 255, 255,1);
      padding-top:13px;
      height:auto !important;
  }
  .showQryCondFoldBar,.hideQryCondFlodBar{
    text-align: center;
    height:20px;
    margin: 0px 0px 0px 0px;
    color: #DCDFE6;
  }
  .showQryCondFoldBar:hover{
    background-color: #f9fafc;
    color: #409eff;
  }
  .batchOptButtonsBar{
    margin-top:10px;
    div{
      display:inline;
    }
    button{
      //background-color: #faecd8;
    }
  }

  .el-table{
      z-index: 9;
      width: 100% !important;
      height: auto;
      overflow: visible;
      colgroup col[width="0"]{
        display:none;
      }

      table tr td,th {
         padding: 0px 0px 0px 0px  !important;
         margin: 0px 0px 0px 0px  !important;
         .cell{
          padding: 10px 0px 10px 10px !important;
          white-space:nowrap;
          height:45px !important;
        }
        .cell .rowOptButton{
          margin: -10px 0px -10px -10px !important;
          border-style: none;
          button{
            border-style: none;
            color: #79bbff;
            height:45px !important;
            //width:45px;
            background: transparent;
          }
          button:hover{
            background: #F0F8FF	;
          }

        }
      }
  }
  .qryFrom,.createFrom{
  .el-form-item {
    padding-left: 10px;
    height:30px;
    //line-height:30px;
    .el-form-item__label {
      width: 100px;
    }
  }

  .el-form-item[type=text],
  .el-form-item[type=selector],
  .el-form-item[type=date],
  .el-form-item[type=switch] {
    .el-form-item__content {
      width: 200px !important;
      [type=text] {
        width: 200px !important;
      }
    }
  }

  .el-form-item[type=timerange],
  .el-form-item[type=checkbox] {
     display: block;

    .el-form-item__label {
      display: inline;
      float: left;
    }

    .el-form-item__content {
      display: inline !important;
      width: 200px !important;

      .el-input,
      [type=text] {
        width: 200px !important;
      }
    }
  }

  .el-form-item[type=button] {
    display: block;
    text-align: center;
  }
  }
</style>
