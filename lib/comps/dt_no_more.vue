<template>
  <div class="no-more">{{msg}}</div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "—— 没有更多了 ——"
    }
  }
};
</script>

<style lang="scss" scoped>
.no-more {
  display: flex;
  justify-content: center;
  padding: 20upx 0;
  font-size: 22upx;
  color: #ccc;
}
</style>
