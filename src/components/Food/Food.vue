<template>
  <div class="food" v-show="showFlag">

  </div>
</template>
<script>
export default{
data() {
  return {
    showFlag:false
  }
},
props:{
  food:{
    type:Object
  }
},
methods: {
  showView(){
    this.showFlag = true;
  }
},
}
</script>
<style scoped>
@import url("Food.css");
</style>
