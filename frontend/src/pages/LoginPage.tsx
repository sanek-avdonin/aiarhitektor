import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Col, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import api from '../services/api';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await api.login(values.email, values.password);
      localStorage.setItem('token', response.token);
      message.success('Login successful');
      navigate('/');
    } catch (error) {
      message.error('Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card title="AI Architect Login" bordered={false}>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item name="email" rules={[{ required: true, message: 'Please input email!' }]}>
              <Input placeholder="Email" prefix={<UserOutlined />} type="email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input password!' }]}>
              <Input.Password placeholder="Password" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
