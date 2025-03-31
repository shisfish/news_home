<template>
  <div class="news">
    <p class="news-title">
      <span>服务之窗</span>
    </p>
    <div class="service-section-item">
      <ul class="horizontal-list">
        <li>
          <a href="https://zjsx12380.gov.cn/" target="_blank">
            <img src="@/assets/email.jpg" alt="12380举报" />
            <p>12380举报</p>
          </a>
        </li>
        <li>
          <a href="http://www.zjce.gov.cn/" target="_blank">
            <img src="@/assets/logo2.jpg" alt="领导干部网络学院" />
            <p>领导干部网络学院</p>
          </a>
        </li>
        <li>
          <img src="@/assets/qrcode.jpg" alt="绍兴组工公众号" />
          <p>"绍兴组工"公众号</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news {
  width: 33.33%;
  display: inline-block;
  margin-bottom: 30px;
  &:nth-child(3n + 1) {
    padding-right: 12px;
  }
  &:nth-child(3n + 2) {
    padding-right: 6px;
    padding-left: 6px;
  }
  &:nth-child(3n) {
    padding-left: 12px;
  }
}

.news-title {
  border-bottom: 1px solid var(--color-primary);
  padding-left: 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  span {
    font-size: 19px;
    color: #fff;
    background-color: var(--color-primary);
    padding: 0 4px;
  }
  a {
    font-size: 16px;
    text-decoration: none;
  }
}

.service-section-item {
  height: 245px; /* 固定高度确保垂直居中 */
  display: flex;
  align-items: center; /* 垂直居中 */

  ul.horizontal-list {
    list-style: none;
    padding: 0;
    margin: 0 auto; /* 水平居中 */
    display: flex;
    justify-content: center; /* 内容水平居中 */
    width: 100%;
    gap: 30px; /* 图片间距 */

    li {
      width: 103px;
      height: 103px;
      border: 1px solid var(--color-primary);
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      justify-content: center; /* 垂直居中 */
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 70px;
        height: 70px;
        object-fit: contain;
      }
      p {
        font-size: 12px;
        color: var(--color-primary);
        text-align: center;
        padding-top: 5px;
      }
    }
  }
}
</style>