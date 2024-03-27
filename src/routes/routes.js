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
import Produto from "../pages/produto";  
import VendedorProfile from "../pages/vendedorprofile";
import Cart from "../pages/cart";
import SearchList from "../pages/searchlist";

const RoutesComponent = () => {
   return(
       <Routes>
            <Route element={<Private><Home /></Private>} path="/home" /> 
           <Route element={<Public><Login /></Public>} path="/" exact /> 
           <Route element={<Public><Cadastro /></Public>} path="/cadastro" /> 
           <Route element={<Private><Profile /></Private>} path="/profile" /> 
           <Route element={<Private><AlterarSenha /></Private>} path="/alterarsenha" /> 
           <Route element={<Private><CriarPost /></Private>} path="/create" />  
           <Route element={<DicaCriarPost />} path="/dicas/create" />
           <Route element={<Private><Produto /></Private>} path="/produto/:id" />
           <Route element={<Private><SearchList /></Private>} path="/search/:tipo/:search" />
           <Route element={<Private><VendedorProfile /></Private>} path="/vendedorprofile/:id" />
           <Route element={<Private><Cart /></Private>} path="/cart" />
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
