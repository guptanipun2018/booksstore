import React from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (role) => {
    console.log(role);
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
            onClick={() => handleClick("buyer")}
          > 
            Login as Buyer 
          </button>

          <button 
            className={styles.signUpButton} 
            onClick={(e) => handleClick("seller")}
          > 
            Login as Seller 
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
