const isProduction = process.env.NODE_ENV === "production";
import globalState from "./globalState";
let microApps = [
  {
    name: "sub-vue",
    entry: isProduction ? "/sub-vue/" : "//localhost:7777/sub-vue/",
    activeRule: "/vue",
  },
  {
    name: "sub-react",
    entry: "//localhost:7778",
    activeRule: "/react",
  },
];

microApps = microApps.map((item) => {
  return {
    ...item,
    container: "#subapp-viewport",
    props: {
      routerBase: item.activeRule,
      getGlobalState: globalState.getGlobalState,
    },
  };
});

export default microApps;
