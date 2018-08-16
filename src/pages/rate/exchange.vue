<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="兑换">
        <span slot="left"  @click="$common.back()">返回</span>
        <!-- <router-link slot="right" to="/exchange">去汇兑</router-link> -->
    </v-header>

    <el-main >
      <div class="p15">
          	<el-form ref="form" :model="form" >
        <el-row>
            <el-col :span="24" class="tl" @click.native="dropDown('step1')" >
                <img  src="/static/images/china.png" class="img2x" alt="" v-if="type1=='CNY'">
                <img  src="/static/images/USD.png" class="img2x" alt="" v-if="type1=='USD'">
               <b>{{type1 | countType}}</b>
                <i ></i>
            </el-col>
            <el-col :span="24" >
                <input type="text" class="w100 tr" v-model="form.srcmoney" ref="srcmoney">
            </el-col>
        </el-row>  
        <el-row>
            <el-col :span="24" class="tl" @click.native="dropDown('step2')" >
                <img  src="/static/images/china.png" class="img2x" alt="" v-if="type2=='CNY'">
                <img  src="/static/images/USD.png" class="img2x" alt="" v-if="type2=='USD'">
                <b>{{type2 | countType}}</b>
                <i ></i>
            </el-col>
          <el-col :span="24" class="tr">{{form.destmoney}}</el-col>
        </el-row>  
         <el-row>
            <el-col :span="24" class="tl" >
                 <input type="password" class="w100 tl" v-model="form.paypwd" placeholder="请输入账户支付密码">
            </el-col>
        </el-row>  
        <div class="inblock w100 mt15">
            <span class="tl gray f16 l" >账户余额</span>
            <span class="r">{{blance | tofix}}</span>
        </div>
        <div class="blue f12 tl mt5">添加留言（20个字符以内）</div>
        <el-button class="w100 mt30 mb30" type="primary" @click="exchangeFun()">兑换</el-button>
          	</el-form>
      </div>
    </el-main>
    <div class="popContainer" v-if="isShow" @click="isShow=false">
        <el-card class="box-card ">
            <div slot="header" class="clearfix">
                <span>选择货币类型</span>
            </div>
            <div  v-for="item in countArr" class="text item" @click="countype(item.countType,item.blance,item.id)">
                {{item.countType}}
            </div>
              <div class="mt15 w100 blue " @click="isShow=false">取消</div>
        </el-card>
    </div>
  </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
        form: {//form名称
                srcountid: '',
                destcountid: '',
                srcmoney: 0,  //需要兑换金额
                destmoney: 0,//兑换后数值
                paypwd: '',	
			},
        countArr:[],
        type1:'',
        type2:'',
        blance:0,
        buyPic:0,
        sellPic:0,
        step:1,  //区别哪个弹框参数
        isShow:false,
    }
  },
  created() {
    this.loadData();       //汇率
    this.loadcountType();  //账户类型
  },
  mounted() {
    this.top = 1
  },
   watch:{  //实时监听input
    form:{
        handler:function(val,oldval){
            var inputval=this.$refs.srcmoney.value;
            // console.log(this.$refs.before.value);
            if(this.type1=='CNY'&&this.type2=='USD'){
                var mix=1/this.sellPic*inputval;
                 this.form.destmoney=mix.toFixed(4);
                console.log(this.form.destmoney);
            }
            else if(this.type1=='USD'&&this.type2=='CNY'){
                var mix=this.buyPic*inputval;
                 this.form.destmoney=mix.toFixed(4);
            }
            else{
             this.form.destmoney=inputval;
             }
        },
        deep:true
    }
  },
  methods: {
    loadData() {
          this.$http.get('/api/rate/queryAll').then(res => {
            var result = res.data;
            var lenth=result.length;
            var dataArr=result[lenth-1].USDCNY;
            this.buyPic=dataArr.buyPic;
            this.sellPic=dataArr.sellPic;
                
        }).catch((err) => {   //显示异常
            console.log(err);
        });

    },

    dropDown(val){
         this.isShow=!this.isShow;
         if(val=='step1'){
            this.step=1;
         }
         else {
            this.step=2;
         }
    },
      loadcountType(){
         this.$http.get('/api/count/queryCountByUserid').then(response => {
                this.countArr=response.data;
                var len=this.countArr.length;
                if(len>0){ //有账户时
                     this.blance=this.countArr[0].blance;
                    if(len==2){  //有两个账户时
                        this.type1=this.countArr[0].countType;
                        this.type2=this.countArr[1].countType;
                         this.form.srcountid=this.countArr[0].id;
                        this.form.destcountid=this.countArr[1].id;
                    }
                    else if(len==1){  //仅有一个账户时
                        this.type1=this.countArr[0].countType;
                        this.type2=this.countArr[0].countType;
                         this.form.srcountid=this.countArr[0].id;
                        this.form.destcountid=this.countArr[1].id;
                    }
                   
                   
                }
                else{  //无账户时
                     this.$confirm("您暂未申请账户!", '提示', {
                        confirmButtonText: '去申请',
                        showClose:false,
                        showCancelButton:true
                    })
                    .then(() => {
                        this.$router.push("/index")
                    })
                    
                }
                
            })
            .catch(error=>{
                  //超时之后在这里捕抓错误信息.
                    console.log(error);
            });
				
      },
      countype(types,blan,id){  //下拉框选中项事件
          var inputval=this.$refs.srcmoney.value;
          if(this.step==1){
            this.type1=types;
            this.blance=blan;  //获取第一个账户的余额
            this.form.srcountid=id;
            // this.$options.methods.balanceFun.bind(this)();//调用账户余额方法
          }
          
         else if(this.step==2){
            this.type2=types;
            this.form.destcountid=id;
          }
         if(this.type1=='CNY'&&this.type2=='USD'){
                var mix=1/this.sellPic*inputval;
                 this.form.destmoney=mix.toFixed(4);
            }
        else if(this.type1=='USD'&&this.type2=='CNY'){
            var mix=this.buyPic*inputval;
                this.form.destmoney=mix.toFixed(4);
        }
        else{
             this.form.destmoney=inputval;
        }
        this.isShow=false;
      },
      exchangeFun(){
            var formData= JSON.stringify(this.form);
            var params  = new URLSearchParams();
            params.append('datas', formData);
            this.$http.post("/api/count/exchange",params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response=>{
            var Data=response.data;
            if(Data.code=="success"){
                 this.$confirm("兑换成功！", '提示', {
                    confirmButtonText: '确定',
                    center: true,
                    showClose:false,
                    showCancelButton:false
                })
                .then(() => {
                    this.$router.push("/index")
                })
               
            
            }
            else{
                 this.$confirm(Data.message, '提示', {
                    confirmButtonText: '确定',
                    center: true,
                    showClose:false,
                    showCancelButton:false
                })
            }
        
        })
        .catch(error=>{
            //超时之后在这里捕抓错误信息.
            console.log(error);
        });
					
				
				  
      }

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
    /* 列表 */
   .el-row { padding: 10px 0;text-align: left; border-bottom: 1px solid #eeeeee;color: #333333;
       
        & .el-col-24{line-height: 30px;
            & i{background: url("/static/images/icon_right.png") no-repeat;display: inline-block;margin-left: 5px;;width: 15px;height: 15px; background-size: contain;}}
        & input{ height: 35px;border: 0}
        & input:disabled{ background: #fff} 
        
   }

.el-button--primary{ background: #f7c36d; border: 1px solid #f7c36d}
   /* 遮罩层 */
.popContainer{
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;z-index: 9999;
    background: rgba(0,0,0,0.3);
    & .box-card{ width: 100%;text-align: center; background: #fff; position: absolute;bottom: 0;left: 0;
        & .text{ line-height: 45px;border-bottom: 1px solid #f0eff5}
    }
    
}
    @function imgpx($px) {
        @return $px / 75px * 1rem;
    }
    .img1x{width: imgpx(100px)}
   .img2x{width: imgpx(160px)}
</style>