
import { useEffect, useState } from "react";
import Dataservices from "../../Dataservices";
import CollectionsPage from "./createIns";
import CollectionsPage1 from "./updateIns";
import { Button, Table } from "antd";
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { render } from "react-dom";
  

const InsList = ({role}) => {

    const [instructors,setInstructors] = useState([]);
    const [visible, setVisible] = useState(false);
    const [formData,setFormData] = useState({name:"",email:"",qual:""});
    useEffect(()=> {
            reloadInsList();
    },[instructors]);

    const reloadInsList = ()=>{
        Dataservices.getAllInstructors()
            .then((res) => {
                setInstructors(res.data)
            });
    }

    const deleteIns =(id) => {
        Dataservices.deleteInstructor(id)
           .then(res => {
               setInstructors(instructors.filter(ins => ins._id !== id));
           })
    }

    const updateModal = (id) =>{
        Dataservices.findInstructor(id).then(res => setFormData({id:id,name:res.data.name,email:res.data.email,qual:res.data.qualification})).then(() => setVisible(true)).catch(err => console.log(err));
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Qualification',
            dataIndex: 'qualification',
            key: 'qualification',
        }
        ];

        role && columns.push({
            title: 'Actions',
            dataIndex: '_id',
            key: '_id',
            render:(id) => {return <div><Button type='danger' icon={<DeleteOutlined/>} onClick={() => deleteIns(id)}>Delete</Button>
                <Button type='primary' onClick={() => updateModal(id)} icon={<EditOutlined/>}>Update</Button></div>
            }
        });

    return (
        <div>
            {
                role && <CollectionsPage/>

            }
            {
                role && <CollectionsPage1 visible={visible} setVisible={setVisible} formData={formData}/>
            }            
            <Table dataSource={instructors} columns={columns} pagination={{ pageSize: 5}}  scroll={{ x: 100 }}/>
        </div>
    );

}

export default InsList;