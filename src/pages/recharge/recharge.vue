<template>
	<div >
	<el-container>
		<v-header title="登录">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
		<el-main>
			<div class=" pl0">
				<el-form ref="form" status-icon :model="form" :rules="rules" label-width="65px">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="form.username"  placeholder="请输入用户名" ></el-input>
					</el-form-item>
					<el-form-item label="密  码" prop="password">
						<el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-row >
						<el-col :span="24">
						<el-button class="w100 mb15" type="primary" @click="onSubmit('form')">登录</el-button>
						</el-col>
						<el-col :span="24">
						<el-button class="w100" type="info" plain @click="skip('/register')">注册</el-button>
						</el-col>
					</el-row>
					<el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>
						<el-button type="text" @click="showAlert">点击弹框</el-button>
				</el-form>
			</div>	
            
		</el-main>
	</el-container>
    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="80%"
        center>
        <span>需要注意的是内容是默认不居中的</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>

    export default {
        data() {
			return {
				form: {//form名称
					username: '',
					password: ''
					
				},
				 rules: {
					  username: [
					     { required: true, message: '请输入用户名',  trigger: ['blur', 'change'] },
						{ min: 3,message: '长度至少3个字符', trigger: 'blur' }
					],
					password: [
					 { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
						{ min: 6,  message: '长度在至少6个字符', trigger: 'blur' }
					],
                 },
                  centerDialogVisible: false

			}
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
                  })
                  .then(response=>{
						// this.goods=response.data;
						console.log(response.data);
						this.$router.replace({ path: '/home' })//跳转到home页面
					})
					.catch(error=>{
					alert("网路错误，不能访问");
					});
					} else {
						console.log('error submit!!');
						return false;
					}
					});
				},
				showAlert:function(){
					swal('Hello Vue world!!!');
				},
			  skip:function(a){
				this.$router.push(a)}//点击页面跳转
			}  
	
    }
</script>

