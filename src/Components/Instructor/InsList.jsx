
import { useEffect, useState } from "react";
import Dataservices from "../../Dataservices";
import CollectionsPage from "./createIns";
import CollectionsPage1 from "./updateIns";
import { Button, Table } from "antd";
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
  

const InsList = () => {

    const [instructors,setInstructors] = useState([]);
    const [instructor,setInstructor] = useState(null);
    const [uinstructor,setuInstructor] = useState(null);
    const [insId,setInsId] = useState("");
    const [visible, setVisible] = useState(false);
    const [formData,setFormData] = useState({name:"",email:"",qual:""});

    useEffect(()=> {
        if(instructor)
        {
            createIns();
            reloadInsList();
        }else{
            reloadInsList();
        }
    },[instructor]);
    useEffect(()=> {
        if(uinstructor)
        {
            updateIns();
            reloadInsList();
        }else{
            reloadInsList();
        }
    },[uinstructor]);

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

    const createIns =() => {
        Dataservices.createInstructor(instructor.name,instructor.email,instructor.qual)
           .then(res => {
               console.log(res);
        })
    }

    const updateModal = (id) =>{
        Dataservices.findInstructor(id).then(res => setFormData({name:res.data.name,email:res.data.email,qual:res.data.qualification})).then(() => setVisible(true)).catch(err => console.log(err));
        setInsId(id);
    }
    const updateIns = () => {
        Dataservices.updateInstructor(insId,uinstructor.name,uinstructor.email,uinstructor.qual);
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
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            key: '_id',
            render:(id) => {return <div><Button type='danger' icon={<DeleteOutlined/>} onClick={() => deleteIns(id)}>Delete</Button>
                <Button type='primary' onClick={() => updateModal(id)} icon={<EditOutlined/>}>Update</Button></div>
            }
        }
        ];

    return (
        <div>
            <CollectionsPage setInstructor={setInstructor}/>
            <CollectionsPage1 visible={visible} setVisible={setVisible} formData={formData} setuInstructor={setuInstructor}/>
            <Table dataSource={instructors} columns={columns} />;
        </div>
    );

}

export default InsList;