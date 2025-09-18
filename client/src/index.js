import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/HomePage/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loginhomepage from './components/LoginHomePage/Loginhomepage';
import Signin from './components/SignInScreen/Signin';
import Signup from './components/SignUpScreen/Signup';
import { AuthProvider } from './components/AuthContext/AuthContext';
import { CartProvider } from './components/CartContext/CartContext';
import Header from './components/Header/Header';
import SellerDashboard from './components/SellerDashboard/SellerDashboard';
import BookstorePage from './components/Bookstore/Bookstore';

const App = () => {
  const [books, setBooks] = useState([]);

  const handlePublish = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/loginhomepage' element={<Loginhomepage />}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route
              path="/seller-dashboard"
              element={<SellerDashboard onPublish={handlePublish} />}
            />
            <Route
              path="/bookstore"
              element={<BookstorePage books={books} />}
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
