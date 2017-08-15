<template>
  <div>
    <ele-header></ele-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  export default {
    components: {
      'ele-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl'
  .tab
    display flex
    height 40px
    font-size 14px
    color rgb(77,85,93)
    line-height 40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex 1
      width 0
      text-align center
      .active
        color rgb(240,20,20)
      a
        display block
</style>
