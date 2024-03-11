import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from '../inicial/login';
import Cadastro from '../inicial/cadastro';
import Public from "./public";
import Home from "../pages/home";
import Profile from "../pages/profile";

const RoutesComponent = () => {
   return(
       <Routes>
           <Route element={<Public><Login /></Public>} path="/" exact /> 
           <Route element={<Public><Cadastro /></Public>} path="/cadastro" /> 
           <Route element={<Home />} path="/home" /> 
           <Route element={<Profile />} path="/profile" /> 
       </Routes>
   )
}

const RoutesWrapper = () => {
   return (
      <BrowserRouter>
         <RoutesComponent />
      </BrowserRouter>
   );
};

export default RoutesWrapper;
