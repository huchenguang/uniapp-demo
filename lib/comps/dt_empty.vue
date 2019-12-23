<template>
  <view class="empty-wrap" v-if="type != 0">
    <view class="load-content" v-if="type === 1">
      <view class="load-error">
        <image src="/static/image/dt_nodata.png"></image>
      </view>
      <view class="load-tips">{{ tips }}</view>
    </view>
    <view class="load-content" v-if="type === 2">
      <view class="load-error">
        <image src="/static/image/dt_error.png"></image>
      </view>
      <view class="load-tips">{{ tips }} </view>
    </view>
    <view class="load-empty" v-if="type == -1" :style="{ top: blankTop + 'px' }"></view>
  </view>
</template>
<script>
export default {
  props: {
    type: {
      type: Number,
      default: 0 // -1初始化,0无,1空,2错误
    },
    tips: {
      type: String,
      default: "暂无数据"
    },
    blankTop: {
      type: [String, Number],
      default: 0 //空白顶部位置
    }
  }
};
</script>
<style lang="scss">
.empty-wrap {
  width: 100%;
  height: 100%;
  background-color: $dt-bg-color-grey;

  .load-content {
    position: relative;
    width: 100%;
    padding-top: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 500;
  }

  .load-error {
    width: 200upx;
    height: 204upx;

    image {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .load-tips {
    width: 100%;
    text-align: center;
    color: #999999;
    font-size: 26upx;
    word-break: break-all;
    padding: 30upx;
    color: #666;
  }
}

.load-empty {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: $dt-bg-color-grey;
  z-index: 1000;
}
</style>
