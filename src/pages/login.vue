<template>
	<div>
	<el-container>
		<v-header title="登录">
		
		</v-header>
		<el-main class="p15 pt55">
			<div class=" pl0">
				<div class="tc mb15"><img src="../assets/images/logo.png" width="120"></div>
				<el-form ref="form"  :model="form" :rules="rules" label-width="65px">
					<el-form-item label="用户名" prop="telphone">
						<el-input v-model="form.telphone"  placeholder="请输入用户名" ></el-input>
					</el-form-item>
					<el-form-item label="密  码" prop="password">
						<el-input v-model="form.password" type="password"  placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-row >
						<el-col :span="24">
						<el-button class="w100 mt15 mb15" type="primary" @click="onSubmit('form')">登录</el-button>
						</el-col>
						<el-col :span="24">
						<el-button class="w100" type="info" plain @click="$common.skip('/#/register')">注册</el-button>
						</el-col>
					</el-row>
					 <!-- <el-checkbox  style="color:#a0a0a0;">一周内自动登录</el-checkbox> -->
				</el-form>
			</div>	
		</el-main>
	</el-container>
</div>
</template>
<script>
import * as types from '../store/types.js'
    export default {
        data() {
			return {
				form: {//form名称
					telphone: '',
					password: '',
					
				},
				 rules: {
					  telphone: [
					     { required: true, message: '请输入用户名',  trigger: ['blur', 'change'] },
						{ min: 3,message: '长度至少3个字符', trigger: ['blur', 'change'] }
					],
					password: [
					  { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
						{ min: 6,  message: '长度在至少6个字符', trigger: ['blur', 'change'] }
					],
				 },

			}
		},
		//页面加载调用获取cookie值
		mounted(){
		this.getCookie();
	     this.$store.commit(types.TITLE, 'Login');
        },
		methods: {
			onSubmit(formName) {
				  this.$refs[formName].validate((valid) => {
					if (valid) {
					var formData= this.$qs.stringify(this.form) // form为form名称获取表单数据
					 this.$http.post("/api/user/login",formData, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
				  }).then(response=>{
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
							 if (this.form.password) {
								this.$store.commit(types.LOGIN, this.form.password)
								let redirect = decodeURIComponent(this.$route.query.redirect || '/');
								this.$router.push({
									path: redirect
								})
							}
							//保存的账号
							var name=this.form.telphone;
							this.setCookie(name,30);//设置cookie保存一个月
							setTimeout( () => {
								 this.$router.push("/index")
							
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
					//设置cookie
					setCookie(c_name,exdays) {
						var exdate=new Date();//获取时间
						exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
						//字符串拼接cookie
						window.document.cookie="telphone"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
						
					},
					//读取cookie
					getCookie:function () {
						if (document.cookie.length>0) {
						var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
						for(var i=0;i<arr.length;i++){
							var arr2=arr[i].split('=');//再次切割
							//判断查找相对应的值
							if(arr2[0]=='telphone'){
							this.form.telphone=arr2[1];//保存到保存数据的地方
							// let tel = this.form.telphone;
							// let reg = /^(\d{3})\d{4}(\d{4})$/;
							// this.form.telphone = tel.replace(reg, "$1****$2");

							}
						}
						}
					},
					  //清除cookie
					clearCookie:function () {
						this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
					}
			 }
	
    }
</script>


