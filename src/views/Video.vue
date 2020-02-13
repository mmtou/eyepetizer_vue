<template>
<div class="detail">
  <template v-if="detail">
    <van-sticky>
      <van-icon name="arrow-left" class="back" @click="back" />
      <video :id="detail.data.id" controls preload="none" :poster="detail.data.cover.feed" :src="detail.data.playUrl">
      </video>
    </van-sticky>
    <div class="content">
      <p class="detail-title">{{detail.data.title}}</p>
      <p class="detail-author-name">{{detail.data.author != null ? detail.data.author.name : (detail.data.owner ? detail.data.owner.nickname : '') + ' / #' + detail.data.category}}</p>
      <p class="detail-description">{{detail.data.description}}</p>
      <div class="detail-operation">
        <div class="operation-item">
          <van-icon name="like" />
          <span class="count">{{detail.data.consumption.collectionCount}}</span>
        </div>
        <div class="operation-item" @click="shareUrl(detail)">
          <van-icon name="share" />
          <span class="count">{{detail.data.consumption.shareCount}}</span>
        </div>
        <div class="operation-item" @click="download(detail)">
          <van-icon name="down" />
          <span class="count">下载</span>
        </div>
        <div class="operation-item">
          <van-icon name="star" />
          <span class="count">{{detail.data.consumption.realCollectionCount}}</span>
        </div>
      </div>
    </div>
    <moment :list="relatedList" />
    <moment :list="replies" />
  </template>
</div>
</template>

<script>
import { getUrl } from '../utils/common.js';
import { Toast } from 'vant';
import moment from '../components/Moment.vue';

export default {
  data() {
    return {
      detail: null,
      relatedList: [],
      replies: []
    }
  },
  components: {
    moment
  },
  methods: {
    init() {
      const detail = localStorage.getItem('detail');
      if (detail) {
        this.detail = JSON.parse(detail);
        this.getRelated();
        this.getReplies();
      }
    },
    back() {
      this.$router.push("/");
    },
    shareUrl(content) {
      this.$copyText(content.data.playUrl).then(e => {
        Toast.success('已复制');
      }, e => {
        Toast.fail('复制异常');
      })
    },
    download(content) {
      window.open(content.data.playUrl, '_blank');
    },
    getRelated() {
      this.$get(getUrl('/api/v4/video/related?id=' + this.detail.data.id), { hideLoading: true }).then(data => {
        this.relatedList = data.itemList;
      });
    },
    getReplies() {
      this.$get(getUrl('/api/v2/replies/video?videoId=' + this.detail.data.id), { hideLoading: true }).then(data => {
        this.replies = data.itemList;
      });
    },
  },
  watch: {
    '$route'(to, from) {
      this.init();
    }
  },
  mounted() {
    // 使用路由参数时，组件的生命周期钩子不会再被调用
    // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96
    this.init();
  }
}
</script>

<style lang="less" scoped>
.detail {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background: linear-gradient(to bottom, #000000 0%,#999999 100%);
    background-size: cover;
    background-position: center;
    z-index: 2;
    color: #FFF;
    overflow-y: auto;

    .back {
        position: absolute;
        z-index: 3;
        margin: 6px;
        padding: 6px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
    }
    video {
        width: 100%;
    }
    .content {
        padding: 0 16px;

        p {
            margin: 6px 0;
        }
        .detail-title {
            font-size: 14px;
        }
        .detail-author-name {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.8);
        }
        .detail-description {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.8);
        }
        .detail-operation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;

            .operation-item {
                display: flex;
                align-items: center;

                .count {
                    padding-left: 3px;
                }
            }
        }
    }

    /deep/ .moment {
        .text-card {
            .van-cell--large {
                background: rgba(0,0,0, 0);
                color: #FFF;
            }
        }
        .item-tag {
            color: rgba(255, 255, 255, 0.8) !important;
        }
        .dynamic-info-card {
            .name {
                color: #FFF !important;
            }
            .message {
                color: rgba(255, 255, 255, 0.8);
            }
        }
    }
}
</style>
