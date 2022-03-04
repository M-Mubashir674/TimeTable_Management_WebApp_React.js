import SignInForm from "./SignInForm";
import Sider from "./Sider";
import { Routes,Route } from "react-router-dom";
import DepartmentsList from "./Department/DepartmentsList";
import CourseList from "./Course/CourseList";
import InsList from "./Instructor/InsList";

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path='/ins' element={<InsList/>}/>
        <Route path='/dep' element={<DepartmentsList/>}/>
        <Route path='/course' element={<CourseList/>}/>
        <Route path='/sign' element={<SignInForm/>}/>
        <Route path='/token' element={<Sider/>}/>
      </Routes>
    </div>
  );
}

export default App;
