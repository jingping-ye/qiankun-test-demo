import globalState from "./globalState";
let microApps = [
  {
    name: "sub-vue",
    entry: "//localhost:7777/",
    activeRule: "/sub-vue",
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
