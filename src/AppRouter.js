import React from "react"
import {Routes, Route} from 'react-router-dom'
import Projects from "./pages/Projects";
import Users from "./pages/Users";
import Connection from "./pages/Connection";
import Published from "./pages/Published";

const AppRouter = () => {
  return (
   
      <Routes >
        <Route path='/' element={<Projects />}/>
        <Route path='/users' element={<Users />}/>
        <Route path='/connection' element={<Connection />}/>
        <Route path='/published' element={<Published />}/>
       
      </Routes>
    
  )
};

export default AppRouter;
