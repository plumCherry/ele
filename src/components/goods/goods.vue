<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!--current 动态生成-->
          <li class="menu-item" v-for="(good,index) in goods" :class="{current:currentIndex === index}"
          @click="changeMenu(index)">
            <span class="text border-1px">
              <span class="icon" v-if="good.type>=0" :class="supports[good.type]"></span>{{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="ul">
          <li class="food-list food-list-hook" v-for="good in goods">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="food in good.foods">
                <div class="icon"><img width="57" height="57" :src="food.icon"></div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">+</div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        goods: [],
        startPoint: 0,
        current: 0,
        lisArr: [],
        supports: ['decrease','discount','special','invoice','guarantee']
      }
    },
    created () {
      axios.get('/api2/goods')
        .then(response => {
          let result = response.data;
          if(result.code === 0){
            this.goods = result.data;
            this.$nextTick(function () {
              this.slide();
              this.scroll()
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods: {
      slide () {
        let scroll = new BScroll(this.$refs.menuWrapper,{
          probeType: 3,
          click: true
        });
        scroll.on('scroll',(pos)=>{});

        this.scroll2 = new BScroll(this.$refs.foodsWrapper,{
          probeType: 3
        });
        this.scroll2.on('scroll',(pos)=>{
          let position = Math.abs(pos.y);
          this.startPoint = position
        })
      },
      scroll () {
        let li = 0;
        let lis = this.$refs.ul.getElementsByClassName('food-list-hook');
        [].slice.call(lis).forEach((item,index)=>{
          let height = item.clientHeight;
          li = li += height;
          this.lisArr.push(li)
        });
      },
      changeMenu (index) {
        let lis = this.$refs.ul.getElementsByClassName('food-list-hook')[index];
        this.scroll2.scrollToElement(lis, 500) //scrollToElement 滚动到指定元素 第一个参数为dom元素 第二个参数为滚动时间
      }
    },
    computed: {
      currentIndex () { //一定得有返回值
        let {startPoint,current} = this;
        /*大于等于上一个高度并且小于下一个高度 那么就显示*/
        for (let i= 0; i<this.lisArr.length;i++){
          if (startPoint>= this.lisArr[i] && startPoint < this.lisArr[i+1]){
            current = i+1
          }
        }
        return current;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-color('decrease_3')
          &.discount
            bg-color('discount_3')
          &.guarantee
            bg-color('guarantee_3')
          &.invoice
            bg-color('invoice_3')
          &.special
            bg-color('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
