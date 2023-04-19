import { Routes, Route } from "react-router-dom";
import './styles/App.css';

import Home from "./pages/components/home.jsx"
import EditProds from "./pages/components/editProds";

function App() {
  //const navigate = useNavigate()

  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/edit' element={<EditProds></EditProds>}></Route>
        <Route path='*' element={<h1 style={{color: "aliceblue", textAlign: "center"}}>Você digitou uma rota inválida</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
