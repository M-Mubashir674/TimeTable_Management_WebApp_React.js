import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Dataservices from "../Dataservices";
import { Row, Col } from 'antd';
import { useState,useEffect } from 'react';

const SignInForm = ({setUser}) => {
  let navigate = useNavigate();
  const [userStatus,setUserStatus] = useState("");
  const [userHelp,setUserHelp] = useState("");
  const [passStatus,setPassStatus] = useState("");
  const [passHelp,setPassHelp] = useState("");



  const onFinish = (values) => {
    setUserStatus("validating");
    setPassStatus("validating");
    Dataservices.validate(values).then(res => {
      if(res.data==='OK'){
        setUserStatus("success");
        setPassStatus("success");
        setUser(values.username);
        navigate('/user')
      }else if(res.data.type==="user"){
       setUserStatus("error");
        setUserHelp(res.data.message);
        setPassStatus("");
      }else if(res.data.type==="pass"){
        setUserStatus("success");
        setUserHelp("");
        setPassStatus("error");
        setPassHelp(res.data.message);
      }
    }).catch(err => console.log(err));
  };

  return (
    <div style={{display:'flex',justifyContent:'center',marginTop:'10%'} }>
    <Form
      style={{background:"white" , borderRadius:"15px", padding:"0px 36px 0px 15px", boxShadow:"0px 13px 20px #00000014"}}
      name="normal_login"
      className="login-form"
      initialValues={{
        username:'abc',
        pass:'abc',
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h4 style={{padding:"15px"}}>Signin</h4>
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
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
      </Form.Item>
      <Form.Item
        name="pass"
        hasFeedback
        validateStatus={passStatus}
        help={passHelp}
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
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign In
        </Button>
        Or <a onClick={() => navigate('/signup')}>Sign Up!</a>
      </Form.Item>
    </Form>
    {/* </Col>
    </Row> */}
  </div>
  );
};

export default SignInForm ;