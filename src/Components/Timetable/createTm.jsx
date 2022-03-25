import React from 'react';
import { Modal, Form, Input,Select} from 'antd';
import Dataservices from '../../Dataservices';

const CollectionCreateForm = ({ visible, onCreate, onCancel,cour}) => {
  const [form] = Form.useForm();
  const {Option} = Select ;
  return (
    <Modal
      visible={visible}
      title="Create Time Table"
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

        <Form.Item name="subj" label="Subject" rules={[{ required: true }]}>
          <Select
            placeholder="Select Subject"
            allowClear
          >
            {
              cour.map((cor,index) => <Option key={index} value={cor._id}>{cor.name}</Option>)
            }
          </Select>
        </Form.Item>
        
        <Form.Item name="room" label="Room" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>

      </Form>
    </Modal>
  );
};

const CollectionsPage = ({cour,form,setForm,ttmId}) => {  
  const onCreate = (values) => {
    Dataservices.createTimetable({id:ttmId,subj:cour.find(course => course._id==values.subj),room:values.room})
    .then(res => console.log(res)).catch(er => console.log(er)); 
    setForm(false);
  };

  return (
    <div>
      <CollectionCreateForm
        visible={form}
        onCreate={onCreate}
        onCancel={() => {
          setForm(false);
        }}
        cour={cour}
      />
    </div>
  );
};

export default CollectionsPage ;