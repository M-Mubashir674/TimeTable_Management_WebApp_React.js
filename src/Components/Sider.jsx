import { useNavigate } from 'react-router-dom';
import { Routes,Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb,Image } from 'antd';
import DepartmentsList from "./Department/DepartmentsList";
import CourseList from "./Course/CourseList";
import InsList from "./Instructor/InsList";
import TmList from "./Timetable/TmList";
import {
  HomeOutlined,
  LogoutOutlined,
  SolutionOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import React, { useState,useEffect } from 'react';
import Welcome from './Welcome';


const Sider = ({user}) => {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const [role,setRole] = useState(false);
  let navigate = useNavigate();
  const [collapsed,setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  
  useEffect(()=> {
    setRole(user=='021-19-0007'?true:false)
  },[]);

  const moveAhead = (path) => {
    navigate(path);
  }
  
    return (
   <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible  collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" >
            <h1 style={{ color: 'white', fontSize: '2em',margin:'10px 1em'}}>SIBAU</h1>
          </div>
          <Menu theme="dark"  defaultSelectedKeys={['8']} mode="inline">
            <Menu.Item key="8" icon={<HomeOutlined/>}  onClick={() => moveAhead('')}>
              Home
            </Menu.Item>
            <Menu.Item key="1" icon={<DatabaseOutlined />}  onClick={() => moveAhead('department')}>
              Department
            </Menu.Item>
            <Menu.Item key="2" icon={<SolutionOutlined />}  onClick={() => moveAhead('instructor')}>
              Instructor
            </Menu.Item>
            <Menu.Item key="3" icon={<FileTextOutlined />}  onClick={() => moveAhead('course')}>
              Course
            </Menu.Item>
            <Menu.Item key="4" icon={<ScheduleOutlined />}  onClick={() => moveAhead('timetable')}>
              TimeTable
            </Menu.Item>
            <Menu.Item key="5" icon={<LogoutOutlined />} onClick={() => moveAhead('/')}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" >
          <Header className="site-layout-background" style={{ padding: 0 ,margin:0}}>
          <marquee style={{ color: 'white', fontSize: '2em' }}>MI t. Time Table</marquee>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>{user}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path='/' element={<Welcome user={user}/>}/>
                <Route path='/instructor' element={<InsList role={role}/>}/>
                <Route path='/department' element={<DepartmentsList role={role}/>}/>
                <Route path='/course' element={<CourseList role={role}/>}/>
                <Route path='/timetable' element={<TmList role={role}/>}/>
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>TimeTable Management System ©2022 Created by IBA Students</Footer>
        </Layout>
      </Layout>

    );
}



export default Sider;

