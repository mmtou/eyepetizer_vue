<template>
<div class="iframe">
  <van-icon name="arrow-left" class="back" @click="back" />
  <iframe :src="url" width="100%" height="100%" frameborder="0" v-if="url"></iframe>
</div>
</template>

<script>
export default {
  data() {
    return {
      url: null
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.url = this.$route.query.url;
  }
}
</script>

<style lang="less" scoped>
.iframe {
    width: 100vw;
    height: 100vh;
    position: relative;

    .back {
        position: absolute;
        z-index: 2;
        padding: 6px;
        background: rgba(0, 0, 0, 0.7);
        color: #FFF;
        border-radius: 50%;
        left: 6px;
        top: 6px;
    }
}
</style>
