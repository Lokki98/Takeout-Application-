<template>
  <div class="app">
  <MyHeader :poiInfo="poiInfo"></MyHeader>
  <MyNav></MyNav>
  <router-view></router-view>
  </div>
</template>
<script>
// import header from '@/components/header/header.vue'
import MyNav from "@/components/nav/nav.vue"
import MyHeader from '@/components/header/header.vue'
export default {
  components: { MyHeader,MyNav},
  name:'app',
  data(){
    return{
      poiInfo:{
      }
    }
  },
  // 发起异步请求
  created() {
    var that = this;
    this.$axios.get('/api/goods')
    .then(function(response){
      var datasource = response.data;
      if(datasource.code ===0){
        that.poiInfo = datasource.data.poi_info;
      }
    })
    .catch(function(error){
      console.log(error);
    });
  },

}
</script>
<style>
</style>