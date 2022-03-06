import SignInForm from "./SignInForm";
import Sider from "./Sider";
import { Routes,Route } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [user,setUser] = useState("admin"); 

  return (
    <div className="App" >
      <Routes>
        <Route path='/' element={<SignInForm setUser={setUser}/>}/>
        <Route path='/token/*' element={<Sider user={user}/>}/>
      </Routes>
    </div>
  );
}

export default App;
// 