const initState = {
  userInfo: { name: "李四" },
};

function appRedux(state = initState, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      const userInfo = { ...state, ...action.data };
      return userInfo;
    default:
      return state;
  }
}

export default appRedux;
