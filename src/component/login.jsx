import React from 'react';
import { Button, Checkbox, Form, Input, Space, message} from 'antd';
import axios from "axios";
import Profile from './profile';
import { config } from '../config/config';

const Login = ({ onLogin, onLogout }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      console.log('Success:', values);
      const username = values.username;
      const password = values.password;
      const result = await axios.post(`${config.host}/auth/login`, {
        email: username,
        password: password,
      });

      if (result.status === 200) {
        const id = result.data.id;
        const token = result.data.access_token;
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('obtained', new Date().toDateString());
        message.success("Ура! Вы вошли");
        onLogin();
        // Переход на страницу профиля после успешного входа
        return <Profile id = {id} />; // Возвращает компонент Profile
      } else {
        message.error("Неправильный логин или пароль");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const signUp = async () => {
    try {
      const values = await form.validateFields();
      const username = values.username;
      const password = values.password;
      const result = await axios.post(`${config.host}/auth/signUp`, {
        email: username,
        password: password,
      });

      if (result.status === 200) {
        const id = result.data.id;
        const token = result.data.token;
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('obtained', new Date().toDateString());
        onLogin();
        // Переход на страницу профиля после успешной регистрации
        return <Profile onLogout={onLogout} />; // Возвращает компонент Profile
      } else {
        message.error("Что-то пошло не так");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
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
        label="Логин"
        name="username"
        rules={[{ required: true, message: 'Пожалуйста, введите свой логин!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите свой пароль!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Запомнить меня</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
          <Button htmlType="button" onClick={signUp}>Зарегистрироваться</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Login;