import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import _ from 'lodash';
import { deleteTask } from '../../../api';
import { apiCaller } from '../../../api';

const TodoListComponent = props => {
  const { taskList } = props;
  const [isEditting, setIsEditting] = useState(false);
  const [editContent, setEditContent] = useState({
    title: '',
    description: '',
    id: ''
  });
  const list = [];

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: text => <p>{text}</p>
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
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
      title: 'Delete',
      dataIndex: 'id',
      render: id => (
        <Button key={id} type="danger" onClick={() => handleDeleteButton(id)}>
          Delete
        </Button>
      )
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: taskId => {
        const status = _.find(list, { id: taskId });
        let { id, isCompleted } = status;
        isCompleted = !isCompleted;
        const handleOnClick = async () => {
          try {
            await apiCaller.put(`/task/update/status/${id}`, { isCompleted });
            console.log('Status is updated successfully');
          } catch (e) {
            console.log('updateStatus Error: ', e);
          }
        };
        return status.isCompleted ? (
          <Button onClick={handleOnClick}>Undone</Button>
        ) : (
          <Button onClick={handleOnClick}>Done</Button>
        );
      }
    },
    {
      title: 'Update',
      dataIndex: 'id',
      render: id => (
        <Button
          type="primary"
          onClick={() => {
            setIsEditting(true);
            const data = _.find(list, { id: id });
            setEditContent({
              title: data.title,
              description: data.description,
              id: id
            });
          }}
        >
          Update
        </Button>
      )
    }
  ];

  const handleDeleteButton = async id => {
    try {
      await deleteTask(id);
      await props.GetTaskList();
      console.log(`Delete Item No.${id} Successfully!`);
    } catch (e) {
      console.log('Error from handleDeleteButton: ', e);
    }
  };

  //================================================================================================

  _.map(taskList, task => {
    list.push({ ...task, key: task.id });
  });

  const EditContentInModal = props => {
    const { title, description, id } = props.taskContent;
    const [updatedValue, setUpdatedValue] = useState({
      title: title,
      description: description,
      id: id
    });

    const handleOnOk = () => {
      setIsEditting(false);
    };

    const handleOnCancel = () => {
      setIsEditting(false);
    };

    const handleTitleChange = event => {
      setUpdatedValue({
        title: event.target.value,
        description: updatedValue.description,
        id: updatedValue.id
      });
    };

    const handleDescriptionChange = event => {
      setUpdatedValue({
        description: event.target.value,
        title: updatedValue.title,
        id: updatedValue.id
      });
    };

    const handleOnClick = async () => {
      try {
        const { title, description, id } = updatedValue;
        await apiCaller.put(`task/update/${id}`, { description, title });
        await props.GetTaskList();
        console.log('Update Successfully!');
        setIsEditting(false);
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        title="Edit Form"
        visible={isEditting}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
        footer={[
          <Button key="back" onClick={handleOnCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOnClick}>
            Update
          </Button>
        ]}
      >
        <span>
          <form>
            <label>Title: </label>
            <input
              id="title"
              type="text"
              name="title"
              onChange={handleTitleChange}
              value={updatedValue.title}
            />
            <br />
            <label>Description: </label>
            <input
              id="description"
              type="text"
              name="description"
              onChange={handleDescriptionChange}
              value={updatedValue.description}
            />
          </form>
        </span>
      </Modal>
    );
  };

  return (
    <div>
      <Table columns={columns} dataSource={list} />
      {isEditting && <EditContentInModal taskContent={editContent} />}
    </div>
  );
};

export { TodoListComponent };
export default TodoListComponent;
