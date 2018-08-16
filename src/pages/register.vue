<template>
	<div>
	<el-container>
		<v-header title="注册">
			<!-- <span slot="left"  @click="$common.back()">返回</span> -->
		</v-header>
		<el-main class="p15 pt55">
			<div class=" pl0">
					<div class="tc mb15"><img src="../assets/images/logo.png" width="120"></div>
				<el-form ref="form" status-icon :model="form"  label-width="65px">
					<el-form-item label="手机号" prop="telphone">
						<el-input v-model="form.telphone"  placeholder="请输入手机号" ></el-input>
					</el-form-item>
                     <el-form-item label="验证码" prop="checkNum">
                         <el-row >
                        	<el-col :span="14">
	                            <el-input class="l" v-model="form.checkNum" type="text" placeholder="请输入验证码"></el-input>
                            </el-col>
                            <el-col :span="9">
                                <el-button  type="primary" class="r w100 blue_bg white code_btn" v-if="sendMsgDisabled">{{time+'秒后获取'}}</el-button>
								<el-button  type="primary" class="r w100 blue_bg white code_btn" v-if="!sendMsgDisabled"  @click="sendcode()">发送验证码</el-button>  
                             </el-col>
                         </el-row>    
					</el-form-item>
					<el-form-item label="密  码" prop="password">
						<el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
					</el-form-item>
                   
					<el-row class="mt20">
						<el-col :span="24">
						<el-button class="w100 mb15" type="primary" @click="onSubmit('form')">注册</el-button>
						</el-col>
						<el-col :span="24" class="tr">
                            	<span>已有账号？</span><router-link to="/login">登录</router-link>
						</el-col>
					</el-row>
					<!-- <el-button @click="resetForm('form')">重置</el-button> -->
				</el-form>
			</div>	
		</el-main>
	</el-container>
</div>
</template>

<script>
    export default {
        data() {
			return {
				form: {//form名称
					telphone: '',
					password: '',
					checkNum: '',	
				},
				
				time: 60, // 发送验证码倒计时
				sendMsgDisabled: false

			}
		},
		methods: {
			onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
					var formData= this.$qs.stringify(this.form) // form为form名称获取表单数据
					 this.$http.post("/api/user/register",formData, {
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
							setTimeout( () => {
								this.$confirm("恭喜您，注册成功!", '提示', {
								confirmButtonText: '确定',
								center: true,
								showClose:false,
								showCancelButton:false,
								callback: action => {
								this.$router.push("/login")
								}
								});
								
							 }, 1000);
						}
					})
					.catch(error=>{
					   //超时之后在这里捕抓错误信息.
                     console.log(error);
					});
					} else {
						console.log('error submit!!');
						return false;
					}
					});
				},
				sendcode(){
					let self = this;
					self.sendMsgDisabled = true;
					let interval = window.setInterval(function() {
					if ((self.time--) <= 0) {
						self.time = 60;
						self.sendMsgDisabled = false;
						window.clearInterval(interval); //停止
					}
					}, 1000);
					var params  = new URLSearchParams();
					params.append('telphone', this.form.telphone);
						this.$http.post("/api/user/checkPhone",params, {
						headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
						}
					})
                  .then(response=>{
						var Data=response.data;
						if(Data.code=="fail"){
						 this.$confirm('手机号不正确', '提示', {
							confirmButtonText: '确定',
							center: true,
							showClose:false,
							showCancelButton:false
							})
						}
						else{
							console.log(Data);
							// setTimeout( () => {
							// 	this.$router.push("/login")
							//  }, 1000);
						}
					})
					.catch(error=>{
					alert("网路错误，不能访问");
					});
				}
				
				
				
		}
	
    }
</script>

<style>
.code_btn.el-button{    height: 35px;line-height: 10px;margin-left: 5px;}
</style>
