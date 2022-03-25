import React, { useEffect} from 'react';
import {Modal, Form, Input} from 'antd';
import Dataservices from '../../Dataservices';

const CollectionCreateForm = ({ visible,formData ,onCreate, onCancel }) => {
  const [form] = Form.useForm();  
  
  useEffect(()=>{
    if(visible){
      form.setFieldsValue({
        name:formData.name,
        email:formData.email,
        qual:formData.qual        
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
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input type="text"/>
        </Form.Item>
        <Form.Item name="qual" label="Qualification" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
      </Form>

    </Modal>
  );
};

const CollectionsPage1 = ({visible,setVisible,formData}) => {
  const onCreate = (values) => {
    setVisible(false);
    Dataservices.updateInstructor({id:formData.id,name:values.name,email:values.email,qual:values.qual})
    .then(res => console.log(res)).catch(err => console.log(err));
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