import React, { useState } from 'react';
import { Button, Modal, Form, Input,Select} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

const CollectionCreateForm = ({ visible, onCreate, onCancel,ins,dep }) => {
  const [form] = Form.useForm();
  const {Option} = Select ;
  return (
    <Modal
      visible={visible}
      title="Create Course"
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
        <Form.Item name="creditHour" label="Credit Hour">
          <Input type="text" />
        </Form.Item>

        
        <Form.Item name="instructor" label="Instructor" rules={[{ required: true }]}>
          <Select
            placeholder="Select Instructor"
            allowClear
          >
            {
              ins.map(inst => <Option key={inst._id} value={inst._id}>{inst.name}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item name="department" label="Department" rules={[{ required: true }]}>
          <Select
            placeholder="Select Department"
            allowClear
          >
            {
              dep.map(dept => <Option key={dept._id} value={dept._id}>{dept.name}/{dept.semester}/{dept.section}</Option>)
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = ({setCourse,ins,dep}) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    setCourse({name:values.name,creditHour:values.creditHour,instructor:values.instructor,department:values.department});  
    setVisible(false);
  };

  return (
    <div>
      <Button
        icon ={<PlusOutlined/>}
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
        ins={ins}
        dep={dep}
      />
    </div>
  );
};

export default CollectionsPage ;