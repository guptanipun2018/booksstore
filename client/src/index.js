import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/HomePage/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loginhomepage from './components/LoginHomePage/Loginhomepage';
import Signin from './components/SignInScreen/Signin';
import Signup from './components/SignUpScreen/Signup';
import { AuthProvider } from './components/AuthContext/AuthContext';
import { CartProvider } from './components/CartContext/CartContext';
import Header from './components/Header/Header';
import Bookcard from './components/Bookcard/Bookcard';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/loginhomepage' element={<Loginhomepage />}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/seller-dashboard' element={<Bookcard/>}/>
            <Route
            path="/bookstore"
            element={
              <>
                <Header/>
              </>
            }/>

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
