import { useEffect, useState } from "react";
import Dataservices from "../../Dataservices";
import CollectionsPage from "./createCourse";
import CollectionsPage1 from "./updateCourse";
import { Button, Table } from "antd";
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
  

const CourseList = ({role}) => {

    const [courses,setCourses] = useState([]);
    const [ins,setIns] = useState([]);
    const [dep,setDep] = useState([]);
    const [courseId,setcourseId] = useState("");
    const [visible, setVisible] = useState(false);
    const [formData,setFormData] = useState({name:"",chour:"",ins:"",dep:""});

    useEffect(async ()=> {
            await Dataservices.getAllInstructors().then(res => setIns(res.data));
            await Dataservices.getAllDepartments().then(res => setDep(res.data));
    },[]);

    useEffect(()=> {
        reloadCourseList();
    },[courses]);

    const reloadCourseList = ()=>{
        Dataservices.getAllCourses()
            .then((res) => {
                setCourses(res.data)
            });
    }

    const deleteCourse =(cId) => {
        Dataservices.deleteCourse(cId)
           .then(res => {
               console.log(res);
           })
    }


    const updateModal = (id) =>{
        Dataservices.findCourse(id).then(res => setFormData({id:id,name:res.data.name,chour:res.data.creditHour,ins:res.data.instructor,dep:res.data.class})).then(() => setVisible(true)).catch(err => console.log(err));
        setcourseId(id);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'CreditHour',
            dataIndex: 'creditHour',
            key: 'creditHour',
        },
        {
            title: 'Instructor',
            dataIndex: 'instructor',
            key: 'instructor',
            render:(ins) => {
                return <span key={ins._id}>{ins.name}</span>
            }
        },
        {
            title: 'Department',
            dataIndex: 'class',
            key: 'class',
            render:(dept) => {
                return <span key={dept._id}>{dept.name}/{dept.semester}/{dept.section}</span>;
            }
        }
        ];

        role && columns.push({
            title: 'Actions',
            dataIndex: '_id',
            key: '_id',
            render:(id) => {return <div key={id}><Button type='danger' icon={<DeleteOutlined/>} onClick={() => deleteCourse(id)}>Delete</Button>
                <Button type='primary' onClick={() => updateModal(id)} icon={<EditOutlined/>}>Update</Button></div>
            }
        });
    return (
        <div>
            {
                role && <CollectionsPage ins={ins} dep={dep}/>
            }
            {
                role && <CollectionsPage1 visible={visible} setVisible={setVisible} formData={formData} ins={ins} dep={dep}/>
            }            
            <Table dataSource={courses} columns={columns} pagination={{ pageSize: 5}} />;
        </div>
    );

}

export default CourseList;