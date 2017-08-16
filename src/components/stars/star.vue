<template>
  <div class="star-content" :class="`star${size}`">
    <span class="star" v-for="item in star" :class="item"></span>
  </div>
</template>

<script>
  export default {
    props: ['score','size'],
    computed: {
      star () {
        let stars = [];
        let score = this.score ;
        //假如3.6分 三颗满星 一颗半星 一颗灰星
        //先取得整星
        let on = Math.floor(score);
        for(let i = 0;i<on;i++){
          stars.push('on')
        }
        //再取半星
        let half = score - on;
        if (half >=0.5){
          stars.push('half')
        }
        //最后取灰星
        let off = Math.round(5-score);
        for (let a = 0;a<off;a++){
          stars.push('off')
        }
        return stars
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star-content
    text-align center
    .star
      display inline-block
      background-size 100% 100%
      background-repeat no-repeat
    &.star24
      .star
        width 10px
        height 10px
        margin-right 10px
        &:last-child
          margin-right 0
        &.on
          bg-color("../stars/star24_on")
        &.off
          bg-color("../stars/star24_off")
        &.half
          bg-color("../stars/star24_half")
    &.star36
      .star
        width 15px
        height 15px
        margin-right 15px
        &:last-child
          margin-right 0
        &.on
          bg-color("../stars/star36_on")
        &.off
          bg-color("../stars/star36_off")
        &.half
          bg-color("../stars/star36_half")
    &.star48
      .star
        width 20px
        height 20px
        margin-right 20px
        &:last-child
          margin-right 0
        &.on
          bg-color("../stars/star48_on")
        &.off
          bg-color("../stars/star48_off")
        &.half
          bg-color("../stars/star48_half")
</style>
