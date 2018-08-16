<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="更多汇率">
        <span slot="left"  @click="$common.back()">返回</span>
        <router-link slot="right" to="/exchange">去汇兑</router-link>
    </v-header>

    <el-main >
        <div class="list_group">
             <div class="list_head">
                <el-row>
                    <el-col :span="10" >币种</el-col>
                    <el-col :span="7" >买</el-col>
                    <el-col :span="7" >卖</el-col>
                </el-row>  
            </div>
                <div class="list_item" v-for="obj in dataObj">
                    <el-row>
                        <el-col :span="10" >{{ obj.currency}}</el-col>
                        <el-col :span="7" class="blue">{{ obj.buyPic }}</el-col>
                        <el-col :span="7" class="red">{{ obj.sellPic }}</el-col>
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
      dataObj:[],
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
                    var dataArr=result[lenth-1];
                    var key=0;
                    for( key in dataArr){
                       this.dataObj.push(dataArr[key]);
                    }
                     
                }).catch((err) => {   //显示异常
                    console.log(err);
                });

    },

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* 列表 */
   .list_group{ padding-left: 15px;border-top: 8px solid #f5f5f5}
   .list_item { padding: 10px;text-align: left; border-bottom: 1px solid #eeeeee;color: #333333}
   .list_item a{color: #333}
   .list_item:last-child{border-bottom: 0}
   .list_head{color: #999;border-bottom: 1px solid #f5f5f5;text-align: left;padding: 10px 0}
   .list_group i{ vertical-align: middle}


</style>