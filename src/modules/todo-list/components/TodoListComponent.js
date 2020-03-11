import React, { useState } from 'react';
import { Table, Button } from 'antd';
import _ from 'lodash';
import { deleteTask, updateStatus } from '../../../api';
import { EditInModal } from './EditInModal';

const TodoListComponent = ({ taskList, GetTaskList }) => {
  const dataSource = _.map(taskList, task => ({
    key: task.id,
    id: task.id,
    title: task.title,
    description: task.description,
    isCompleted: task.isCompleted
  }));

  const [isEditting, setIsEditting] = useState(false);
  const [editingValue, setEditingValue] = useState({});

  const handleOnDelete = async id => {
    try {
      await deleteTask(id);
      await GetTaskList();
      console.log(`Deleted item No.${id} Successfully`);
    } catch (e) {
      console.log('Error Occurs While Deleting Item');
    }
  };

  const handleAction = async task => {
    try {
      const { id, isCompleted } = task;
      console.log('isCompleted: ', isCompleted);
      await updateStatus({ isCompleted, id });
      await GetTaskList();
      console.log('Update Status Successfully');
    } catch (e) {
      console.log('Error from handleAction: ', e);
    }
  };

  const handleUpdate = id => {
    setIsEditting(true);
    setEditingValue(_.find(dataSource, { id: id }));
  };

  const columns = () => [
    {
      key: 'id',
      title: 'Title',
      dataIndex: 'title',
      render: text => <h3>{text}</h3>
    },
    {
      key: 'id',
      title: 'Description',
      dataIndex: 'description'
    },
    {
      key: 'id',
      title: 'Status',
      dataIndex: 'isCompleted',
      render: status =>
        status ? (
          <p style={{ color: 'green' }}>Complete</p>
        ) : (
          <p style={{ color: 'red' }}>Incomplete</p>
        )
    },
    {
      key: 'id',
      title: 'Delete',
      dataIndex: 'id',
      render: id => (
        <Button key={id} type="danger" onClick={() => handleOnDelete(id)}>
          Delete
        </Button>
      )
    },
    {
      key: 'id',
      title: 'Action',
      dataIndex: 'id',
      render: id => {
        const task = _.find(dataSource, { id: id });
        return task.isCompleted ? (
          <Button onClick={() => handleAction(task)}>Undone</Button>
        ) : (
          <Button onClick={() => handleAction(task)}>Done</Button>
        );
      }
    },
    {
      key: 'id',
      title: 'Update',
      dataIndex: 'id',
      render: id => (
        <Button type="primary" onClick={() => handleUpdate(id)}>
          Update
        </Button>
      )
    }
  ];

  return (
    <div>
      <Table columns={columns()} dataSource={dataSource} />
      <EditInModal
        isEditting={isEditting}
        setIsEditting={setIsEditting}
        editingValue={editingValue}
        setEditingValue={setEditingValue}
        GetTaskList={GetTaskList}
      />
    </div>
  );
};

export { TodoListComponent };
export default TodoListComponent;
