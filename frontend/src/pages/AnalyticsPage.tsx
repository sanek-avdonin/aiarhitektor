import React from 'react';
import { Card, PageHeader, Spin, Row, Col } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const AnalyticsPage: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => api.getAnalytics({}),
  });

  if (isLoading) return <Spin size="large" />;

  return (
    <div>
      <PageHeader title="Analytics" />
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Total Requests">...</Card>
        </Col>
        <Col span={12}>
          <Card title="API Usage">...</Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsPage;
