<template>
  <div class="home">
    <h1>主应用</h1>
    <p>用户信息：{{ userInfo }}</p>
    <p>
      <a-button type="primary" @click="updateUserInfo">变更用户信息</a-button>
    </p>
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
    updateUserInfo() {
      this.$globalState.setGlobalState({ userInfo: { name: "joy" } });
    },
  },
};
</script>
