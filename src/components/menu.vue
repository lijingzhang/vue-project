<template>
<div class="popContainer" v-if="show"  @click="hidePanel"><!-- 遮罩层 -->
	<el-row class="menu w100 inblock">
	<el-col :span="24">
		<el-menu
		default-active="2"
		class="el-menu-vertical-demo"
		background-color="#545c64"
		active-text-color="#ffd04b"
		text-color="#fff" 
		id="myPanel" >
		<el-submenu index="1">
			<template slot="title">
			<i class="el-icon-location"></i>
			<span>导航一</span>
			</template>
			<el-menu-item-group>
			<template slot="title">分组一</template>
			<el-menu-item index="1-1"><router-link to="/list">选项1</router-link></el-menu-item>
			<el-menu-item index="1-2"><router-link to="/authentication">会员认证</router-link></el-menu-item>
			</el-menu-item-group>
			<el-menu-item-group title="分组2">
			<el-menu-item index="1-3">选项3</el-menu-item>
			</el-menu-item-group>
			<el-submenu index="1-4">
			<template slot="title">选项4</template>
			<el-menu-item index="1-4-1">选项1</el-menu-item>
			</el-submenu>
		</el-submenu>
		<el-menu-item index="2">
			<i class="el-icon-menu"></i>
			<span slot="title">导航二</span>
		</el-menu-item>
	
		<el-menu-item index="4">
			<i class="el-icon-setting"></i>
			<span slot="title">导航四</span>
		</el-menu-item>
		</el-menu>
	</el-col>
	</el-row>
</div>
</template>


<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {
		  show: true,
		
	  }
	},
	
    methods: {
		hidePanel: function(event){

		var sp = document.getElementById("myPanel");

		if(sp){

		if(!sp.contains(event.target)){            //这句是说如果我们点击到了id为myPanel以外的区域

		this.show = false;

		}

		}

		}
	}
  }

</script>

<style>

.menu{position: fixed; right: 10px;top: 45px;;
width: 55%;z-index: 9999;text-align: left;height: 100%;overflow-y: scroll;
}
.el-menu-item-group,.el-submenu{ position: relative;}
.el-menu-item-group__title {
    padding: 7px 0 7px 20px;
    line-height: normal;
    font-size: 12px;
    color: #909399;
}
/* //遮罩层 */
.popContainer{
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;z-index: 9999;
    background: rgba(0,0,0,0.3);
}
</style>
