import { Component } from "react";
import { connect } from "react-redux";
import { Typography, Button } from "antd";
const { Title } = Typography;

const mapStateToProps = (state) => {
  return {
    userInfo: state.globalData.userInfo,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    SET_USER_INFO: function (data) {
      dispatch({ type: "SET_GLOBAL_DATA", data });
    },
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Title>子Sub-React页面</Title>
        <Button type='primary' onClick={() => this.goToAboutPage()}>
          跳转到About页面
        </Button>

        <p>用户信息： {JSON.stringify(this.props.userInfo)}</p>
        <p>
          变更用户信息：
          <Button type='primary' onClick={() => this.changeUserInfo()}>
            变更用户信息
          </Button>
        </p>
      </div>
    );
  }
  changeUserInfo() {
    console.log("输出");
    this.props.SET_USER_INFO({ userInfo: { name: "韩梅" } });
  }

  componentDidMount() {
    console.log("挂载完毕");
  }

  goToAboutPage() {
    this.props.history.push("/about");
  }

  printStore() {
    console.log("this.props", this.props);
  }
}

const HomeRedux = connect(mapStateToProps, mapDispatchProps)(Home);
export default HomeRedux;
