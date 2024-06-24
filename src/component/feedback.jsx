import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    console.log("Submitted: ", feedback);
    console.log("Email: ", email);
  
    try {
      const response = await axios.post(`${process.env.BACKEND_HOST}/feed-back`, {
        message: feedback,
        email: email
      });
  
      if (response.status === 201) {
        message.success("Ваш отзыв успешно отправлен");
        setFeedback("");
        setEmail("");
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      message.error("Ошибка при отправке отзыва");
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Ваш отзыв"
        name="feedback"
        rules={[{ required: true, message: "Пожалуйста, напишите ваш отзыв" }]}
      >
        <Input.TextArea
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Ваш Email"
        name="email"
        rules={[
          { required: true, message: "Пожалуйста, введите ваш адрес электронной почты" },
          { type: "email", message: "Пожалуйста, введите корректный адрес электронной почты" },
        ]}
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FeedbackForm;