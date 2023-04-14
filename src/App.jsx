import { Routes, Route } from "react-router-dom";
import './styles/App.css';
import { useEffect } from "react"

import Home from "./pages/components/home.jsx"
import EditProds from "./pages/components/editProds";

function App() {
  //const navigate = useNavigate()

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/edit' element={<EditProds></EditProds>}></Route>
      </Routes>
    </div>
  );
}

export default App;
