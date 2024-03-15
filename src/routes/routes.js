import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from '../inicial/login';
import Cadastro from '../inicial/cadastro';
import Public from "./public";
import Home from "../pages/home";
import Profile from "../pages/profile";
import Private from "./private";
import NotFound from "../pages/notfound";
import AlterarSenha from "../pages/alterarsenha";
import CriarPost from "../pages/criarpost";
import DicaCriarPost from "../pages/dicacriarpost";

const RoutesComponent = () => {
   return(
       <Routes>
           <Route element={<Public><Login /></Public>} path="/" exact /> 
           <Route element={<Public><Cadastro /></Public>} path="/cadastro" /> 
           <Route element={<Private><Home /></Private>} path="/home" /> 
           <Route element={<Private><Profile /></Private>} path="/profile" /> 
           <Route element={<Private><AlterarSenha /></Private>} path="/alterarsenha" /> 
           <Route element={<Private><CriarPost /></Private>} path="/create" /> 
           <Route element={<Private><DicaCriarPost /></Private>} path="/dicas/create" /> 
           <Route element={<NotFound />} path="/*" /> 
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
