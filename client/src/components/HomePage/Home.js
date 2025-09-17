import React from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (role, e) => {
    e.preventDefault();
    navigate('/loginhomepage', { state: { role } });
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.textContainer}> 
          <h2 className={styles.heading}> Please LogIn/SignUp </h2>
        </div>
        
        <div className={styles.buttonContainer}>
          <button 
            className={styles.signInButton} 
            onClick={(e) => handleClick("buyer", e)}
          > 
            Login as Buyer 
          </button>

          <button 
            className={styles.signUpButton} 
            onClick={(e) => handleClick("seller", e)}
          > 
            Login as Seller 
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
