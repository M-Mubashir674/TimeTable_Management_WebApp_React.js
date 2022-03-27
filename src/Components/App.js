import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import Sider from "./Sider";
import { Routes,Route } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [user,setUser] = useState("Guest"); 

  return (
    <div className="App" >
      <Routes>
        <Route path='/' element={<SignInForm setUser={setUser}/>}/>
        <Route path='/signup' element={<SignUpForm/>}/>
        <Route path='/user/*' element={<Sider user={user}/>}/>
      </Routes>
    </div>
  );
}

export default App;
// 