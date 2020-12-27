<template>
  <div class="home">
    <h1>子应用sub-vue</h1>
    <p>用户信息：{{ userInfo }}</p>
    <p><a-button type="primary" @click="updateUserInfo">变更用户信息</a-button></p>
    <p><a-button type="primary" @click="goToAbout">跳转到About页面</a-button></p>
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
