
import { useEffect, useState } from "react";
import Dataservices from "../../Dataservices";
import CollectionsPage from "./createDep";
import CollectionsPage1 from "./updateDep";
import { Button, Table } from "antd";

import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
  

const DepartmentsList = ({role}) => {

    const [departments,setDepartments] = useState([]);
    const [visible, setVisible] = useState(false);
    const [formData,setFormData] = useState({name:"",semester:"",section:""});

    useEffect(async ()=> {
            reloadDepList();
    },[departments]);

    const reloadDepList = ()=>{
        Dataservices.getAllDepartments()
            .then((res) => {
                setDepartments(res.data)
            });
    }

    const deleteDep =(depId) => {
        Dataservices.deleteDepartment(depId)
           .then(res => {
               setDepartments(departments.filter(dep => dep._id !== depId));
           })
    }

    const updateModal = (id) =>{
        Dataservices.findDepartment(id).then(res => setFormData({id:id,name:res.data.name,semester:res.data.semester,section:res.data.section})).then(() => setVisible(true)).catch(err => console.log(err));
    }

    const download=()=>{
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
        },
        {
            title: 'Section',
            dataIndex: 'section',
            key: 'section',
        }, 
        ];

        role && columns.push({
            title: 'Actions',
            dataIndex: '_id',
            key: '_id',
            render:(id) => {return <div key={id}><Button type='danger' onClick={() => deleteDep(id)} icon={<DeleteOutlined/>}>Delete</Button>
                    <Button type='primary' onClick={() => updateModal(id)} icon={<EditOutlined/>}>Update</Button></div>
                }
            }
        );

    return (
        <div>
            {
                role && <CollectionsPage/>                
            }
            {
                role && <CollectionsPage1 visible={visible} setVisible={setVisible} formData={formData}/>
            }
            <Table id='table' dataSource={departments} columns={columns}  scroll={{ x: 100 }} pagination={{ pageSize: 5}}/>
            {/* <button onClick={download}>Hello </button> */}
        </div>
    );

}

export default DepartmentsList;