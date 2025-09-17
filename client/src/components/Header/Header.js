import React, { useContext } from 'react'
import { CartContext } from '../CartContext/CartContext'
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css'

const Header = () => {
    const {cartCount} = useContext(CartContext);
    const navigate = useNavigate();
    const handleLogout = ()=>{
        navigate("/loginhomepage");
    }

    const goToCart=()=>{
        navigate("/cart");
    }
  return (
    <header className={styles.header}>
      <h2 className={styles.logo} onClick={() => navigate("/")}>MyShop</h2>
      <div className={styles.headeractions}>
        <button className={styles.cartbtn} onClick={goToCart}>
          🛒 Cart <span className={styles.cartcount}>{cartCount}</span>
        </button>
        <button className={styles.logoutbtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header