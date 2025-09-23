import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/HomePage/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loginhomepage from './components/LoginHomePage/Loginhomepage';
import Signin from './components/SignInScreen/Signin';
import Signup from './components/SignUpScreen/Signup';
import { AuthProvider } from './components/AuthContext/AuthContext';
import { CartProvider } from './components/CartContext/CartContext';
import SellerDashboard from './components/SellerDashboard/SellerDashboard';
import BookstorePage from './components/Bookstore/Bookstore';

const App = () => {
  const [books, setBooks] = useState([]);

  const handlePublish = (newBook) => {
    const updatedBooks = [...books, { ...newBook, quantity: 1 }];
    setBooks(updatedBooks);
  };
  const handleRemove = (index)=>{
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  }
  const decreaseQuantity = (index) => {
    const updatedBooks = [...books];
    if (updatedBooks[index].quantity > 1) {
      updatedBooks[index].quantity -= 1;
    } else {
      updatedBooks.splice(index, 1); // remove book if quantity 0
    }
    setBooks(updatedBooks);
   
  };

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Loginhomepage />}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route
              path="/seller-dashboard"
              element={<SellerDashboard onPublish={handlePublish} />}
            />
            <Route
              path="/bookstore"
              element={<BookstorePage books={books} onRemove = {handleRemove} onDecrease = {decreaseQuantity}/>}
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
