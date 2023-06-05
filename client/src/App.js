import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Add from "./pages/Create";
import Orders from "./pages/Orders";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Read from "./pages/Read"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/orders" exact element={<Orders/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/read/:orderId/:customerId/:productId" element={<Read/>}/> 
          <Route path="/update/:orderId/:customerId/:productId" element={<Update/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
