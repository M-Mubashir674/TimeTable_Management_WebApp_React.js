import React, { useEffect} from 'react';
import {Modal, Form, Input,Select} from 'antd';

const CollectionCreateForm = ({ visible,formData ,onCreate, onCancel,ins,dep }) => {
  const [form] = Form.useForm();  
  const {Option} = Select ;
  useEffect(()=>{
    if(visible){
      form.setFieldsValue({
        name:formData.name,
        creditHour:formData.chour,
        instructor:formData.ins ,       
        department:formData.dep        
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

const CollectionsPage1 = ({visible,setVisible,formData,setuCourse,ins,dep}) => {
  const onCreate = (values) => {
    setVisible(false);
    setuCourse({name:values.name,chour:values.creditHour,ins:values.instructor,dep:values.department});
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
        ins={ins}
        dep={dep}
        key="updateCourse"
      />
    </div>
  );
};

export default CollectionsPage1 ;