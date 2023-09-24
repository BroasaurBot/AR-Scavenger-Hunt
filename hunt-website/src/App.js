import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rules from './pages/Rules'
import Admin from './pages/Admin'
import Clues from './pages/Clues'
import Stats from './pages/Stats'
import Home from './pages/Home'
import SignIn from './pages/SignIn';

import "./App.css";

function App() {


  return (
    <div id="router">
      <BrowserRouter>
        <Routes>
          <Route exect path = '/' element={<Home />}/>
          <Route exact path='/Rules' element={<Rules />}/>
          <Route exact path='/Clues' element={<Clues />}/>
          <Route exact path='/Stats' element={<Stats />}/>
          <Route exact path='/SignIn' element={<SignIn />}/>
          <Route exact path='/Admin' element={<Admin />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App