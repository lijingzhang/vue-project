<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="汇率">
        <span slot="left"  @click="$common.back()">返回</span>
        <!-- <router-link slot="right" to="/exchange">去汇兑</router-link> -->
    </v-header>

    <el-main >
        <div class="select_head">
            <div class="tl">基准货币</div>
             <el-row>
                <el-col :span="6" @click.native="dropDown()" >
                    <img  src="/static/images/china.png" class="img1x" alt="" v-if="type=='CNY'">
                    <img  src="/static/images/USD.png" class="img1x" alt="" v-if="type=='USD'">
                    <b>{{type}}</b>
                    <i ></i>
                </el-col>
                <el-col :span="17" ><input type="text" class="w100 tr" v-model="items.num" ref="num"></el-col>
            </el-row>  
        </div>
        <div class="list_group">
             <div class="list_head">
                <el-row>
                    <el-col :span="12" class="tl g3" >换算货币</el-col>
                    <el-col :span="12" class="tr f12" >更新：{{date}}</el-col>
                </el-row>  
            </div>
                <div class="list_item" >
                    <el-row>
                        <el-col :span="10" ><img src="/static/images/china.png" class="img2x mr5"><span>CNY</span></el-col>
                        <el-col :span="14" class="red"><span >￥</span>{{cny}}</el-col>
                    </el-row>  
                </div>
                <div class="list_item" >
                    <el-row>
                        <el-col :span="10" ><img src="/static/images/USD.png" class="img2x mr5"><span>USD</span></el-col>
                        <el-col :span="14" class="blue"><span >$</span>{{usd}}</el-col>
                    </el-row>  
                 
                </div>
                
            </div>
    </el-main>
    <div class="popContainer" v-if="isShow" @click="isShow=false">
        <el-card class="box-card ">
            <div slot="header" class="clearfix">
                <span>选择货币类型</span>
            </div>
            <div  v-for="item in countArr" class="text item" @click="countype({item})">
                {{item}}
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
    countArr:[],
    type:'CNY',
    cny:0,
    usd:0,
    buyPic:0,
    sellPic:0,
    date:'',
    items: {
        num:0,
    },
    isShow:false,
    }
  },
  created() {
    this.loadData();
    this.loadcountType()
  },
  mounted() {
    this.top = 1
  },
   watch:{  //实时监听input
    items:{
        handler:function(val,oldval){
            var inputval=this.$refs.num.value;
            if(this.type=='CNY'){
                this.cny=inputval*1;
                var mix=1/this.sellPic*inputval;
                 this.usd=mix.toFixed(4);
            }
            else if(this.type=='USD'){
                this.usd=inputval*1;
                var mix=this.buyPic*inputval;
                 this.cny=mix.toFixed(4);
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
            this.date=dataArr.date;
        }).catch((err) => {   //显示异常
            console.log(err);
        });

    },

    dropDown(){
         this.isShow=!this.isShow;
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
      countype(types){
          if(this.type!=types.item){
            this.type=types.item;
            var inputval=this.$refs.num.value;
           if(this.type=='CNY'){
                this.cny=inputval*1;
                var mix=1/this.sellPic*inputval;
                 this.usd=mix.toFixed(4);
            }
            else if(this.type=='USD'){
                this.usd=inputval*1;
                var mix=this.buyPic*inputval;
                 this.cny=mix.toFixed(4);
            }
          }
        this.isShow=false;
      }

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
    /* 列表 */
   .list_item { padding: 10px 0;text-align: left; border-bottom: 1px solid #eeeeee;color: #333333;margin:0 15px;
        & .el-row { 
            & .el-col-14{line-height: 30px;padding-left: 40px;}
        }
   }
   .list_item a{color: #333}
   .list_item:last-child{border-bottom: 0}
   .list_head{color: #999;border-bottom: 1px solid #f5f5f5;text-align: left;padding: 10px 15px;background: #f0eff5}
   .list_group i{ vertical-align: middle}

    .select_head{background: #0d0d0d;padding:15px;color:#fff;
        & .el-row{background: #fff; border-radius: 6px;padding: 10px;line-height:30px;margin-top:15px;color:#333;
            & input{border: 0;height: 30px;padding-right: 10px;}
            & input:focus{border: 0;}
            & img{ vertical-align: middle; margin-right: 5px}
            & i{background: url("/static/images/icon_drop.png") no-repeat;display: inline-block;width: 8px;height: 8px; background-size: contain;}
        }
    }
    @function imgpx($px) {
        @return $px / 75px * 1rem;
    }
    .img1x{width: imgpx(100px)}
   .img2x{width: imgpx(160px)}
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

</style>