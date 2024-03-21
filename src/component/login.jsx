import React from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import axios from "axios";

const Login = ({onLogin}) => {
  const [form] = Form.useForm();
  const onFinish =async (values) => {
    try{
    console.log('Success:', values);
    const username = values.username;
    const password = values.password;
    const result = await axios.post('http://localhost:3000/api/auth/login', {
     "email": username,
"password": password,
      
    })
    if (result.status === 200) {
      const id = result.data.id;
      const token = result.data.token;
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('obtained', new Date().toDateString()) 
      alert("Uhu вы вошли")
      onLogin();
    }
    else{
      alert("Неправильный логин или пароль")
    }}
    catch (e){
      console.log(e)  
    }
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const signUp = async () => {
    try{
      const values =await form.validateFields();
    const username = values.username;
    const password = values.password;
    const result = await axios.post('http://localhost:3000/api/auth/signUp', {
      email: username,
password: password,
      
    })
    if (result.status === 200) {
      const id = result.data.id;
      const token = result.data.token;
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('obtained', new Date().toDateString()) 
      onLogin();
    }
    else{
      alert("Что то не так")
    }
  }
    catch (e){
console.log(e)  
    }
  };
  return <Form
    name="basic"
    form={form}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
      <Space>
      <Button type="primary" htmlType="submit">
        Войти
      </Button>
      <Button htmlType="button" onClick={signUp}>зарегистрироваться</Button></Space>
    </Form.Item>
  </Form>
};

export default Login;