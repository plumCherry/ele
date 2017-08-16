<template>
    <div class="header">
      <div class="top">
        <div class="avatar">
          <img :src="seller.avatar" width="64px" height="64px">
        </div>
        <div class="content-wrap">
          <div class="content-title">
            <span class="brandIcon"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="content-msg">
            <span class="send">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
          </div>
          <div class="content-discount" v-if="seller.supports">
            <span class="icon" :class="supports[seller.supports[0].type]"></span>
            <span class="pay">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="activity" v-if="seller.supports" @click="displayMessage(true)">
          <span class="message">{{seller.supports.length}}个</span>
          <span class="iconFont icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <div class="bulletin" @click="displayMessage(true)">
        <span class="public"></span>
        <span class="message">
          粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
        </span>
        <span class="iconFont icon-keyboard_arrow_right"></span>
      </div>
      <div class="background" ></div>
      <transition name="fade" >
        <div class="discount-information" v-show="isShow">
          <div class="info-content">
            <div class="content">
              <h1 class="title">{{seller.name}}</h1>
              <div class="stars">
                <star :score="seller.score" :size="48"></star>
              </div>
              <div class="message-contant">
                <span class="line"></span>
                <span class="message">优惠信息</span>
                <span class="line"></span>
              </div>
              <ul class="list" v-if="seller.supports">
                <li class="list-contant" v-for="message in seller.supports">
                  <span class="icon" :class="supports[message.type]"></span>
                  <span class="list-message">{{message.description}}</span>
                </li>
              </ul>
              <div class="seller-public">
                <span class="line"></span>
                <span class="public">商家公告</span>
                <span class="line"></span>
              </div>
              <div class="seller-introduction">
             <span class="introduction">
               {{seller.bulletin}}
             </span>
              </div>
            </div>
          </div>
          <div class="icon-footer" @click="displayMessage(false)">
            <span class="icon-close"></span>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import star from '../stars/star.vue'
  export default {
    data () {
      return {
        isShow: false,
        supports: ['decrease','discount','special','invoice','guarantee']
      }
    },
    methods: {
      displayMessage (message) {
        this.isShow = message
      }
    },
    props:{
      seller: Object,
    },
    components:{
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position relative
    background-color rgba(7,17,27,0.5)
    overflow hidden
    font-size 0
    color: rgb(255,255,255)
    .top
      position relative
      margin 24px 16px 18px 24px
      .avatar
        display inline-block
        vertical-align top
        & > img
          border-radius 4px
      .content-wrap
        display inline-block
        margin-left 16px
        .content-title
          margin 2px 0 8px 0
          .brandIcon
            display inline-block
            vertical-align top
            width 30px
            height 18px
            margin-right 4px
            background-repeat no-repeat
            background-size 100% 100%
            bg-color(brand)
          .name
            font-size 16px
            font-weight bold
            line-height 18px
        .content-msg
          margin-bottom 10px
          .send
            font-size 12px
            font-weight 200
            line-height 12px
        .content-discount
          margin-botton 2px
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            background-size 100% 100%
            background-repeat no-repeat
            &.decrease
              bg-color(decrease_1)
            &.discount
              bg-color(discount_1)
            &.guarantee
              bg-color(guarantee_1)
            &.invoice
              bg-color(invoice_1)
            &.special
              bg-color(special_1)
          .pay
            margin-left 4px
            font-size 10px
            font-weight 200
            line-height 12px
      .activity
        position absolute
        display inline-block
        width 48px
        height 24px
        background rgba(7,17,27,0.2)
        border-radius 16px
        right 12px
        bottom 0
        text-align center
        .message,.iconFont
          font-size 10px
          font-weight 200
          line-height 24px
        .message
          margin-right 2px
    .bulletin
      position relative
      padding 0 26px 0 12px
      background rgba(7,17,27,0.2)
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      font-size 10px
      font-weight 200
      line-height 28px
      .public
        display inline-block
        margin-right: 4px
        width: 22px
        height 12px
        background-size 100% 100%
        margin-top 8px
        vertical-align top
        background-repeat no-repeat
        bg-color(bulletin)
      .iconFont
        position absolute
        right 12px
        line-height 28px
    .background
      position absolute
      width 100%
      height 100%
      left 0
      top 0
      z-index -1
      background-image url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg")
      background-size 100% 100%
      -webkit-filter blur(10px)
      filter blur(10px)
    .discount-information
      position fixed /*总是针对视口的位置定位*/
      left 0
      top 0
      right 0
      bottom 0
      background rgba(7,17,27,0.8)
      z-index 2
      overflow auto
      .info-content
        min-height 100%
        .content
          padding-top 64px
          padding-bottom 64px
          .title
            font-size 16px
            font-weight 700
            line-height 16px
            text-align center
          .stars
            margin 16px 0 28px 0
            height 24px
          .message-contant
            margin 0 20px
            display flex
            .message
              font-size 15px
              margin 0 12px
            .line
              flex 1
              height 1px
              margin-top 8px
              background rgba(255,255,255,0.2)
          .list
            margin 24px 20px 28px 20px
            .list-contant
              margin-left 12px
              margin-bottom 12px
              &:last-child
                margin-bottom 0
              .icon
                display inline-block
                vertical-align top
                height 16px
                width 16px
                background-size 100% 100%
                background-repeat no-repeat
                &.decrease
                  bg-color(decrease_2)
                &.discount
                  bg-color(discount_2)
                &.invoice
                  bg-color(invoice_2)
                &.guarantee
                  bg-color(guarantee_2)
              .list-message
                font-size 12px
                font-weight 200
                line-height 12px
                margin-left 6px
          .seller-public
            margin 0 20px
            display flex
            .public
              font-size 15px
              margin 0 12px
            .line
              flex 1
              height 1px
              margin-top 8px
              background rgba(255,255,255,0.2)
          .seller-introduction
            margin 24px 32px 0 32px
            .introduction
              font-size 12px
              font-weight 200
              line-height 24px
      .icon-footer
        font-size 32px
        color rgba(255,255,255,0.5)
        text-align center
        margin-top -64px
</style>

