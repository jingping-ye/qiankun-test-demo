<template>
  <div id="root-app">
    <MainLayout v-if="isLogin" />
    <router-view v-else />
  </div>
</template>
<script>
import MainLayout from "./layout/mainLayout";
import { mapState } from "vuex";
export default {
  components: {
    MainLayout,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
    }),
  },
};
</script>
<style lang="less">
#root-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  min-width: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
