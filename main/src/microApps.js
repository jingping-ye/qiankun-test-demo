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
    entry: isProduction ? "/sub-react/" : "//localhost:7778/sub-react/",
    activeRule: "/react",
  },
  {
    name: "sub-angular",
    entry: isProduction ? "/sub-angular/" : "//localhost:7779/sub-angular/",
    activeRule: "/angular",
  },
  {
    name: "sub-html-index",
    entry: isProduction ? "/sub-html/index.html" : "//localhost:7780/index.html",
    activeRule: "/html/index.html",
  },
  {
    name: "sub-html-about",
    entry: isProduction ? "/sub-html/about.html" : "//localhost:7780/about.html",
    activeRule: "/html/about.html",
  },
  {
    name: "sub-jsp-index",
    entry: isProduction ? "/sub-jsp/index.jsp" : "//localhost:7781/sub-jsp/index.jsp",
    activeRule: "/sub-jsp/index.jsp",
  },
  {
    name: "sub-jsp-about",
    entry: isProduction ? "/sub-jsp/about.jsp" : "//localhost:7781/sub-jsp/about.jsp",
    activeRule: "/sub-jsp/about.jsp",
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
