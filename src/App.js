import React from 'react';
import { TodoListContainer } from './modules/todo-list/containers/TodoListContainer';
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
