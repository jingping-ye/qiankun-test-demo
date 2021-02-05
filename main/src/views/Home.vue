<template>
  <div class="home">
    <h1>主应用</h1>
    <p>用户信息：{{ JSON.stringify(userInfo) }}</p>
    <p>
      <a-button type="primary" @click="updateUserInfo">变更用户信息</a-button>
    </p>
    <p>路由跳转测试：<a-button type="primary" @click="goToAbout">跳转到about页面</a-button></p>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  computed: {
    userInfo() {
      return this.$globalState.getGlobalState("userInfo");
    },
  },
  methods: {
    goToAbout() {
      this.$router.push("/about");
    },
    updateUserInfo() {
      this.$globalState.setGlobalState({ userInfo: { name: "joy" } });
    },
  },
};
</script>
