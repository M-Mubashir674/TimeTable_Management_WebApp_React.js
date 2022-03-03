import SignInForm from "./SignInForm";
import Sider from "./Sider";
import { Routes,Route } from "react-router-dom";
import Dataservices from "../Dataservices";
import DepartmentsList from "./Department/DepartmentsList";
import InsList from "./Instructor/InsList";

const App = () => {

  const getData = () => {
    Dataservices.getAll().then(res => console.log(res.data)).catch(e => console.log(e));
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<InsList/>}/>
        <Route path='/si' element={<SignInForm/>}/>
        <Route path='/sign' element={<Sider/>}/>
      </Routes>
    </div>
  );
}

export default App;
