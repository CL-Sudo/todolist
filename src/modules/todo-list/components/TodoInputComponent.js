import React from 'react';
import { Formik } from 'formik';
import Error from '../../../constants/ErrorMessage';
import { validationSchema } from '../../../constants/validationSchema';
import { createTask } from '../../../api';

const TodoInputComponent = ({ GetTaskList }) => {
  return (
    <Formik
      initialValues={{ title: '', description: '', isCompleted: false }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setSubmitting(true);
          await createTask(values);
          await GetTaskList();
          resetForm();
          setSubmitting(false);
          console.log('Create Task Successfully');
        } catch (e) {
          console.log('onSubmit:', e);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <label htmlFor="title">
              <h3>Title: </h3>
            </label>
            <input
              name="title"
              id="title"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              className={touched.title && errors.title ? 'has-error' : null}
            />
            <Error touched={touched.title} message={errors.title} />
          </div>
          <div className="input-row">
            <label htmlFor="description">
              <h3>Description: </h3>
            </label>
            <input
              name="description"
              id="description"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              className={
                touched.description && errors.description ? 'has-error' : null
              }
            />
            <Error touched={touched.description} message={errors.description} />
          </div>
          <div className="input-row">
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export { TodoInputComponent };
export default TodoInputComponent;
