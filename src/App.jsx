import { Routes, Route, Navigate,useNavigate } from "react-router-dom";
import './styles/App.css';

import Home from "./pages/components/home.jsx"

function App() {
  //const navigate = useNavigate()

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes>
    </div>
  );
}

export default App;
