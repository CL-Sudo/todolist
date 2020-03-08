import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

const TodoInputComponent = props => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    onSubmit: async values => {
      try {
        await axios.post('http://localhost:3000/api/task/create-task', values);
        await props.GetTaskList();
      } catch (e) {
        console.log('Error: ', e);
      }
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <span>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            required
          />
        </span>
        <br />
        <span>
          <label htmlFor="description">Description: </label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
            required
          />
        </span>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export { TodoInputComponent };
export default TodoInputComponent;
