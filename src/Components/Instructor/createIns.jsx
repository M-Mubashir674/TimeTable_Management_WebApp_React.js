import React, { useState } from 'react';
import { Button, Modal, Form, Input} from 'antd';

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create Department"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Instructor name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input type="text" />
        </Form.Item>
        <Form.Item name="qual" label="Qualification">
          <Input type="text" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = ({setInstructor}) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    setInstructor({name:values.name,email:values.email,qual:values.qual});  
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage ;