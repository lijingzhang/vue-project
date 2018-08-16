<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="设置">
        <span slot="left"  @click="$common.back()">返回</span>
    </v-header>
         <el-main>
            <div class="list_group">
                <div class="list_item" >
                    <router-link to="/authentication">
                        <el-row>
                            <el-col :span="22" >密码管理</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
                  <div class="list_item" >
                    <router-link to="/authentication">
                        <el-row>
                            <el-col :span="22" >绑定管理</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
                   <div class="list_item" >
                    <router-link to="/authentication">
                        <el-row>
                            <el-col :span="22" >手机号修改</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
            </div>
          
            <div class="p15 border-t10"><el-button class="w100" type="primary" plain @click="onSubmit()">安全退出</el-button></div>
         </el-main>
         <v-footer ></v-footer>
      </el-container>
  </div>
</template>

<script>
import * as types from '../../store/types.js'
export default {
  data () {
    return {
   
    }
  },
  methods: {
      onSubmit() {
			this.$alert('确认退出登录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showClose:false,
            showCancelButton:true,
           }).then(() => {
            this.$http.post("/api/user/logout",null, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  })
                  .then(response=>{
						var Data=response.data;
						if(Data.code=="fail"){
						 this.$confirm(Data.message, '提示', {
							confirmButtonText: '确定',
							center: true,
							showClose:false,
							showCancelButton:false
							})
						}
						else{
                          	this.$store.commit(types.LOGOUT); //退出重置
							setTimeout( () => {
                                this.$router.push("/login")
                             }, 1000);
                           
						
						}
					
					})
					.catch(error=>{
					   //超时之后在这里捕抓错误信息.
                     console.log(error);
                    });
                }).catch(() => {
                    console.log('取消')
                });
          
      
					
					
				},

  }

}
</script>
<style scoped>
    /* 列表 */
   .list_group{ padding-left: 15px;border-top: 8px solid #f5f5f5}
   .list_item { padding: 10px;text-align: left; border-bottom: 1px solid #eeeeee;color: #333333}
   .list_item a{color: #333}
   .list_item:last-child{border-bottom: 0}
   .list_head{color: #999;border-bottom: 1px solid #f5f5f5;text-align: left;padding: 10px 0}
   .list_group i{ vertical-align: middle}


</style>