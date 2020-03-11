import { apiCaller } from '../api';
import { createPromiseFunc } from '../utils';

export const getTaskList = () =>
  createPromiseFunc(() => apiCaller.get('task/get-task'));

export const createTask = values =>
  createPromiseFunc(() => apiCaller.post('task/create-task', values));

export const deleteTask = id =>
  createPromiseFunc(() => apiCaller.get(`task/delete/${id}`));

export const updateTask = ({ itemId, title, description }) =>
  createPromiseFunc(() =>
    apiCaller.put(`task/update`, {
      title,
      description,
      itemId
    })
  );

export const updateStatus = ({ id, isCompleted }) =>
  createPromiseFunc(() =>
    apiCaller.put(`task/update/status/${id}`, { isCompleted })
  );
