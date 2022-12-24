<template>
  <div class="shopcart" :class="{'highlight':totalCount>0}">
    <div class="shopcart-wrapper">
    <div class="content-left">
      <div class="logo-wrapper" @click="toggleList">
        <span class="icon-shopping_cart logo"></span>
        <i class="num">{{totalCount}}</i>
      </div>
      <div class="desc-wrapper">
        <p class="total-price" v-show="totalPrice">{{totalPrice}}</p>
        <p class="tip">Additional delivery fee {{poiInfo.shipping_fee_tip}}</p>        
      </div>
    </div>
    <div class="content-right">
      {{payStr}}
    </div>
    <div class="shopcart-list"
     v-show="listShow"
     :class="{'show':listShow}">
      <div class="list-top" v-if="poiInfo.discounts2">
        {{poiInfo.discounts2[0].info}}
      </div>
      <div class="list-header">
        <h3 class="title">1号</h3>
        <div class="empty" @click="empty">
          <img src="./ash_bin.png" />
          <span>清空购物车</span>
        </div>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <div class="desc-wrapper">
              <div class="desc-left">
                <p class="name">{{food.name}}</p>
                <p class="unit" v-show="!food.unit">{{food.unit}}</p>
                <p class="description" v-show="food.description">{{food.description}}</p>
              </div>
              <div class="desc-right">
                <span class="price">${{food.min_price}}</span> 
              </div>
            </div>
            <div class="cartcontrol-wrapper">
              <cartControl :food="food"></cartControl>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-bottom"></div>
    </div>
    <div class="shopcart-mask" 
    v-show="listShow"
    @click="hideMask"></div>
  </div>
  </div>

</template>
<script>
import cartControl from '../CartControl/cartControl.vue';
import BScroll from 'better-scroll'
export default{
  data(){
    return{
      fold:true
    }
  },
  props:{
    // min_price_tip:{
    //   type:String,
    //   default:''
    // },
    // shipping_fee_tip:{
    //   type:String,
    //   default:''
    // },
    poiInfo:{
      type:Object,
      default:{}
    },
    selectFoods:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  computed: {
    totalCount(){
      let num = 0;
      this.selectFoods.forEach((food) =>{
        num += food.count;
      })
      return num;
    },
    totalPrice(){
      let total = 0;
      this.selectFoods.forEach((food)=>{
        total += food.min_price * food.count;
      })
      return total;
    },
    payStr(){
      if(this.totalCount >0){
        return "去结算";
      }else{
        return this.poiInfo.min_price_tip
      }
    },
    listShow(){
      if(!this.totalCount){
        // 个数为0
        this.fold = true;
        return false;
      }
      let show =!this.fold;
      // BScroll相关
      if(show){
        this.$nextTick(()=>{
        if(!this.shopScroll){
          this.shopScroll = new BScroll(this.$refs.listContent,{
            click:true
          });
        }else{
          this.shopScroll.refresh()
        }
      })
      }
      return show;
    }
  },
  methods:{
    toggleList(){
      if(!this.totalCount){
        return;
      }
      this.fold = !this.fold;
    },
    empty(){
      this.selectFoods.forEach((food)=>{
        food.count = 1
      })
    },
    hideMask(){
      this.fold = true;
    }
  },
  components:{
    cartControl,
    BScroll
  },
}
</script>
<style>
@import url("shopcart.css");
</style>