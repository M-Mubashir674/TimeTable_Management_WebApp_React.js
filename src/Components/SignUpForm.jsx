import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Dataservices from "../Dataservices";
import { Row, Col } from 'antd';

const SignUpForm = () => {
  let navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    Dataservices.create(values).then(res => {
      console.log(res.data);
      if(res.data==='OK'){
        navigate('/token');
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
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="pass"
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