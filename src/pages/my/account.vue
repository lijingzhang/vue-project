<template>
	<div >
	<el-container>
		<v-header title="我的账户">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
		<el-main>
            <div v-show="loadshow" class="comomtips"><i class="el-icon-loading"></i></div>
			<div class=" pl0">
                 <div v-show="dataArr.length==0" class="mt10 gray pb10">暂无数据</div>
             <div class="list_group" v-for="data in dataArr">
                <div class="list_head">
                    我的{{data.countType}}账户
                </div>
                <div class="list_item" >
                    <el-row>
                        <el-col :span="6" >账户卡号</el-col>
                        <el-col :span="18" class="tr">{{data.cardId}}</el-col>
                    </el-row>  
                </div>
                 <div class="list_item" >
                    <el-row>
                         <el-col :span="6" >货币类型</el-col>
                        <el-col :span="18" class="tr">{{data.countType | countType}}</el-col>
                    </el-row>  
                </div>
                 <div class="list_item" >
                    <el-row>
                         <el-col :span="6" >账户余额</el-col>
                        <el-col :span="18" class="tr">{{data.blance}}</el-col>
                    </el-row>  
                </div>
                 <div class="list_item" >
                    <el-row>
                         <el-col :span="6" >账户状态</el-col>
                        <el-col :span="18" class="tr">{{data.state | status}}</el-col>
                    </el-row>  
                </div>
                 <div class="list_item" >
                    <el-row>
                         <el-col :span="6" >创建时间</el-col>
                        <el-col :span="18" class="tr">{{data.createTime}}</el-col>
                    </el-row>  
                </div>
                 <div class="list_item" >
                     <el-button  class="w100" type="text" @click="cancelAccount(data.id)">注销账户</el-button>
                </div>
            </div>
        
            </div>
		</el-main>
		<div class="footer_button">
             <el-button class="w100" type="primary" @click="dialogFormVisible = true">申请账户</el-button>
        </div>
	</el-container>
    <el-dialog  :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="货币类型" :label-width="formLabelWidth">
            <el-select v-model="form.countType" placeholder="请选择货币类型"  >
                <el-option v-for="(item, idx) in countArr"   :label="item | countType" :value="item" :key="idx"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="设置支付密码" :label-width="formLabelWidth">
            <el-input v-model="form.payPwd" type="password"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible= false">取 消</el-button>
            <el-button type="primary"  @click="onSubmit('form')">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
export default {
  data () {
    return {
        dataArr:[],
        countArr:[],
       dialogTableVisible: false,
       dialogFormVisible: false,
       loadshow:false,
         form: {
          countType: '',
          payPwd: '',
        },
        formLabelWidth: '120px'
    }
  },
   created() {
    this.loadData();
    this.loadcountType()
  },
  methods:{
      loadData(){
            this.$http.get('/api/count/queryCountByUserid').then(response => {
                if(response.data.code=="fail"){
                     this.$confirm('操作失败！检查是否登录', '提示', {//是否登陆
                    confirmButtonText: '确定',
                    showClose:false,
                   showCancelButton:false,
                    center:true
                    })
                }
                else{
                       this.dataArr=response.data;
                }
            })
             .catch(error=>{
                  //超时之后在这里捕抓错误信息.
                    console.log(error);
            });
      },
      loadcountType(){
         this.$http.get('/api/count/queryMoneyType').then(response => {
                this.countArr=response.data;
            })
            .catch(error=>{
                  //超时之后在这里捕抓错误信息.
                    console.log(error);
            });
				
      },
      onSubmit(countid) {
             var formData= this.$qs.stringify(this.form) // form为form名称获取表单数据
                    this.$http.post("/api/count/createCount",formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response=>{
                    if(response.data.code=="success"){
                         this.loadshow= true;
                         setTimeout(() => {
                            this.loadshow= false;
                            this.dialogFormVisible= false;
                            this.$options.methods.loadData.bind(this)();//调用methods中的另一个方法
                        }, 500);
                        if (this.$refs.form!==undefined) {
                            this.$refs.form.resetFields();
                        }
                    }
                    else{
                        this.$confirm(response.data.message, '提示', {
                        confirmButtonText: '确定',
                        showClose:false,
                         showCancelButton:false,
                        center:true
                        })
                    }
                    
                
                })
                .catch(error=>{
                     //超时之后在这里捕抓错误信息.
                     console.log(error);
                });
            
            },
            cancelAccount(countid){
              	this.$alert('确认注销该账户吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                showClose:false,
                showCancelButton:true,
                 }).then(() => {
                     let params  = new URLSearchParams();
                     params.append('id',countid);
                    this.$http.post("/api/count/logoutCount",params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    })
                    .then(response=>{
                   
                        if(response.data.code=="success"){
                             this.loadshow= true;
                            setTimeout(() => {
                            this.loadshow= false;
                                 this.dialogFormVisible= false;
                                 this.$options.methods.loadData.bind(this)();//调用methods中的另一个方法
                                }, 500)
                        }
                        else{
                           
                            this.$confirm(response.data.message, '提示', {
                            confirmButtonText: '确定',
                            showClose:false,
                             showCancelButton:false,
                            center:true
                            })
                        }
                        
                    
                    })
                    .catch(error=>{
                        console.log(error);

                    });
                 }).catch(() => {
                    console.log('取消')
                });
            }
                
  },
  // 声明一个本地的过滤器 
  filters: { status: function (value) { 
      if(value==1){
        return "正常"
      }
     else if(value==0){
        return "冻结"
      }
      }, 
     
    }

}
</script>
   <style scoped>
    /* 列表 */
   .list_group{ border-top: 8px solid #f5f5f5}
    .list_group:last-child{border-bottom: 8px solid #f5f5f5}
   .list_item { padding: 10px;text-align: left; border-bottom: 1px solid #eeeeee;color: #333333}
   .list_item a{color: #333}
   .list_item:last-child{border-bottom: 0}
   .list_head{color: #999;border-bottom: 1px solid #f5f5f5;text-align: left;padding: 10px 0 10px 10px}
   .list_group i{ vertical-align: middle}

    .footer_button{ position: fixed;bottom: 0;left: 0;width: 100%;}
    .footer_button .el-button{ height: 50px;border-radius: 0;}
    .el-dialog__body .el-form{ border-top: 8px solid #f5f5f5}
    /* //弹出框 */

</style>

