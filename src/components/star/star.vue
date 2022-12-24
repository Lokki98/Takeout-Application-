<template>
<div class="star">
    <span v-for="itemClass in itemClass" :class="itemClass" class="star-item">

    </span>
</div>
</template>
<script>
// 星星长度
const Length = 5;
// 星星对于class
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default{
    props:{
        score:{
            type:Number
        }
    },
    computed: {
        itemClass(){
            let result = [];
            let score = Math.floor(this.score*2)/2;
            let hasDecimal = score % 1 !== 0;
            // 小数 控制半星
            let integer = Math.floor(score);
            for(let i=0;i<integer;i++){
                result.push(CLS_ON)
            }
            if(hasDecimal){
                result.push(CLS_HALF)
            }
            while(result.length < Length){
                result.push(CLS_OFF)
            }
            return result;
        }
    },
}
</script>
<style>
.star{
    font-size: 0;
}
.star .star-item{
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-repeat: no-repeat;
    background-size: 10px 10px;
}
.star .star-item:last-child{
    margin-right: 0;
}
.star .on{
    background-image: url(star24_on@2x.png);
}
.star .half{
    background-image: url(star24_half@2x.png);
}
.star .off{
    background-image: url(star24_off@2x.png);
}
</style>