<template>
  <view class="dt-page">
    <view v-if="emptyType==0" class="item-list">
      <view v-for="(item,index) in dataList" :key="index" class="item">
        <text class="item-title">{{item.news_title}}</text>
        <text class="item-time">{{item.create_time}}</text>
      </view>
      <DtNoMore v-if="isNoMore" />
    </view>
    <DtEmpty :type="emptyType"></DtEmpty>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "首页",
      dataList: []
    };
  },

  methods: {
    async onPageLoad() {
      let res = await this.$api.queryNewsByCondition({
        pageIndex:this.pageIndex,
        pageSize:this.pageSize,
      })
      let list = this.getDataList(res);
      this.dataList = list
      setTimeout(()=>{
        this.stopPullDownRefresh()
      },1000)
    }
  },
  onReachBottom() {
    this.onReachBottomPage();
  },
  onPullDownRefresh() {
    this.onPullDownRefreshPage();
  }
};
</script>

<style>

.item {
  padding: 20upx;
  display: flex;
  flex-flow: column;
  border-bottom: 1upx #f2f2f2 solid;
  background-color: #fff;
}
.item-title {
  font-size: 30upx;
  color: #333;
}
.item-time {
  margin-top: 20upx;
  font-size: 25upx;
  color: #999;
}
</style>
