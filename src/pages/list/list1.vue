<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="列表">
        <span slot="left"  @click="$common.back()">返回</span>
     <i  slot="right" @click="showMenu"  class="el-icon-menu">menu</i>
    </v-header>
      <v-menu v-if="show" ></v-menu>
    <scroller  :on-infinite="infinite" :on-refresh="refresh"  refreshText="下拉刷新" noDataText="—— ——  已经到底了 —— ——" ref="myscroll">
    <el-main class="pt0" >
      <div class="news" v-for="news in dataArr">
          <v-touch v-on:swipeleft="onSwipeLeft(news.id)">
            <img :src="news.img" alt="" class="news-image">
            <div class="news-info">
                <div class="news-title">{{ news.title }}</div>
                <div class="news-remark">{{ news.source }}</div>
            </div>
            </v-touch>
          <div class="delete_btn" @click="deletes(id)"  v-if="news.id == currentId&&isShow" >删除</div>
          
      </div>
    </el-main>
    </scroller>
  </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataArr:[],
      noData:'',
      datalength:0,
      show:false  , //菜单默认隐藏
      isShow:false,
      currentId:''
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
          this.$http.get('http://182.92.167.237:8001/news').then(res => {
                    var result = res.data;
                    var data=result.list;
                     this.dataArr=[];//必须置空数组，才能下拉刷新不重复
                    // this.data = data;   
                      for(let i = 0; i <data.length ; i++) {
                        this.dataArr.push(data[i])
                      }
                    this.datalength=data.length;//赋值
                  
                }).catch((err) => {   //显示异常
                    console.log(err);
                });

    },
    infinite(done){
      if(this.noData) {
        setTimeout(() => {
          this.$refs.myscroll.finishInfinite(2);
        })
        return;
      }
  

      let self = this;
      let start = this.dataArr.length;
    // console.log(self.datalength);//数组长度
      setTimeout( () => {
        if(start >self.datalength){
          self.noData = "---已经到底了---"
        }
        else
        {
        for(let i = start + 1; i < start + 10; i++){
              if(i >self.datalength){
              self.noData = "---已经到底了---";  
              break; 
                }
                else{
                    self.dataArr.push(i);
                }
           
            }
        
}
        self.$refs.myscroll.resize();

        done()
      }, 1500)
    },
    refresh(done) {
       let self = this;
       console.log(this.dataArr.length);
      setTimeout(() => {
      this.$options.methods.loadData.bind(this)();//调用methods中的另一个方法
       done()
      }, 1500)

    },
    showMenu(){
      this.show=!this.show;
    },
    onSwipeLeft(id){
      self=this;
      self.isShow=true;
      this.currentId=id; 
    },
    deletes(id){
      swal({ 
      title: "", 
      text: "确定删除吗？", 
      type: "warning",
      showCancelButton: true, 
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "确定", 
      cancelButtonText: "取消",
      closeOnConfirm: false, 
      closeOnCancel: false	
    },
    function(isConfirm){ 
      if (isConfirm) { 
     swal({
      title: '提交email来运行ajax请求',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: function(email) {
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            if (email === 'taken@example.com') {
              reject('该email已存在。');
            } else {
              resolve();
            }
          }, 2000);
        });
      },
      allowOutsideClick: false
    }).then(function(email) {
      swal({
        type: 'success',
        title: 'Ajax请求完成！',
        html: '提交的email是：' + email
      });
    })
      } 
    });
    }
    
  },


  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .news {
        display: flex;
        align-items: stretch;
        padding: 10px;
        border-bottom: 1px solid #eeeeee;position: relative
    }
    
    .news:active {
        background-color: #f3f3f3;
    }

    .news-image {
        flex-shrink: 0;float: left;
        width: 95px;
        height: 62px;
        display: block;
        margin-right: 10px;
    }

    .news-info {
        padding: 5px 0;width: 60%;float: left;
        flex: 1;
        display: flex;text-align: left;
        flex-direction: column;
        justify-content: space-between;
    }

    .news-title {
        font-size: 14px;
        color: #333;
        line-height: 1.2;
    }

    .news-remark {
        font-size: 12px;
        color: #999;
    }
    .delete_btn{position: absolute;right: 0;top: 0;display: inline-block;width: 30px;line-height: 40px; height: 100%;background-color: #666;color: #fff;
    padding: 0 10px;}
</style>
