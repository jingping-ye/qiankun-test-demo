<template>
  <div class="login">
    <div class="start-btn" @click="startApp">
      <img :src="startIcon" class="start-icon" />
      <div class="start-text">点击开始</div>
    </div>
  </div>
</template>
<script>
import startIcon from "@/assets/start.png";
export default {
  name: "Login",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      startIcon,
    };
  },
  computed: {},
  watch: {},
  methods: {
    startApp() {
      this.$router.push("/home");
      this.$store.commit("setLoginStatus", true);
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
}
.start-icon {
  width: 150px;
  margin-bottom: 10px;
}
.start-text {
  font-size: 28px;
}
.start-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>
