import React, { useState } from 'react';
import { Button, Modal, Form, Input} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

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
              message: 'Department name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="semester" label="Semester">
          <Input type="text" />
        </Form.Item>
        <Form.Item name="section" label="Section">
          <Input type="text" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = ({setDepartment}) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    setDepartment({name:values.name,semester:values.semester,section:values.section});  
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
        icon={<PlusOutlined/>}
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