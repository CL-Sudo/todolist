import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { TodoListComponent } from '../components/TodoListComponent';
import { TodoInputComponent } from '../components/TodoInputComponent';
import { getTaskList } from '../../../api/todoList.api';

class TodoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: []
    };
  }

  GetTaskList = async () => {
    try {
      const res = await getTaskList();
      const { payload } = res.data;
      this.setState({ taskList: payload });
      console.log('...GetTaskList Finished');
    } catch (e) {
      console.log('Error from GetTaskList', e);
    }
  };

  componentDidMount = () => {
    this.GetTaskList();
  };

  render() {
    const { taskList } = this.state;
    return (
      <div>
        <Row align="middle" justify="center">
          <Col span={15}>
            <TodoListComponent
              taskList={taskList}
              GetTaskList={this.GetTaskList}
            />
          </Col>
        </Row>
        <Row align="middle" justify="center">
          <Col span={12}>
            <TodoInputComponent GetTaskList={this.GetTaskList} />
          </Col>
        </Row>
      </div>
    );
  }
}

export { TodoListContainer };
export default TodoListContainer;
