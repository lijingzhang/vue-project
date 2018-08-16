<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="汇率">
        <span slot="left"  @click="$common.back()">返回</span>
        <router-link slot="right" to="/caculate">试算</router-link>
    </v-header>

    <el-main >
        <div class=" today">
            <div class="title_head">
                <el-row>
                    <el-col :span="12" class="tl f22 yellow">今日汇率</el-col>
                    <el-col :span="12" class="tr"><router-link to="morelist">更多</router-link></el-col>
                </el-row>  
            </div>

            <div class="list_group p15" >
                <div class="list_head">
                    <el-row>
                        <el-col :span="12" class="tl">更新</el-col>
                        <el-col :span="12" class="tr">{{date}}</el-col>
                    </el-row>  
                    </div>
                    <div class="list_head">
                        <el-row>
                            <el-col :span="10" >币种</el-col>
                            <el-col :span="7" >买</el-col>
                            <el-col :span="7" >卖</el-col>
                        </el-row>  
                    </div>
                    <div class="list_item" >
                        <el-row>
                            <el-col :span="10" >{{code}}</el-col>
                            <el-col :span="7" class="blue">{{buyPic}}</el-col>
                            <el-col :span="7" class="red">{{sellPic}}</el-col>
                        </el-row>  
                    
                    </div>
                     <el-row :gutter="20" class="mt30">
                    <el-col :span="12" > <el-button type="primary" class="w100 yellow_bg"><router-link to="/exchange">买入美元</router-link></el-button></el-col>
                    <el-col :span="12" ><el-button type="primary" class="w100 yellow_bg"><router-link to="/exchange">卖出美元</router-link></el-button></el-col>
                </el-row>  
                </div>
               
                
            </div>
    </el-main>
 
  </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      code:'',
      buyPic:'',
      sellPic:'',
      date:'',
    }
  },
  created() {
    this.loadData()
  },
  mounted() {
    this.top = 1
  },
  methods: {
    loadData() {
          this.$http.get('/api/rate/queryAll').then(res => {
                    var result = res.data;
                    var lenth=result.length;
                    var dataArr=result[lenth-1].USDCNY
                    this.code=dataArr.code;
                    this.buyPic=dataArr.buyPic;
                    this.sellPic=dataArr.sellPic;
                    this.date=dataArr.date;
                  
                     
                }).catch((err) => {   //显示异常
                    console.log(err);
                });

    },

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    /* 列表 */

   .list_item { padding: 10px;text-align: left; border-bottom: 1px solid #eeeeee;color: #333333;    padding: 10px 0;}
   .list_item a{color: #333}
   .list_head{color: #999;border-bottom: 1px solid #f5f5f5;text-align: left;padding: 10px 0}
   .list_group i{ vertical-align: middle}

    .yellow{ color: #f7c36d;}
    .yellow_bg{ background: #f7c36d; border: 1px solid #f7c36d;
        a{color: #fff}    
    }
    .today{ background: #fff; border-radius: 6px;margin: 15px;}
    .title_head{ background: #0d0d0d; padding:10px 15px;border-radius:6px 6px 0 0;
            a{color: #999}
        }
</style>

