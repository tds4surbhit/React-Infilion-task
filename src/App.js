import React from "react";
// import { Route , Routes} from "react-router-dom"
import Home from "./Components/Home";

function App() {
  return (
    <div>
      <React.Fragment>
        <Home />
      </React.Fragment>
      {/* <Routes>  
        <Route exactpath = "/" component ={Home}></Route>
        <Home/>
      </Routes> */}
    </div>
  );
}

export default App;
