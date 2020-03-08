import { apiCaller } from '../api';
import { createPromiseFunc } from '../utils';

export const getTaskList = () =>
  createPromiseFunc(() => apiCaller.get('task/get-task'));

// export const createTask = () =>
//   createPromiseFunc(() => apiCaller.post('task/create-task'));

export const deleteTask = id => {
  createPromiseFunc(() => apiCaller.get(`task/delete/${id}`));
};

// export const updateTask = params => {
//   createPromiseFunc(() => apiCaller.put(`task/update/${params.id}`));
// };

// export const updateStatus = params => {
//   createPromiseFunc(() => apiCaller.put(`task/update/status/${params.id}`));
// };
