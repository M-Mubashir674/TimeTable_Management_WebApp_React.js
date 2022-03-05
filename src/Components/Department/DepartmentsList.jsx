
import { useEffect, useState } from "react";
import Dataservices from "../../Dataservices";
import CollectionsPage from "./createDep";
import CollectionsPage1 from "./updateDep";
import { Button, Table } from "antd";

import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { icons } from "antd/lib/image/PreviewGroup";
  

const DepartmentsList = () => {

    const [departments,setDepartments] = useState([]);
    const [department,setDepartment] = useState(null);
    const [udepartment,setuDepartment] = useState(null);
    const [depId,setdepId] = useState("");
    const [visible, setVisible] = useState(false);
    const [formData,setFormData] = useState({name:"",semester:"",section:""});

    useEffect(()=> {
        if(department)
        {
            createDep();
            reloadDepList();
        }else{
            reloadDepList();
        }
    },[department]);
    useEffect(()=> {
        if(udepartment)
        {
            updateDep();
            reloadDepList();
        }else{
            reloadDepList();
        }
    },[udepartment]);

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

    const createDep =() => {
        Dataservices.createDepartment(department.name,department.semester,department.section)
           .then(res => {
               console.log(res);
        })
    }

    const updateModal = (id) =>{
        Dataservices.findDepartment(id).then(res => setFormData({name:res.data.name,semester:res.data.semester,section:res.data.section})).then(() => setVisible(true)).catch(err => console.log(err));
        setdepId(id);
    }
    const updateDep = () => {
        Dataservices.updateDepartment(depId,udepartment.name,udepartment.semester,udepartment.section);
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
        {
            title: 'Actions',
            dataIndex: '_id',
            key: '_id',
            render:(id) => {return <div><Button type='danger' onClick={() => deleteDep(id)} icon={<DeleteOutlined/>}>Delete</Button>
                <Button type='primary' onClick={() => updateModal(id)} icon={<EditOutlined/>}>Update</Button></div>
            }
        }
        ];

    return (
        <div>
            <CollectionsPage setDepartment={setDepartment}/>
            <CollectionsPage1 visible={visible} setVisible={setVisible} formData={formData} setuDepartment={setuDepartment}/>
            <Table dataSource={departments} columns={columns} />;
        </div>
    );

}

export default DepartmentsList;