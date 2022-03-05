import React, { useEffect} from 'react';
import {Modal, Form, Input,Select} from 'antd';

const CollectionCreateForm = ({formData ,onCreate, onCancel,form1,cor,ins }) => {
  const [form] = Form.useForm();  
  const {Option} = Select ;
  useEffect(()=>{
    if(form1){
      form.setFieldsValue({
        subj:formData.subj,
        room:formData.room,      
      })
    }
  },[form1])
  
	console.log(form1);
  return (
    <Modal
      visible={form1}
      title="Update Timetable"
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
        <Form.Item name="subj" label="Course" rules={[{ required: true }]}>
          <Select
            placeholder="Select Course"
            allowClear
          >
            {
              cor && cor.map(crs => <Option key={crs._id} value={crs._id}>{crs.name}/{ins.find(inst => inst._id===crs.instructor).name}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name="room" label="Room">
          <Input type="text" />
        </Form.Item>
      </Form>

    </Modal>
  );
};

const CollectionsPage1 = ({formData,setuTtm,cour,form1,setForm1,ins}) => {
  const onCreate = (values) => {
    setuTtm({subj:values.subj,room:values.room});
    setForm1(false);
  };
  
  return (
    <div>
      <CollectionCreateForm
        formData={formData}
        onCreate={onCreate}
        onCancel={() => {
          setForm1(false);
        }}
        form1={form1}
        cor ={cour}
        ins={ins}
        key="updateCourse5"
      />
    </div>
  );
};

export default CollectionsPage1 ;