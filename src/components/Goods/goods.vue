<template>
  <div class="home">
    <!-- 菜单分类 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <li class="menu-item" @click="selectMenu(0)">
          <p class="text">
            <img src="container.tag_icon" v-if="container.tag_icon" alt="" class="icon">
            {{container.tag_name}}
          </p>
        </li>
        <li class="menu-item" v-for="(item,index) in goods" 
        :class="{'current':currentIndex===index+1}"
        @click="selectMenu(index+1)">
        
          <p class="text">
            <img :src="item.icon" v-if="item.icon" alt="" class="icon">
            {{item.name}}
            <i class="num" v-show="calculateCount(item.spus)">
          {{calculateCount(item.spus)}} 
            </i>
          </p>
          
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场 -->
        <li class="container-list food-list-hook">
          <div v-for="item in container.operation_source_list">
            <img :src="item.pic_url">
          </div>
        </li>
        <li v-for="item in goods" class="food-list food-list-hook"
        >
          <h3 class="title">{{item.name}}</h3>
          <ul>
            <li v-for="food in item.spus" class="food-item">
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <div class="praise">{{food.praise_content}}</div>
                </div>
                <img :src="food.product_label_picture" alt="" class="product">
                <p class="price">
                  <span class="text">{{food.min_price}}</span>
                  <span class="unit">{{food.unit}}</span>
                </p>
              </div>
              <div class="cartcontrol-wrapper">
                <cartControl :food="food"></cartControl>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart 
    :poiInfo="poiInfo"
    :selectFoods="selectFoods"></shopCart>
    <!-- <FoodVue :food="selectedFood" ref="foodView"></FoodVue> -->
  </div>
</template>
<script>
import BScroll from 'better-scroll' 
import shopCart from '../shopCart/shopcart.vue';
import cartControl from '../CartControl/cartControl.vue';
import FoodVue from '../Food/Food.vue';
export default{
  data(){
    return{
      container:{},
      goods:[],
      listHeight:[],
      scrollY:0,
      menuScroll:{},
      foodScroll:{},
      poiInfo:{},
      // foods:[]
      // selectFoods:{}
    }
  },
  // 发起异步请求
  created() {
    var that = this;
    this.$axios.get('/api/goods')
    .then(function(response){
      var datasource = response.data;
      if(datasource.code ==0){
        that.container = datasource.data.container_operation_source;
        that.goods = datasource.data.food_spu_tags;
        that.poiInfo = datasource.data.poi_info;
        that.$refs.foodScroll.height = innerHeight
        // 调用滚动的初始化方法
            that.$nextTick(()=>{
              // DOM已经更新
              that.initScroll();
              that.calculateHeight();
            });
      }
    })
    .catch(function(error){
      console.log(error);
    });

  },
  methods:{
    // 计算属性(不能传递参数)
    head_bg(imgName){
      return "background-image:url(" + imgName + ");"
    },
    initScroll(){
      // ref属性就是用来绑定某个dom元素或某个组件 然后再this.$refs里找到
      this.menuScroll = new BScroll(this.$refs.menuScroll,{
        disableMouse:false,
        disableTouch:false,
        mouseWheel:true,
        click:true
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll,{
        disableMouse:false,
        disableTouch:false,
        mouseWheel:true,
        probeType:3,
        click:true
      });
      this.foodScroll.on("scroll",(pos)=>{
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calculateHeight(){
      // 通过$refs获取到对应的元素
      let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      // 添加到数组区间
      let height = 0;
      this.listHeight.push(height);
      for(let i = 0;i<foodList.length;i++){
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height)
      }
    },
    selectMenu(index){
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      // 根据下标 滚动到相对于的元素
      let el = foodlist[index];
      this.foodScroll.scrollToElement(el,240)
    },
    calculateCount(spus){
      let count = 0;
      spus.forEach((food)=>{
        if(food.count>0){
          count += food.count;
        }
      });
      return count;
    }
    // showDetail(food){
    //   this.selectedFood = food;
    //   this.$refs.foodView.showView();
    // }
  },
  computed: {
    currentIndex(){
      // 根据右侧滚动位置,确定对应的索引下标
      for(let i = 0;i<this.listHeight.length;i++){
        // 获取商品区间的范围
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i+1];
        if(this.scrollY>=height1&&this.scrollY<height2){
          return i;
        }
      }
      return 0;
    },
    selectFoods(){
      let foods = [];
      this.goods.forEach((good)=>{
        good.spus.forEach((food)=>{
          if(food.count>0){
            foods.push(food)
          }
        });
      });
      return foods
    },
  },
  components:{
    shopCart,cartControl,
    BScroll
  }
}
</script>
<style>
@import url("Goods.css");
</style>