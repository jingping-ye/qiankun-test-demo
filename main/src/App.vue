<template>
  <div id="root-app">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item v-for="menu in menuList" :key="menu.path">
        <router-link :to="{ path: menu.path }">
          {{ menu.text }}
        </router-link>
      </a-menu-item>
    </a-menu>
    <div id="subapp-viewport"></div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: ["/"],
      menuList: [
        {
          name: "main",
          text: "主应用",
          path: "/",
        },
        {
          name: "sub-vue",
          text: "子vue应用",
          path: "/sub-vue",
        },
        {
          name: "sub-react",
          text: "子react应用",
          path: "/sub-react",
        },
      ],
    };
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
