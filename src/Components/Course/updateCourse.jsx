import React, { useEffect} from 'react';
import {Modal, Form, Input,Select} from 'antd';
import Dataservices from '../../Dataservices';

const CollectionCreateForm = ({ visible,formData ,onCreate, onCancel,instruct,depart }) => {
  const [form] = Form.useForm();  
  const {Option} = Select ;
  useEffect(()=>{
    if(visible){
      form.setFieldsValue({
        name:formData.name,
        creditHour:formData.chour,   
      })
    }
  },[visible])

  return (
    <Modal
      visible={visible}
      title="Update Course"
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
          <Input />
        </Form.Item>
        <Form.Item name="creditHour" label="Credit Hour" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>

        <Form.Item name="instructor" label="Instructor" rules={[{ required: true }]}>
          <Select
            placeholder="Select Instructor"
            allowClear
          >
            {
              instruct && instruct.map(inst => <Option key={inst._id} value={inst._id}>{inst.name}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item name="department" label="Department" rules={[{ required: true }]}>
          <Select
            placeholder="Select Department"
            allowClear
          >
            {
              depart && depart.map(dept => <Option key={dept._id} value={dept._id}>{dept.name}/{dept.semester}/{dept.section}</Option>)
            }
          </Select>
        </Form.Item>
      </Form>

    </Modal>
  );
};

const CollectionsPage1 = ({visible,setVisible,formData,ins,dep}) => {
  const onCreate = (values) => {
    setVisible(false);
    Dataservices.updateCourse({id:formData.id,name:values.name,chour:values.creditHour,ins:ins.find(ins => ins._id==values.instructor),dep:dep.find(dep => dep._id==values.department)})
    .then(res => console.log(res)).catch(er => console.log(er));
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
        instruct={ins}
        depart={dep}
      />
    </div>
  );
};

export default CollectionsPage1 ;