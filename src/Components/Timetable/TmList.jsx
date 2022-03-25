import { useEffect, useState } from "react";
import Dataservices from "../../Dataservices";
import CollectionsPage from "./createTm";
import CollectionsPage1 from "./updateTm";
import { Button, Table } from "antd";
import { Select} from 'antd';
import {
	PlusOutlined,
	DeleteOutlined
} from '@ant-design/icons';
    
const TmList = () => {
	let inst = '' ;
	const {Option} = Select ;
	const [form,setForm] = useState(false);
	const [form1,setForm1] = useState(false);
    const [timetables,setTimetables] = useState([]);
    const [ins,setIns] = useState([]);
    const [cour,setCour] = useState([]);
	const [dep,setDep] = useState([]);
	const [data,setData] = useState(null); 
    const [ttmId,settmId] = useState("");
    const [formData,setFormData] = useState({subject:"",room:""});
	const [depart,setDepart] = useState(null);
	const [semester,setSemester] = useState(null);
	const [section,setSection] = useState(null);

    useEffect(async ()=> {
		    await Dataservices.getAllDepartments().then(res => setDep(res.data));
		    await Dataservices.getAllInstructors().then(res => setIns(res.data));
			await Dataservices.getAllCourses().then(res => setCour(res.data));
    },[]);

    useEffect(()=> {
            reloadTtmList();
    },[timetables]);

	useEffect(()=> {
		loadData();
    },[semester,section,depart]);

    const reloadTtmList = ()=>{
        Dataservices.getAllTimetable()
            .then((res) => {
                setTimetables(res.data)
            });
    }

    const deleteTtm =(id) => {
        Dataservices.deleteTimetable(id)
           .then(res => {
               setTimetables(timetables.filter(ttm => ttm._id !== id));
           })
    }
	

    const updateModal = (id) =>{
        Dataservices.findTimetable(id).then(res => setFormData({id:id,subj:res.data.subject,room:res.data.room})).then(() => setForm1(true)).catch(err => console.log(err));
		settmId(id);
    }

	const clickEvent = (id) =>{
		setForm(true);
		settmId(id);
	}
	const gettime = (id) =>{
		if(timetables.find(tm => tm._id==id)){
			let timetable = timetables.find(tm => tm._id==id)
				return <div key={id}><div onClick={() => updateModal(id)}><span>{timetable.subject.name}</span><br></br><span>
					{timetable.subject.instructor.name}
				</span><br></br><span>{timetable.room}</span><br></br></div><Button type="danger" icon={<DeleteOutlined/>} size="small" onClick={() => deleteTtm(id)}>Delete</Button></div>;
		}
		else{
			return <Button onClick={() => clickEvent(id)} type="primary" icon={<PlusOutlined/>}>Create</Button>
		}}
	const loadData = () => {
		setData([
		{
			day:'Mon',
			nine:'mon9'+depart+semester+section,
			ten:'mon10'+depart+semester+section,
			eleven:'mon11'+depart+semester+section,
			twelve:'mon12'+depart+semester+section,
			one:'mon1'+depart+semester+section
		},{
			day:'Tue',
			nine:'tue9'+depart+semester+section,
			ten:'tue10'+depart+semester+section,
			eleven:'tue11'+depart+semester+section,
			twelve:'tue12'+depart+semester+section,
			one:'tue1'+depart+semester+section
		},{
			day:'Wed',
			nine:'wed9'+depart+semester+section,
			ten:'wed10'+depart+semester+section,
			eleven:'wed11'+depart+semester+section,
			twelve:'wed12'+depart+semester+section,
			one:'wed1'+depart+semester+section
		},{
			day:'Thu',
			nine:'thu9'+depart+semester+section,
			ten:'thu10'+depart+semester+section,
			eleven:'thu11'+depart+semester+section,
			twelve:'thu12'+depart+semester+section,
			one:'thu1'+depart+semester+section
		},{
			day:'Fri',
			nine:'fri9'+depart+semester+section,
			ten:'fri10'+depart+semester+section,
			eleven:'fri11'+depart+semester+section,
			twelve:'fri12'+depart+semester+section,
			one:'fri1'+depart+semester+section
		},{
			day:'Sat',
			nine:'sat9'+depart+semester+section,
			ten:'sat10'+depart+semester+section,
			eleven:'sat11'+depart+semester+section,
			twelve:'sat12'+depart+semester+section,
			one:'sat1'+depart+semester+section
		}
		]);
	}
	const columns = [
	{
		title:"Day",
		dataIndex: 'day'
	},{
		title:"9:00",
		dataIndex: 'nine',
		render: (id) => {
			return gettime(id);
		}	
	},{
		title:"10:00",
		dataIndex: 'ten',
		render: (id) => {
			return gettime(id)
		}
	},{
		title:"11:00",
		dataIndex: 'eleven',
		render: (id) => {
			return gettime(id)
		}
	},{
		title:"12:00",
		dataIndex: 'twelve',
		render: (id) => {
			return gettime(id)
		}
	},{
		title:"01:00",
		dataIndex: 'one',
		render: (id) => {
			return gettime(id)
		}		
	}
	]
    return (
        <div>
			<Select
				key='department'
				placeholder="Select Department"
				allowClear
				onChange={(value) => setDepart(value) }
			>
			{
				dep.map(dd => {return <Option key={dd} value={dd.name}>{dd.name}</Option>})
			}
			</Select>
			<Select
				key='semester'
				placeholder="Select Semester"
				allowClear
				onChange={(value) => setSemester(value) }
			>
			{
				dep.map((ss,index) => { if(ss.name==depart){return <Option key={index} value={ss.semester}>{ss.semester}</Option>}})
			}
			</Select>

			<Select
				key='section'
				placeholder="Select Section"
				allowClear
				onChange={(value) => setSection(value) }
			>
			{
				dep.map(ss => { if(ss.name==depart && ss.semester==semester){return <Option key={ss.section} value={ss.section}>{ss.section}</Option>}})
			}
			</Select>

            <CollectionsPage cour={cour} form={form} setForm={setForm} ttmId={ttmId}/>
            <CollectionsPage1 formData={formData} cour={cour} form1={form1} setForm1={setForm1} ins={ins}/>
            <Table dataSource={data} columns={columns}  pagination={{ pageSize: 5}}/>;
        </div>
    );

}

export default TmList;