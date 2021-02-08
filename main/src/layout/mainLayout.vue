<template>
  <div class="main-layout">
    <a-layout id="components-layout-demo-responsive">
      <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
        <div class="logo">微应用测试</div>
        <a-menu theme="dark" mode="inline" v-model="current">
          <a-menu-item v-for="menu in menuList" :key="menu.path">
            <router-link :to="{ path: menu.path }">
              {{ menu.text }}
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="{ background: '#fff', padding: 0 }">
          <div style="" class="layout-header">
            <div class="test-data">微应用测试通信数据：{{ JSON.stringify(userInfo) }}</div>
            <div class="logout" @click="logout"><a-button shape="circle" icon="poweroff" /></div>
          </div>
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px 0' }">
          <div :style="{ padding: '24px', background: '#fff', minHeight: '88vh' }">
            <router-view></router-view>
            <div id="subapp-viewport"></div>
          </div>
        </a-layout-content>
        <a-layout-footer style="textAlign: center">
          MIT Licensed | Copyright © 2021-present
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  name: "MainLayout",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      current: ["/"],
      menuList: [
        {
          name: "main",
          text: "主应用",
          path: "/home",
        },
        {
          name: "sub-vue",
          text: "子vue应用",
          path: "/vue",
        },
        {
          name: "sub-react",
          text: "子react应用",
          path: "/react",
        },
        {
          name: "sub-angular",
          text: "子Angular应用",
          path: "/angular",
        },
        {
          name: "sub-html",
          text: "子html应用",
          path: "/html/index.html",
        },
        {
          name: "sub-jsp",
          text: "子JSP应用",
          path: "/sub-jsp/index.jsp",
        },
      ],
    };
  },
  computed: {
    userInfo() {
      return this.$globalState.getGlobalState("userInfo");
    },
  },
  watch: {
    $route: {
      handler(newV) {
        const fullPath = newV.fullPath;
        const selectedPath = this.menuList.filter((item) => {
          const appPrefix = item.path.split("/")[1];
          return fullPath.startsWith(`/${appPrefix}`);
        });
        if (selectedPath.length > 0) {
          this.current = [selectedPath[0].path];
        } else {
          this.current = [];
        }
      },
      immediate: true,
    },
  },
  methods: {
    logout() {
      this.$router.replace("/");
      this.$store.commit("setLoginStatus", false);
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style scoped>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: #fff;
  line-height: 32px;
  font-size: 20px;
}
.layout-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.test-data {
  margin-left: 20px;
}
.logout {
  margin-right: 20px;
}
</style>
