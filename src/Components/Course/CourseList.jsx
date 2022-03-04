import { useEffect, useState } from "react";
import Dataservices from "../../Dataservices";
import CollectionsPage from "./createCourse";
import CollectionsPage1 from "./updateCourse";
import { Button, Table } from "antd";


const CoursesList = () => {

    const [courses,setCourses] = useState([]);
    const [ins,setIns] = useState([]);
    const [dep,setDep] = useState([]);
    const [course,setCourse] = useState(null);
    const [ucourse,setuCourse] = useState(null);    
    const [courseId,setcourseId] = useState("");
    const [visible, setVisible] = useState(false);
    const [formData,setFormData] = useState({name:"",chour:"",ins:"",dep:""});

    useEffect(()=> {
        if(ins){
            Dataservices.getAllInstructors().then(res => setIns(res.data));
        }
        if(dep){
            Dataservices.getAllDepartments().then(res => setDep(res.data));
        }
    },[]);

    useEffect(()=> {
        if(course)
        {
            createCourse();
            reloadCourseList();
        }else{
            reloadCourseList();
        }
    },[course]);
    useEffect(()=> {
        if(ucourse)
        {
            updateCourse();
            reloadCourseList();
        }else{
            reloadCourseList();
        }
    },[ucourse]);

    const reloadCourseList = ()=>{
        Dataservices.getAllCourses()
            .then((res) => {
                setCourses(res.data)
            });
    }

    const deleteCourse =(cId) => {
        Dataservices.deleteCourse(cId)
           .then(res => {
               setCourse(courses.filter(cor => cor._id !== cor));
           })
    }

    const createCourse =() => {
        Dataservices.createCourse(course.name,course.creditHour,course.instructor,course.department)
           .then(res => {
               console.log(res);
        })
    }

    const updateModal = (id) =>{
        Dataservices.findCourse(id).then(res => setFormData({name:res.data.name,chour:res.data.creditHour,ins:res.data.instructor,dep:res.data.class})).then(() => setVisible(true)).catch(err => console.log(err));
        setcourseId(id);
    }
    const updateCourse = () => {
        Dataservices.updateCourse(courseId,ucourse.name,ucourse.chour,ucourse.ins,ucourse.dep);
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
            render:(id) => {
                return ins.map(ind => {if(ind._id==id){return <span key={id}>{ind.name}</span>}})
            }
        },
        {
            title: 'Department',
            dataIndex: 'class',
            key: 'class',
            render:(id) => {
                return dep.map(dept => {if(dept._id==id){return <span key={id}>{dept.name}/{dept.semester}/{dept.section}</span>}})
            }
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            key: '_id',
            render:(id) => {return <div key={id}><Button type='danger' onClick={() => deleteCourse(id)}>Delete</Button>
                <Button type='primary' onClick={() => updateModal(id)}>Update</Button></div>
            }
        }
        ];

    return (
        <div>
            <CollectionsPage setCourse={setCourse} ins={ins} dep={dep}/>
            <CollectionsPage1 visible={visible} setVisible={setVisible} formData={formData} setuCourse={setuCourse} ins={ins} dep={dep}/>
            <Table dataSource={courses} columns={columns} />;
        </div>
    );

}

export default CoursesList;