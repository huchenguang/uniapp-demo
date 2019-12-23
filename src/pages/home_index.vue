<template>
	<view class="dt-page">
    <view v-if="emptyType==0" class="item-list">
      <view v-for="(item,index) in dataList" :key="index" class="item">
        <text class="item-title">{{item.title}}</text>
        <text class="item-time">{{item.time}}</text>
      </view>
      <DtNoMore v-if="isNoMore"/>
    </view>
    <DtEmpty :type="emptyType"></DtEmpty>
  </view>
</template>

<script>
	export default {
		data() {
			return {
        title: '首页',
        dataList:[]
			}
		},
		
		methods: {
      onPageLoad(){
        let list = []
        for(let i=0;i<100;i++){
          list.push({
            id:i,
            title:`这是标题${i}`,
            time:'2019-12-23',
          })
        }
        this.emptyType =0
        this.dataList = this.getDataList(list)
      },
    },
    
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
  .item{
    padding: 20upx;
    display: flex;
    flex-flow: column;
    border-bottom:1upx #f2f2f2 solid
  }
  .item-title{
    font-size: 30upx;
    color:#333;
  }
  .item-time{
    margin-top: 20upx;
    font-size: 25upx;
    color: #999;
  }
</style>
