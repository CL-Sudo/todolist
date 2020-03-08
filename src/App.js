import React from 'react';
import { TodoListContainer } from './modules/todo-list/containers/TodoListContainer';
// import { TodoListContainer2 } from './modules/todo-list/containers/TodoListContainer2';
import '../src/styles/App.css';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <div>
      <TodoListContainer />
    </div>
  );
};

export default App;
