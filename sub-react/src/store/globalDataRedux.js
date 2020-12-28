const initGlobalData = {};
let props = null;

function globalDataRedux(state = initGlobalData, action) {
  switch (action.type) {
    case "SET_GLOBAL_DATA":
      const globalData = { ...state, ...action.data };
      if (props) {
        props.setGlobalState(globalData);
      }
      return globalData;
    default:
      if (action.props) {
        props = action.props;
        const globalData = action.props.getGlobalState && action.props.getGlobalState();
        return globalData;
      } else {
        return state;
      }
  }
}

export default globalDataRedux;
