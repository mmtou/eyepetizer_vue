<template>
<div class="index">
  <van-tabs v-model="active" swipeable animated :duration="0.5" @rendered="getContent(false, null)">
    <van-tab v-for="(item, index) in tabs" :title="item.name" :key="index">
      <template v-if="tabs[active].itemList && tabs[active].itemList.length > 0">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="- The End -" @load="onLoad">
            <template v-if="item.name == '社区'">
              <div class="community">
                <moment class="community-item" :list="tabs[active].itemList.filter((_item, index) => index % 2 === 0)" />
                <moment class="community-item" :list="tabs[active].itemList.filter((_item, index) => index % 2 !== 0)" />
              </div>
            </template>
            <template v-else>
              <moment :list="tabs[active].itemList" />
            </template>
          </van-list>
        </van-pull-refresh>
      </template>
    </van-tab>
  </van-tabs>
</div>
</template>

<script>
import { getUrl } from '../utils/common.js';
import moment from '../components/Moment.vue';

export default {
  data() {
    return {
      loading: true,
      finished: true,
      refreshing: false,
      active: 0,
      tabs: [],
      content: null
    }
  },
  components: {
    moment
  },
  methods: {
    // tabs
    getCatagory() {
      this.$get('/api/v5/index/tab/list').then(data => {
        for (const item of data.tabInfo.tabList) {
          item.itemList = [];
          item.count = null;
          item.total = null;
          item.nextPageUrl = null;
          item.adExist = null;
        }
        this.tabs = data.tabInfo.tabList;
        this.active = data.tabInfo.defaultIdx;

        if (this.active == 0) {
          this.getContent(false, null);
        }
      });
    },
    // 每个tab的内容
    getContent(refresh, url) {
      this.$get(getUrl(url || this.tabs[this.active].apiUrl)).then(data => {
        if (refresh) {
          this.tabs[this.active].itemList = [];
        }
        this.tabs[this.active].itemList = this.tabs[this.active].itemList.concat(data.itemList);
        this.tabs[this.active].count = data.count;
        this.tabs[this.active].total = data.total;
        this.tabs[this.active].nextPageUrl = data.nextPageUrl;
        this.tabs[this.active].adExist = data.adExist;

        this.refreshing = false;
        this.loading = false;
        if (data.nextPageUrl) {
          this.finished = false;
        } else {
          this.finished = true;
        }
      }).catch(err => {
        this.refreshing = false;
        this.loading = false;
      });
    },
    onLoad() {
      if (this.tabs[this.active]['nextPageUrl']) {
        this.loading = true;
        this.getContent(false, this.tabs[this.active]['nextPageUrl']);
      } else {
        this.finished = true;
      }
    },
    onRefresh() {
      this.refreshing = true;
      this.getContent(true);
    },
  },
  mounted() {
    this.getCatagory();
  }
}
</script>

<style lang="less" scoped>
.community {
  display: flex;
  justify-content: space-evenly;

  .community-item {
    width: 170px;

    /deep/ .picture-follow-card {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    /deep/ .multipart {
      right: 6px;
    }
  }
}
</style>>
