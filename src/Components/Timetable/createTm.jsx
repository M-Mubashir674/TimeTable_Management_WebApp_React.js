import React from 'react';
import { Modal, Form, Input,Select} from 'antd';

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
              cour.map(cor => <Option key={cor._id} value={cor._id}>{cor.name}</Option>)
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

const CollectionsPage = ({setTimetable,cour,ins,form,setForm}) => {  
  const onCreate = (values) => {
    setTimetable({subj:values.subj,room:values.room}); 
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