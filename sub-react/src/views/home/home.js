import { Component } from "react";
import { connect } from "react-redux";
import { Button, Card } from "antd";

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
        <h1>子Sub-React页面</h1>
        <Card title='技术栈' style={{ width: "90%", margin: "0 auto", marginLeft: "20px" }}>
          <p>前端底层框架：React[17.0.1]</p>
          <p>前端UI框架：antd[4.9.4]</p>
          <p>状态管理工具：react-redux[7.2.2]</p>
          <p>路由管理：react-router-dom[5.2.0]</p>
        </Card>
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
    this.props.SET_USER_INFO({ userInfo: { name: "韩梅" } });
  }

  goToAboutPage() {
    this.props.history.push("/about");
  }
}

const HomeRedux = connect(mapStateToProps, mapDispatchProps)(Home);
export default HomeRedux;
