import React, { useEffect, useState } from 'react';
import {Modal, Form, Input} from 'antd';

const CollectionCreateForm = ({ visible,formData ,onCreate, onCancel }) => {
  const [form] = Form.useForm();  
  
  useEffect(()=>{
    if(visible){
      form.setFieldsValue({
        name:formData.name,
        semester:formData.semester,
        section:formData.section        
      })
    }
  },[visible])

  return (
    <Modal
      visible={visible}
      title="Update Department"
      okText="Update"
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
          <Input/>
        </Form.Item>
        <Form.Item name="semester" label="Semester">
          <Input type="text"/>
        </Form.Item>
        <Form.Item name="section" label="Section">
          <Input type="text" />
        </Form.Item>
      </Form>

    </Modal>
  );
};

const CollectionsPage1 = ({visible,setVisible,formData,udepartment,setuDepartment}) => {
  const onCreate = (values) => {
    setVisible(false);
    setuDepartment({name:values.name,semester:values.semester,section:values.section});
  };
  return (
    <div>

      <CollectionCreateForm
        visible={visible}
        formData={formData}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage1 ;