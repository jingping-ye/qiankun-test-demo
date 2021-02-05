<template>
  <div class="home">
    <h1>子应用sub-vue</h1>
    <a-card title="技术栈" style="width: 90%;margin: 0 auto;margin-top:20px;">
      <p>前端底层框架：Vue[2.6.11]</p>
      <p>前端UI框架：ant-design-vue[1.7.2]</p>
      <p>状态管理工具：vuex[3.4.0]</p>
      <p>路由管理：vue-router[3.2.0]</p>
    </a-card>
    <a-card title="测试区域" style="width: 90%;margin: 0 auto;margin-top:20px;">
      <p>
        测试数据通信：
        <span>当前模块获取数据：{{ JSON.stringify(userInfo) }}</span>
        <a-button type="primary" @click="updateUserInfo" style="margin-left:10px;">变更数据</a-button>
      </p>
      <p>测试当前应用路由管理：<a-button type="primary" @click="goToAbout">跳转到about页面</a-button></p>
      <p>测试子应用互相跳转：<a-button type="primary" @click="goToAbout">跳转到子vue应用</a-button></p>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {},
  computed: {
    ...mapState("global", {
      userInfo: (state) => state.userInfo,
    }),
  },
  methods: {
    ...mapActions("global", ["setGlobalState"]),
    updateUserInfo() {
      this.setGlobalState({ userInfo: { name: "张三" } });
    },
    goToAbout() {
      this.$router.push("/about");
    },
  },
  mounted() {
    console.log("this", this.$store);
  },
};
</script>
