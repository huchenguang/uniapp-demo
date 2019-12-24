<template>
  <!-- 人数拼座 -->
  <view class="dialog-wrap" :style="'z-index:'+zIndex">
    <!-- 遮罩 -->
    <view class="mask" :class="{ show: visible }" @tap="tapDialogShow"></view>
    <view class="content-mn" :class="{ show: visible, isRadius:isRadius }">
      <view class="main-wrap">
        <slot></slot>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 100
    }
  },
  methods: {
    tapDialogShow() {
      this.$emit("onTapOutSide", false);
    }
  }
};
</script>
<style lang="scss">
// 弹窗 选择人数拼车
.dialog-wrap {
  position: relative;
  width: 100%;
  z-index: 100;

  .mask.show {
    visibility: visible;
    opacity: 1;
  }
  .mask {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    visibility: hidden;
    opacity: 0;
  }
  .isRadius {
    border-radius: 14upx 14upx 0upx 0upx;
  }

  .content-mn.show {
    visibility: visible;
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  .content-mn {
    position: fixed;
    top: 50%;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding-bottom: 1upx;
    transition: all 0.3s ease;
    visibility: visible;
    opacity: 0;
    transform: translateY(-50%) scale(0);
    z-index: 102;

    .head-wrap {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 30upx;
      min-height: 90upx;
      font-size: 28upx;
      .title {
        width: 100%;
        font-size: 30upx;
      }
      .title-center {
        text-align: center;
      }
      .close {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        padding: 30upx;
        width: 22upx;
        height: 22upx;
      }
    }
    .main-wrap {
      width: 100%;
    }
  }
}
</style>
