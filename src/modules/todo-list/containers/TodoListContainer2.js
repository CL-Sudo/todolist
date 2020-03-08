import React, { useEffect, useState } from 'react';
import { TodoListComponent } from '../components/TodoListComponent';
import { TodoInputComponent } from '../components/TodoInputComponent';
import { getTaskList } from '../../../api/todoList.api';
import { Row, Col } from 'antd';

const TodoListContainer2 = () => {
  const [taskList, setTaskList] = useState([]);
  const GetTaskList = async () => {
    try {
      const res = await getTaskList();
      const { payload } = res.data;
      setTaskList(payload);
      console.log('taskList', taskList);
    } catch (e) {
      console.log('e', e);
    }
  };

  useEffect(() => {
    GetTaskList();
  }, [taskList]);

  return (
    <div>
      <Row align="middle" justify="center">
        <Col span={8}>
          <TodoListComponent taskList={taskList} />
        </Col>
        <Col span={8} offset={3}>
          <TodoInputComponent />
        </Col>
      </Row>
    </div>
  );
};

export { TodoListContainer2 };
export default TodoListContainer2;
