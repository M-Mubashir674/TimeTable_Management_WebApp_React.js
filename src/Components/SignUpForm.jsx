import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Dataservices from "../Dataservices";
import { Row, Col } from 'antd';
import { useState } from 'react';

const SignUpForm = () => {
  let navigate = useNavigate();
  const [userStatus,setUserStatus] = useState("");
  const [userHelp,setUserHelp] = useState("");
  const [passStatus,setPassStatus] = useState("");
  const [emailStatus,setEmailStatus] = useState("");
  const onFinish = (values) => {
    setUserStatus('validating');
    setEmailStatus('validating');
    setPassStatus('validating');
    Dataservices.create(values).then(res => {
      if(res.data==='OK'){
        setUserStatus('success');
        navigate('/');
      }else{
        setUserStatus("error");
        setUserHelp(res.data.message)
      }
    }).catch(err => console.log(err));
  };

  return (
    <>
    <Row>
      <Col span={6} offset = {8} style={{background:"white" , borderRadius:"15px", marginTop:"10%", padding:"0px 36px 0px 15px", boxShadow:"0px 13px 20px #00000014" }}>  
      <h4 style={{padding:"15px"}}>Login</h4>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        hasFeedback
        validateStatus={userStatus}
        help={userHelp}
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="email"
        hasFeedback
        validateStatus={emailStatus}
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="pass"
        hasFeedback
        validateStatus={passStatus}
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button>
        Or <a onClick={() => navigate('/')}>Sign In!</a>
      </Form.Item>
    </Form>
    </Col>
    </Row>
  </>
  );
};

export default SignUpForm ;