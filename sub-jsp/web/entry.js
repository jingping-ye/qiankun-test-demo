var globalDataProp = null;
((global) => {
    global["purehtml"] = {
        bootstrap: () => {
            console.log("purehtml bootstrap");
            return Promise.resolve();
        },
        mount: (props) => {
            console.log("purehtml mount");
            globalDataProp = props;
            setGlobalData();

            // return render($);
        },
        unmount: () => {
            console.log("purehtml unmount");
            return Promise.resolve();
        },
    };
})(window);

// 设置全局数据
function setGlobalData() {
    let globalData = globalDataProp.getGlobalState();
    setUserInfo(globalData.userInfo);
}

// 设置用户信息变更
function setUserInfo(userInfo) {
    $("#user-info").text(JSON.stringify(userInfo));
}

$("body").on("click", "#change-user-info", function () {
    let newUserInfo = { userInfo: { name: "sub-jsp" } };
    setUserInfo(newUserInfo.userInfo);
    globalDataProp.setGlobalState(newUserInfo);
});

$("body").on("click", "#go-to-about-page", function () {
    location.href = "about.jsp";
});

$("body").on("click", "#go-to-angular-app", function () {
    location.href = "/sub-html/index.html";
});