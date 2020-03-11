import React from 'react';
import { Button, Modal } from 'antd';
import { EditForm } from './EditForm';
import { updateTask } from '../../../api';

const EditInModal = ({
  isEditting,
  setIsEditting,
  editingValue,
  setEditingValue,
  GetTaskList
}) => {
  const handleOnOk = () => {
    setIsEditting(false);
  };

  const handleOnCancel = () => {
    setIsEditting(false);
  };

  const handleOnSubmit = async () => {
    try {
      const itemId = editingValue.id;
      const { title, description } = editingValue;
      await updateTask({ title, description, itemId });
      await GetTaskList();
      console.log('Update Task Successfully');
      setIsEditting(false);
    } catch (e) {
      console.log('handleOnSubmit:', e);
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
        <Button key="submit" type="primary" onClick={handleOnSubmit}>
          Update
        </Button>
      ]}
    >
      <EditForm editingValue={editingValue} setEditingValue={setEditingValue} />
    </Modal>
  );
};

export { EditInModal };
export default EditInModal;
