<template>
  <div class="nav">
  <router-link to="/goods" class="nav-item">Order
    <i class="line"></i>
  </router-link>
  <router-link to="/ratings" class="nav-item">Rating
    <i class="line"></i>
  </router-link>
  <router-link to="/sellers" class="nav-item">Basic information
    <i class="line"></i>
  </router-link>
  </div>
</template>
<script>
export default{

}
</script>
<style>
.nav{
display: flex;
width: 100%;
height: 40px;
line-height: 40px;
border-bottom:1px solid #FFBB22;
}
.nav .nav-item{
  flex: 1;
  text-align: center;
  font-size: 13px;
  text-decoration: none;
  color: aqua;
  position: relative;
}
.nav .active{
  color:black;
}
.nav .active .line{
width: 21px;
height: 2px;
display: inline-block;
background: pink;
position: absolute;
left: 50%;
bottom: 0;
margin-left: -10px;
}
</style>