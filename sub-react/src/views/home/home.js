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
        <h1>子Sub-React应用</h1>
        <Card title='技术栈' style={{ width: "90%", margin: "0 auto", marginTop: "20px" }}>
          <p>前端底层框架：React[17.0.1]</p>
          <p>前端UI框架：antd[4.9.4]</p>
          <p>状态管理工具：react-redux[7.2.2]</p>
          <p>路由管理：react-router-dom[5.2.0]</p>
        </Card>
        <Card title='测试区域' style={{ width: "90%", margin: "0 auto", marginTop: "20px" }}>
          <p>
            测试数据通信：
            <span>当前模块获取数据：{JSON.stringify(this.props.userInfo)}</span>
            <Button type='primary' onClick={() => this.changeUserInfo()}>
              变更数据
            </Button>
          </p>
          <p>
            测试当前应用路由管理：{" "}
            <Button type='primary' onClick={() => this.goToAboutPage()}>
              跳转到About页面
            </Button>
          </p>
          <p>
            测试子应用互相跳转：{" "}
            <Button type='primary' onClick={() => this.goToSubVueApp()}>
              跳转到子Sub-vue应用
            </Button>
          </p>
        </Card>
      </div>
    );
  }
  changeUserInfo() {
    this.props.SET_USER_INFO({ userInfo: { name: "sub-react" } });
  }

  goToAboutPage() {
    this.props.history.push("/about");
  }

  goToSubVueApp() {
    window.location.href = "/vue";
  }
}

const HomeRedux = connect(mapStateToProps, mapDispatchProps)(Home);
export default HomeRedux;
