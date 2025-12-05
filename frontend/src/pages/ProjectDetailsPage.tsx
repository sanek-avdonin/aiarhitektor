import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, PageHeader, Empty, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => api.getProject(id!),
  });

  if (isLoading) return <Spin size="large" />;
  if (!project) return <Empty description="Project not found" />;

  return (
    <div>
      <PageHeader title={project.name} subTitle={`Status: ${project.status}`} />
      <Card>
        <p>Model: {project.model}</p>
        <p>Budget: ${project.budget}</p>
        <p>Progress: {project.progress}%</p>
      </Card>
    </div>
  );
};

export default ProjectDetailsPage;
