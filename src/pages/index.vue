<template>
  <div >
    <el-container>
    <v-header title="南方汇兑"></v-header>
        <el-main >
          <div class="sub_header">
           <el-row>
            <el-col :span="12">
               <div><img class="img3x pb10" src="/static/images/sk_code.png" alt=""></div>
               <div>收款码</div>
            </el-col>
            <el-col :span="12">
              <div><img class="img3x pb10" src="/static/images/sm_code.png" alt=""></div>
               <div>扫码付</div>
            </el-col>
          </el-row>
        </div>
          <el-row>
            <el-col :span="8" >
              <router-link  to="/">
                <div><img class="img2x pb10" src="/static/images/icon_tx.png"  alt=""></div>
                <div>提现</div>
              </router-link>
            </el-col>
            <el-col :span="8" >
               <router-link   to="/">
                <div><img class="img2x pb10"  src="/static/images/phone.png" alt=""></div>
                <div>话费充值</div>
              </router-link>
            </el-col>
             <el-col :span="8" >
               <router-link  to="/">
                <div><img class="img2x pb10" src="/static/images/icon_zz.png" alt=""></div>
                <div>转账</div>
              </router-link>
            </el-col>
          </el-row>
           <el-row>
            <el-col :span="8" >
              <router-link  to="exchange">
                <div><img class="img2x pb10" src="/static/images/icon_dh.png" alt=""></div>
                <div>兑汇</div>
              </router-link>
            </el-col>
            <el-col :span="8" >
               <router-link   to="/">
                <div><img class="img2x pb10"  src="/static/images/icon_lc.png" alt=""></div>
                <div>理财</div>
              </router-link>
            </el-col>
             <el-col :span="8"  >
               <router-link  to="/">
                <div><img class="img2x pb10" src="/static/images/icon_sh.png" alt=""></div>
                <div>生活</div>
              </router-link>
            </el-col>
          </el-row>
           <el-row>
            <el-col :span="8" >
              <router-link  to="/">
                <div><img class="img2x pb10" src="/static/images/icon_cz.png" alt=""></div>
                <div>充值</div>
              </router-link>
            </el-col>
            <el-col :span="8" >
               <router-link   to="todayrate">
                <div><img class="img2x pb10"  src="/static/images/icon_hl.png" alt=""></div>
                <div>汇率</div>
              </router-link>
            </el-col>
             <el-col :span="8" >
               <router-link  to="/">
                <div><img class="img2x pb10" src="/static/images/icon_zd.png" alt=""></div>
                <div>账单查询</div>
              </router-link>
            </el-col>
          </el-row>
        </el-main>
    	<v-footer ></v-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
  
    }
  },
  mounted(){
  
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
.sub_header{ background: #0d0d0d;color: #fff;padding: 15px 0}
.el-row .el-col-8{border-right: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5;min-height: 130px;
 padding: 20px 0;

 }


.el-row .el-col-8:last-child{border-right:0}
@function imgpx($px) {
    @return $px / 75px * 1rem;
}
.img3x{width: imgpx(300px)}
.img2x{width: imgpx(200px)}
</style>
