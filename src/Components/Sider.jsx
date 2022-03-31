import { useNavigate } from 'react-router-dom';
import { Routes,Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb,Avatar, Typography } from 'antd';
import DepartmentsList from "./Department/DepartmentsList";
import Title from 'antd/lib/typography/Title';
import logo from "./topLogo.png"
import CourseList from "./Course/CourseList";
import InsList from "./Instructor/InsList";
import TmList from "./Timetable/TmList";
import {
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
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
  const [role,setRole] = useState(false);
  let navigate = useNavigate();
  const [collapsed,setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(!collapsed);
  };
  
  useEffect(()=> {
    setRole(user=='021-19-0007'?true:false)
    navigate('/user')
  },[]);

  const moveAhead = (path) => {
    navigate(path);
  }
  
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" style={{backgroundColor:'white' }}>
            <img src={logo} style={{width:'30%',marginLeft:'10%',marginRight:'10%'}}/>
            <Title style={{display:'inline-block',fontFamily:'cursive'}}>MI</Title>
            <Title style={{display:'inline-block',fontSize:'120%',fontFamily:'fantasy'}}>T.</Title>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined/>}  onClick={() => moveAhead('')}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<DatabaseOutlined />}  onClick={() => moveAhead('department')}>
              Department
            </Menu.Item>
            <Menu.Item key="3" icon={<SolutionOutlined />}  onClick={() => moveAhead('instructor')}>
              Instructor
            </Menu.Item>
            <Menu.Item key="4" icon={<FileTextOutlined />}  onClick={() => moveAhead('course')}>
              Course
            </Menu.Item>
            <Menu.Item key="5" icon={<ScheduleOutlined />}  onClick={() => moveAhead('timetable')}>
              TimeTable
            </Menu.Item>
            <Menu.Item key="6" icon={<LogoutOutlined />} onClick={() => moveAhead('/')}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" >
          <Header className="site-layout-background" style={{ padding: 5 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => onCollapse(collapsed),
                style:{fontSize: '200%',color:'white'}
            })}
            <Avatar style={{float:'right',margin:'1%'}}/>
            <SettingOutlined style={{fontSize: '200%',float:'right',margin:'1%',color:'white'}}/>
            <BellOutlined style={{fontSize: '200%',float:'right',margin:'1%',color:'white'}} />
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              backgroundColor:'white'
            }}
          >
            <Breadcrumb>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>{user}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path='/' index element={<Welcome user={user} message={role ? 'add, delete and update' : 'view'}/>}/>
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

