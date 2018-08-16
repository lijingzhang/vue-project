<template>
	<div >
	<el-container>
		<v-header title="实名认证">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
		<el-main>
			<div class=" pl0">
				<el-form ref="form" :rules="rules" :model="form"  label-width="80px">
					<el-form-item label="真实姓名" prop="username">
						<el-input v-model="form.username"  type="text" ></el-input>
					</el-form-item>
					<el-form-item label="身份证ID" prop="idcard">
						<el-input v-model="form.idcard" type="text" ></el-input>
					</el-form-item>
                   <el-form-item label="出生日期" prop="birthday">
						<el-row>
							<el-col :span="20">	<el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" ></el-date-picker></el-col>
							<el-col :span="4" ><i class="el-icon-arrow-right"></i></el-col>
						</el-row>
					</el-form-item>
                    <el-form-item label="电子邮件" prop="email">
						<el-input v-model="form.email" type="text" ></el-input>
					</el-form-item>
                    <el-form-item label="地区" prop="address">
						<el-row>
								<el-col :span="20"><el-input v-model="form.address" type="text" placeholder="所在地区" @focus="areapicker()" ></el-input></el-col>
								<el-col :span="4" ><i class="el-icon-arrow-right"></i></el-col>
						</el-row>
						<div class="popContainer" v-if="isShow" @click="isShow=false">
							<v-distpicker type="mobile"
							:selected="form.address" 
							@selected="onSelected"
							>
							</v-distpicker>
						</div>
					</el-form-item>
                    <el-form-item label="详细地址" prop="detailaddress">
						 <el-input v-model="form.detailaddress"   type="textarea" :rows="2" ></el-input>
					</el-form-item>
					<el-row class="p15">
						<el-col :span="24">
						<el-button class="w100" type="primary" @click="onSubmit('form')">认证</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>	
		</el-main>
		<v-footer ></v-footer>
	</el-container>
</div>
</template>

<script>
    export default {
        data() {
			return {
				form: {//form名称
					username: '',
					idcard: '',
                    birthday: '',	
                    email: '',	
                    address: '',	
					detailaddress: '',
						
				},
				 rules: {
					  username: [
					     { required: true, message: '请输入用户名',  trigger: ['blur', 'change'] },
					],
					idcard: [
					  { required: true, message: '请输入身份证号码', trigger: ['blur', 'change'] },
					],
				 },
			
				isShow:false
				
			}
                 		
		},
		methods: {
			onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
					var d = new Date(this.form.birthday);  
					this.form.birthday=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                    var formData= JSON.stringify(this.form); // 获取表单数据并转为json数组
                    var params  = new URLSearchParams();
					params.append('datas', formData);
					 this.$http.post("/api/user/authentication",params, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  })
                  .then(response=>{
						let Data=response.data;
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
								this.$confirm("恭喜您，认证成功!", '提示', {
								confirmButtonText: '确定',
								center: true,
								showClose:false,
								showCancelButton:false,
								callback: action => {
								this.$router.push("/index")
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
				onSelected(data){
					if(data.area.value!=undefined){
						 this.form.address=data.province.value+data.city.value+data.area.value;
						 this.isShow=false;//地区选择包括遮罩层
					}
					

				},
				areapicker(){
					  this.isShow=true;//地区选择包括遮罩层
				},
				datea(){
					
				}
			
			
		
	
		}
	}
</script>
<style>

  .distpicker-address-wrapper{
    height: 50%;
    overflow-y: auto;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%; color: #999;z-index: 99999;
  }
  .distpicker-address-wrapper .address-header{
    position: fixed;
    bottom: 50%;
    width: 100%;
border-radius: 10px 10px 0 0;background-color: #f5f5f5
  }

.address-header ul li{
    flex-grow: 1;
    text-align: center;
  }

.address-container .active{
    color: #000;
  }
.distpicker-address-wrapper .address-container {
    overflow: auto;
    height: 100%;
}
.distpicker-address-wrapper .address-header ul li.active{ border-bottom: none}
.distpicker-address-wrapper .address-container{ background: #fff} 
.el-textarea__inner{ border: none}
/* 遮罩层 */
.popContainer{
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;z-index: 9999;
    background: rgba(0,0,0,0.3);
}
</style>

