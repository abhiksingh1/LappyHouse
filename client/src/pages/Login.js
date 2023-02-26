import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  function onFinish(values) {
    dispatch(userLogin(values));
    console.log(values);
  }
  return (
    <div className="login">
      {loading && <Spinner />}
      <h2 class="headerName">LappyHouse</h2>
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            className="w-100"
            data-aos="slide-right"
            data-aos-duration="1500"
            src="https://images.unsplash.com/photo-1588620353536-ded12e518f45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
          <h1 className="login-logo">LAPPYHOUSE</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Login</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, min: 4, max: 10 }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, min: 4, max: 10 }]}
            >
              <Input type="password" />
            </Form.Item>

            <button className="btn1 mt-2">Login</button>

            <hr />

            <Link to="/register">Not Registered? Click Here to Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
