import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from './inicial/login';
import Cadastro from './inicial/cadastro';

const RoutesComponent = () => {
   return(
       <Routes>
           <Route element={<Login />} path="/" exact /> 
           <Route element={<Cadastro />} path="/cadastro" /> 
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
