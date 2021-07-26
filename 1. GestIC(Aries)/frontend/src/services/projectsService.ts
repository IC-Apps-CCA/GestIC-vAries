import { api } from './api';

const getProjects = async () => {
  const projects = await api.get('/project');
};

const createProject = async (name: string, description: string, userId: number) => {
  const response = await api.post('/project', {
    name,
    description,
    userId,
  });
};

export default {
  getProjects,
};
