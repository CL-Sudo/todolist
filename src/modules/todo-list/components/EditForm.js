import React from 'react';
import { Form, Input } from 'antd';

const EditForm = ({ editingValue, setEditingValue }) => {
  const handleChange = event => {
    setEditingValue({
      ...editingValue,
      [event.target.name]: event.target.value
    });
  };

  // const TitleInput = () => {
  //   return (
  //     <span>
  //       <Input
  //         type="text"
  //         value={editingValue.title}
  //         onChange={handleChange}
  //         style={{ width: 300 }}
  //       />
  //     </span>
  //   );
  // };

  // const DescriptionInput = () => {
  //   return (
  //     <span>
  //       <Input
  //         type="description"
  //         value={editingValue.description}
  //         onChange={handleChange}
  //         style={{ width: 300 }}
  //       />
  //     </span>
  //   );
  // };

  // return (
  //   <div>
  //     {JSON.stringify(editingValue, null, 2)};
  //     <Form layout="vertical">
  //       <Form.Item label="Title:" name="title">
  //         <TitleInput />
  //       </Form.Item>
  //       <Form.Item label="Description:" name="description">
  //         <DescriptionInput />
  //       </Form.Item>
  //     </Form>
  //   </div>
  // );

  return (
    <div>
      <form>
        <div>
          <label htmlFor="title">
            <h3>Title: </h3>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={editingValue.title}
            onChange={handleChange}
            size="40"
          />
        </div>
        <div>
          <label htmlFor="description">
            <h3>Description: </h3>
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={editingValue.description}
            onChange={handleChange}
            size="40"
          />
        </div>
      </form>
    </div>
  );
};

export { EditForm };
export default EditForm;
