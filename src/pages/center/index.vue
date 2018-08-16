<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
  
         <el-main style="padding-top:0">
             <!-- <div>
                <el-upload
                    class="avatar-uploader"
                    action="../../data.json"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
             </div> -->
             <div class="headcenter">
                 <div class="top tc">
                      个人中心   <router-link class="r" to="/setting" ><i   class="el-icon-setting">设置</i></router-link>
                </div>
                <div class="content">
                    <div class="tc"><img src="/static/images/head.png" class="img3x" alt=""></div>
                    <div class="tc">夏目</div>
                    <div class="tc f12 pt5 pb20">上次登录 昨天</div>
                    <el-row >
                        <el-col :span="6">
                            <div >2</div>
                            <div>银行卡</div>
                        </el-col>
                        <el-col :span="6" >
                            <div >2</div>
                            <div>待办</div>
                        </el-col>
                        <el-col :span="6" >
                            <div>2</div>
                            <div>待办</div>
                        </el-col>
                        <el-col :span="6" >
                            <div>2</div>
                            <div>待办</div>
                        </el-col>
                    </el-row>  
                </div>
                
             </div>
            <el-row class="pt15 pb15 ">
                <el-col :span="6">
                    <div ><img src="/static/images/center_xx.png" class="img1x" alt=""></div>
                    <div>信箱</div>
                </el-col>
                <el-col :span="6" >
                    <div ><img src="/static/images/center_jd.png" class="img1x" alt=""></div>
                    <div>我的借贷</div>
                </el-col>
                <el-col :span="6" >
                    <router-link to="/loan">
                        <div ><img src="/static/images/center_jl.png" class="img1x" alt=""></div>
                        <div>收支记录</div>
                    </router-link>
                </el-col>
                <el-col :span="6" >
                    <div ><img src="/static/images/center_zh.png" class="img1x" alt=""></div>
                    <div>账户总览</div>
                </el-col>
            </el-row>  
            <div class="list_group">
                <div class="list_head">
                    我的
                </div>
                <div class="list_item" >
                    <router-link to="/authentication">
                        <el-row>
                            <el-col :span="2" ><i class="el-icon-date"></i></el-col>
                            <el-col :span="20" >实名认证</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
                 <div class="list_item" >
                    <router-link to="/account">
                        <el-row>
                            <el-col :span="2" ><i class="el-icon-date"></i></el-col>
                            <el-col :span="20" >我的账户</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
            </div>
            <div class="list_group">
                <div class="list_head">
                    交易
                </div>
                <div class="list_item" >
                    <router-link to="/recharge">
                        <el-row>
                            <el-col :span="2" ><i class="el-icon-date"></i></el-col>
                            <el-col :span="20" >充值</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
               <div class="list_item" >
                    <router-link to="/recharge">
                        <el-row>
                            <el-col :span="2" ><i class="el-icon-date"></i></el-col>
                            <el-col :span="20">提现</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
                <div class="list_item" >
                    <router-link to="/recharge">
                        <el-row>
                            <el-col :span="2" ><i class="el-icon-date"></i></el-col>
                            <el-col :span="20">转账</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
            </div>
         </el-main>
         <v-footer ></v-footer>
      </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
       imageUrl: ''
    }
  },
  methods: {
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    
  }

}
</script>
<style lang="scss">
 /* 列表 */
   .list_group{ padding-left: 15px;border-top: 8px solid #f0eff5}
   .list_item { padding: 10px;text-align: left; border-bottom: 1px solid #eeeeee;color: #333333}
   .list_item a{color: #333}
   .list_item:last-child{border-bottom: 0}
   .list_head{color: #999;border-bottom: 1px solid #f5f5f5;text-align: left;padding: 10px 0}
   .list_group i{ vertical-align: middle}

   /* 头像 */
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.top{	position: relative;
		line-height: 45px;
		color: #fff;
		text-align: center;
		width:100%;
	
    a{position: absolute	;right: 10px;color: #fff;}    
        }
	@media (min-width: 320px){
    .top{font-size:14px;}
	}
	
	@media (min-width: 360px){
	.top{font-size:16px;}
	}
@function imgpx($px) {
    @return $px / 75px * 1rem;
}
.img3x{width: imgpx(300px)}
.img2x{width: imgpx(200px)}
.img1x{width: imgpx(100px)}
  .headcenter{
      background: url("/static/images/centerbg.png") no-repeat center;background-size: cover;padding: 0 0 15px 0;color:#fff;
      .content{
          img{border-radius: 50%;}
      }
  }
</style>
