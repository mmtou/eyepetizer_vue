<template>
<div class="moment">
  <template v-for="(item, index) in formatList(list)">
    <div :key="index">
      <div class="square-card-collection" v-if="item.type == 'squareCardCollection'">
        <van-cell :title="item.data.header.title" is-link size="large" />
        <div class="" v-if="item.data.dataType == 'ItemCollection'">
          <moment :list="item.data.itemList" />
        </div>
        <div class="item-list" v-else>
          <div class="item-list-item" v-for="(itemItem, itemIndex) in item.data.itemList" :key="itemIndex">
            <div class="video" v-if="itemItem.data.content.type == 'video'" @click="handleDetail(itemItem.data.content)">
              <van-image class="image" fit="cover" lazy-load :src="itemItem.data.content.data.cover.feed" />
              <span class="duration">{{itemItem.data.content.data.duration | secondToDate}}</span>

              <div class="item-desc">
                <van-image class="icon" round lazy-load :src="itemItem.data.content.data.author.icon" />
                <div class="item-title-author">
                  <span class="item-title">{{itemItem.data.content.data.title}}</span>
                  <span class="item-author-name">{{itemItem.data.content.data.author.name + ' / #' + itemItem.data.content.data.category}}</span>
                </div>
                <van-icon name="share" @click.stop="shareUrl(itemItem.data.content)" />
              </div>
            </div>
            <div class="" v-else>
              不是视频
            </div>
          </div>
        </div>
      </div>
      <div class="text-card" v-else-if="item.type == 'textCard'">
        <van-cell :title="item.data.text" is-link size="large" />
      </div>
      <div class="follow-card" v-else-if="item.type == 'followCard'">
        <div class="video" v-if="item.data.content.type == 'video'" @click="handleDetail(item.data.content)">
          <van-image class="image" fit="cover" lazy-load :src="item.data.content.data.cover.feed" />
          <span class="duration">{{item.data.content.data.duration | secondToDate}}</span>

          <div class="item-desc">
            <van-image class="icon" round lazy-load :src="item.data.content.data.author.icon" v-if="item.data.content.data.author" />
            <div class="item-title-author">
              <span class="item-title">{{item.data.content.data.title}}</span>
              <span class="item-author-name">{{item.data.content.data.author ? item.data.content.data.author.name : '' + ' / #' + item.data.content.data.category}}</span>
            </div>
            <van-icon name="share" @click.stop="shareUrl(item.data.content)" />
          </div>
        </div>
      </div>
      <div class="video-small-card" v-else-if="item.type == 'videoSmallCard'">
        <div class="video" @click="handleDetail(item)">
          <div class="video-small">
            <van-image class="image" fit="cover" lazy-load :src="item.data.cover.feed" />
            <span class="duration">{{item.data.duration | secondToDate}}</span>
          </div>

          <div class="item-desc">
            <span class="item-title van-multi-ellipsis--l3">{{item.data.title}}</span>
            <div class="item-tag-share">
              <span class="item-tag">#{{item.data.category}}</span>
              <van-icon name="share" @click.stop="shareUrl(item)" />
            </div>
          </div>
        </div>
      </div>
      <div class="banner2" v-else-if="item.type == 'banner2' || item.type == 'banner'">
        <van-image class="image" fit="cover" lazy-load :src="item.data.image" />
      </div>
      <div class="picture-follow-card" v-else-if="item.type == 'pictureFollowCard'">
        <van-image class="image" fit="cover" lazy-load :src="item.data.content.data.url" @click="preview(item.data.content.data.urls)" />
        <div class="author-like">
          <div class="author van-ellipsis">
            <van-image class="avatar" fit="cover" lazy-load round :src="item.data.content.data.owner.avatar" />
            <span class="name">{{item.data.content.data.owner.nickname}}</span>
          </div>
          <div class="like">
            <span>{{item.data.content.data.consumption.collectionCount}}</span>
            <van-icon name="like-o" />
          </div>
        </div>
        <span class="multipart" v-if="item.data.content.data.urls.length > 1">
          <van-icon name="orders-o" />
        </span>
      </div>
      <div class="auto-play-follow-card" v-else-if="item.type == 'autoPlayFollowCard'">
        <van-image class="image" fit="cover" lazy-load :src="item.data.content.data.cover.feed" @click="handleDetail(item.data.content)" />
        <van-icon name="play-circle-o" class="play" />
        <div class="author-like">
          <div class="author van-ellipsis">
            <van-image class="avatar" fit="cover" lazy-load round :src="item.data.content.data.owner.avatar" />
            <span class="name">{{item.data.content.data.owner.nickname}}</span>
          </div>
          <div class="like">
            <span>{{item.data.content.data.consumption.collectionCount}}</span>
            <van-icon name="like-o" />
          </div>
        </div>
      </div>
      <div class="jrsqjx-card" v-else-if="item.type == 'jrsqjxCard'">
        <div :class="'jrsqjx-item' + itemIndex" v-for="(itemItem, itemIndex) in item.data.itemList" :key="itemIndex">
          <div class="picture-follow-card-inner" v-if="itemItem.type == 'pictureFollowCard'">
            <van-image class="image" fit="cover" lazy-load :src="itemItem.data.content.data.url" @click="preview(itemItem.data.content.data.urls)" />
            <div class="author">
              <van-image class="avatar" fit="cover" lazy-load round :src="itemItem.data.content.data.owner.avatar" />
              <span class="name">{{itemItem.data.content.data.owner.nickname}}</span>
            </div>
            <span class="multipart" v-if="itemItem.data.content.data.urls.length > 1">
              <van-icon name="orders-o" />
            </span>
          </div>
          <div class="auto-play-follow-card-inner" v-else-if="itemItem.type == 'autoPlayFollowCard'">
            <van-image class="image" fit="cover" lazy-load :src="itemItem.data.content.data.cover.feed" @click="handleDetail(itemItem.data.content)" />
            <van-icon name="play-circle-o" class="play" />
            <div class="author">
              <van-image class="avatar" fit="cover" lazy-load round :src="itemItem.data.content.data.owner.avatar" />
              <span class="name">{{itemItem.data.content.data.owner.nickname}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ugc-selected-card-collection" v-else-if="item.type == 'ugcSelectedCardCollection'">
        <van-cell :title="item.data.header.title" is-link size="large" />
        <div class="jrsqjx-card">
          <div :class="'jrsqjx-item' + itemIndex" v-for="(itemItem, itemIndex) in item.data.itemList" :key="itemIndex">
            <div class="picture-follow-card-inner" v-if="itemItem.type == 'pictureFollowCard' || itemItem.type == 'ugcSelectedCard'">
              <van-image class="image" fit="cover" lazy-load :src="itemItem.data.url" @click="preview(itemItem.data.urls)" />
              <div class="author">
                <van-image class="avatar" fit="cover" lazy-load round :src="itemItem.data.userCover" />
                <span class="name">{{itemItem.data.nickname}}</span>
              </div>
              <span class="multipart" v-if="itemItem.data.urls && itemItem.data.urls.length > 1">
                <van-icon name="orders-o" />
              </span>
            </div>
            <div class="auto-play-follow-card-inner" v-else-if="itemItem.type == 'autoPlayFollowCard'">
              <van-image class="image" fit="cover" lazy-load :src="itemItem.data.cover.feed" @click="handleDetail(itemItem)" />
              <van-icon name="play-circle-o" class="play" />
              <div class="author">
                <van-image class="avatar" fit="cover" lazy-load round :src="itemItem.data.owner.avatar" />
                <span class="name">{{itemItem.data.owner.nickname}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="horizontal-scroll-card" v-else-if="item.type == 'horizontalScrollCard'">
        <van-swipe :loop="false">
          <van-swipe-item v-for="(itemItem, itemIndex) in item.data.itemList" :key="itemIndex">
            <van-image class="item-banner" fit="cover" lazy-load :src="itemItem.data.image" @click="handleHorizontalScrollCard(itemItem)" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="brief-card" v-else-if="item.type == 'briefCard'">
        <van-image class="item-banner" fit="cover" lazy-load :src="item.data.icon" />
        <span class="brief-title">{{item.data.title}}</span>
      </div>
      <div class="video-collection-with-brief" v-else-if="item.type == 'videoCollectionWithBrief'">
      </div>
      <div class="dynamic-info-card" v-else-if="item.type == 'DynamicInfoCard'" @click="messagePreview(item.data)">
        <van-image class="avatar" fit="cover" lazy-load round :src="item.data.user.avatar" />
        <div class="right">
          <span class="name">{{item.data.user.nickname}}</span>
          <div class="message van-multi-ellipsis--l3">
            <span class="video-title">《{{item.data.reply.videoTitle}}》</span>
            {{item.data.reply.message}}
          </div>
        </div>
      </div>
      <div class="dynamic-info-card" v-else-if="item.type == 'reply'">
        <van-image class="avatar" fit="cover" lazy-load round :src="item.data.user.avatar" />
        <div class="right">
          <span class="name">{{item.data.user.nickname}}</span>
          <div class="message">
            {{item.data.message}}
          </div>
        </div>
      </div>
      <div class="" v-else>
        <!-- {{item.type}} -->
      </div>
    </div>
  </template>
</div>
</template>

<script>
import { getUrl } from '../utils/common.js';
import { ImagePreview } from 'vant';
import { Dialog } from 'vant';
import { Toast } from 'vant';

export default {
  name: 'moment',
  props: [
    'list'
  ],
  data() {
    return {
      visible: false,
      detail: null,
      relatedList: [],
      replies: []
    }
  },
  methods: {
    handleDetail(detail) {
      localStorage.setItem('detail', JSON.stringify(detail));
      this.$router.push('/video/' + detail.data.id);
    },
    preview(urls) {
      ImagePreview({
        images: urls
      });
    },
    messagePreview(detail) {
      Dialog.alert({
        messageAlign: 'left',
        title: detail.reply.videoTitle,
        message: detail.reply.message
      }).then(() => {
        // on close
      });
    },
    formatList(list) {
      const skipIndexs = [];
      // 暂时有问题
      const result = [];
      for (let i = 0; i < list.length; i++) {
        if (skipIndexs.indexOf(i) >= 0) {
          continue;
        }
        const item = list[i];
        result.push(item);

        if (item.data.text == '今日社区精选') {
          // 如果是社区精选，则获取接下来的3条数据
          const nextItem = {
            type: 'jrsqjxCard',
            data: {
              itemList: [
                this.list[i + 1],
                this.list[i + 2],
                this.list[i + 3]
              ]
            }
          };
          skipIndexs.push(i + 1);
          skipIndexs.push(i + 2);
          skipIndexs.push(i + 3);
          result.push(nextItem);
        } else if (item.type == 'videoCollectionWithBrief') {
          for (let i of item.data.itemList) {
            result.push({
              type: 'videoSmallCard',
              data: i.data
            });
          }
        }
      }
      return result;
    },
    shareUrl(content) {
      this.$copyText(content.data.playUrl).then(e => {
        Toast.success('已复制');
      }, e => {
        Toast.fail('复制异常');
      })
    },
    handleHorizontalScrollCard(detail) {
      const url = this.getQueryVariable(detail.data.actionUrl, 'url');
      // window.open(unescape(url), '_blank');
      this.$router.push('/iframe?url=' + url);
    },
    getQueryVariable(url, variable) {
      // var query = url.search.substring(1);
      var vars = url.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
      }
      return (false);
    }
  },
  filters: {
    secondToDate(second) {
      function prefixInteger(num) {
        return ('00' + num).substr(-2);
      }

      function format(h, m, s) {
        const result = [];
        if (h) {
          result.push(prefixInteger(h));
        }
        if (h || m) {
          result.push(prefixInteger(m));
        }
        if (h || m || s) {
          result.push(prefixInteger(s));
        }
        return result.join(':');
      }

      var h = Math.floor(second / 3600);
      var m = Math.floor(second / 60 % 60);
      var s = Math.floor(second % 60);

      return format(h, m, s);
    }
  }
}
</script>

<style lang="less" scoped>
.moment {

    .square-card-collection {

        .item-list {
            padding: 0 16px;

            .video {
                position: relative;

                .image {
                    width: 100%;
                    height: 198.83px;

                    /deep/ img {
                        border-radius: 4px;
                    }
                }
                .duration {
                    position: absolute;
                    right: 6px;
                    top: 176.83px;
                    background: rgba(0, 0, 0, 1);
                    color: #FFF;
                    z-index: 1;
                    font-size: 12px;
                    line-height: 12px;
                    padding: 2px;
                    border-radius: 2px;
                }
                .item-desc {
                    display: flex;
                    align-items: center;
                    padding: 6px 0 18px;

                    .icon {
                        width: 32px;
                        height: 32px;
                        margin-right: 6px;
                    }
                    .item-title-author {
                        flex: 1;
                        display: flex;
                        flex-direction: column;

                        .item-title {
                            font-size: 12px;
                        }
                        .item-author-name {
                            font-size: 10px;
                            color: rgba(0, 0, 0, 0.5);
                        }
                    }
                }
                .item-desc:last-child {
                    padding-bottom: 12px;
                }
            }
        }
    }

    .follow-card {
        padding: 0 16px;

        .video {
            position: relative;

            .image {
                width: 100%;
                height: 198.83px;

                /deep/ img {
                    border-radius: 4px;
                }
            }
            .duration {
                position: absolute;
                right: 6px;
                top: 176.83px;
                background: rgba(0, 0, 0, 1);
                color: #FFF;
                z-index: 1;
                font-size: 12px;
                line-height: 12px;
                padding: 2px;
                border-radius: 2px;
            }
            .item-desc {
                display: flex;
                align-items: center;
                padding: 6px 0 18px;

                .icon {
                    width: 32px;
                    height: 32px;
                    margin-right: 6px;
                }
                .item-title-author {
                    flex: 1;
                    display: flex;
                    flex-direction: column;

                    .item-title {
                        font-size: 12px;
                    }
                    .item-author-name {
                        font-size: 10px;
                        color: rgba(0, 0, 0, 0.5);
                    }
                }
            }
            .item-desc:last-child {
                padding-bottom: 12px;
            }
        }
    }

    .video-small-card {
        padding: 0 16px 12px;

        .video {
            display: flex;
            position: relative;

            .video-small {
                width: 137px;
                height: 80px;
            }
            .image {
                width: 100%;

                /deep/ img {
                    border-radius: 4px;
                }
            }
            .duration {
                position: absolute;
                right: 212px;
                top: 60px;
                background: rgba(0, 0, 0, 1);
                color: #FFF;
                z-index: 1;
                font-size: 12px;
                line-height: 12px;
                padding: 2px;
                border-radius: 2px;
            }
            .item-desc {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 6px 0 6px 6px;

                .item-title {
                    font-size: 12px;
                }
                .item-tag-share {
                    display: flex;
                    justify-content: space-between;

                    .item-tag {
                        font-size: 10px;
                        color: rgba(0, 0, 0, 0.5);
                    }
                }
            }
        }
    }
    .banner2 {
        padding: 12px 16px;

        .image {
            width: 100%;

            /deep/ img {
                border-radius: 4px;
            }
        }
    }
    .auto-play-follow-card,
    .picture-follow-card {
        padding: 12px 16px 0;
        // width: 170px;
        // padding-right: 16px;
        // padding-bottom: 6px;
        position: relative;
        color: #FFF;

        .image {
            width: 100%;

            /deep/ img {
                border-radius: 4px;
            }
        }
        .author-like {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #000;

            .author {
                flex: 1;
                display: flex;
                align-items: center;

                .avatar {
                    width: 24px;
                    height: 24px;
                }
                .name {
                    padding-left: 3px;
                    font-size: 10px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .like {
                display: flex;
                align-items: center;

                span {
                    font-size: 10px;
                    color: #666;
                    padding-right: 3px;
                }
            }
        }
        .multipart {
            position: absolute;
            top: 18px;
            right: 22px;
            color: #FFF;
        }
        .play {
            position: absolute;
            top: 18px;
            right: 22px;
        }
    }
    .jrsqjx-card {
        padding: 0 16px;
        height: 170px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;

        .jrsqjx-item0 {
            width: 170px;
            height: 170px;

            /deep/ img {
                width: 100%;
                height: 100%;
            }
        }
        .jrsqjx-item1,
        .jrsqjx-item2 {
            width: 170px;
            height: 83.5px;

            /deep/ img {
                width: 100%;
                height: 100%;
            }

        }

        .auto-play-follow-card-inner,
        .picture-follow-card-inner {
            position: relative;
            color: #FFF;
            width: 100%;
            height: 100%;

            .image {
                width: 100%;
                height: 100%;
            }

            .author {
                position: absolute;
                bottom: 6px;
                right: 6px;
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .avatar {
                    width: 16px;
                    height: 16px;
                }
                .name {
                    padding-left: 3px;
                    font-size: 10px;
                }
            }
            .multipart {
                position: absolute;
                top: 6px;
                right: 6px;
                color: #FFF;
            }
            .play {
                position: absolute;
                top: 6px;
                right: 6px;
            }
        }
    }
    .horizontal-scroll-card {
        padding: 12px 16px;

        /deep/ img {
            border-radius: 4px;
        }
    }
    .brief-card {
        position: relative;
        width: 112px;
        height: 112px;
        float: left;
        margin-left: 10px;

        /deep/ img {
            width: 112px;
            height: 112px;
            border-radius: 4px;
            filter: blur(1px);
        }
        .brief-title {
            color: #FFF;
            font-size: 12px;
            line-height: 12px;
            position: absolute;
            left: 0;
            top: 0;
            text-align: center;
            width: 100px;
            height: 100px;
            padding: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .brief-card:first-child {
        margin-left: 16px;
    }
    .dynamic-info-card {
        padding: 12px 16px;
        display: flex;

        .avatar {
            width: 36px;
            height: 36px;
            margin-right: 6px;
        }
        .right {
            font-size: 10px;
            flex: 1;
            font-size: #333;

            .name {
                color: #666;
                font-size: 12px;
            }
            .video-title {
                color: #000;
                font-weight: 700;
            }
        }
    }
}
</style>
