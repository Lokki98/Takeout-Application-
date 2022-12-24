<template>
  <div class="header">
    <!-- 顶部通栏 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
          <span class="icon-arrow_lift"></span>
        </div>

      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input class="search-bar" type="text" placeholder="search items in the store">
      </form>

      <div class="more-wrapper">
        <a class="spelling-bt" href="#">Grouping</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
  </div>

  <div class="content-wrapper">
    <div class="icon" :style="head_bg">
    </div>
    <div class="name">
      <h3>{{poiInfo.name}}</h3>
    </div>
    <div class="collect">
      <img src="../../../resource/img/star.png" alt="">
      <span>Favorites</span>
    </div>
  </div>

  <div class="bulletin-wrapper">
    <img class="icon" v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" alt="">
    <span class="text" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
    <div class="detail" v-if="poiInfo.discounts2" @click="showBulletin">
      {{poiInfo.discounts2.length}}个活动</div>
  </div>

  <div class="bg-wrapper" :style="content_bg">
  </div>
  <transition name="detail">
  <div class="bulletin-detail" v-show="isShow">
    <div class="detail-wrapper">
      <div class="main-wrapper" :style="detail_bg">
        <div class="icon" :style="head_bg"></div>
        <h3 class="name">{{poiInfo.name}}</h3>
        <!-- 评价 稍后 -->
        <p class="tip">
          {{poiInfo.min_price_tip}} <i>|</i>
          {{poiInfo.shipping_fee_tip}} <i>|</i>
          {{poiInfo.delivery_time_tip}}
        </p>
        <p class="time">
          Delivery time:{{
            poiInfo.shipping_time
          }}
        </p>
        <div class="discounts">
          <p v-if="poiInfo.discounts2">
            <img :src="poiInfo.discounts2[0].icon_url">
            <span>{{poiInfo.discounts2[0].info}}</span>
          </p>
        </div>
      </div>
      <div class="close-wrapper">
        <span class="icon-close" @click="closeBulletin"></span>
      </div>
    </div>
 </div> 
</transition>
</div> 
</template>
<script>
export default{
  data(){
    return {
    isShow:false
    }
  },
  props:{
    poiInfo:{
      type: Object,
      default:{}
    }
  },
  computed: {
    content_bg(){
      return "background-image:url(" + this.poiInfo.head_pic_url +");"
    },
    head_bg(){
      return "background-image:url(" + this.poiInfo.pic_url +");"
    },
    detail_bg(){
      return "background-image:url(" + this.poiInfo.poi_back_pic_url +");"
    }
  },
  methods:{
    showBulletin(){
      this.isShow = true
    },
    closeBulletin(){
      this.isShow = false
    }
  }
}
</script>


</script>
<style>
@import url("header.css");
@import url("../../common/styles/icon.css");
</style>