import { useNavigate } from 'react-router-dom';
import styles from './LoginHome.module.css'



const Loginhomepage = () => {
    const navigate = useNavigate();

    const handleSignIn = (e) => {
      e.preventDefault();
      navigate('/signin');
    }
    const handleSignUp = (e) => {
      e.preventDefault();
      navigate('/signup');
  
    }
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}> 
        <h2 className={styles.heading}> Please LogIn/SignUp </h2>
        {/* <h5 className={styles.description}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, </h5> */}
      </div>
      
      <div className={styles.buttonContainer}>
        <button className={styles.signInButton} onClick={handleSignUp}> Create Account </button>
        <button className={styles.signUpButton} onClick={handleSignIn}> Already Registered? Login </button>
      </div>
    </div>
  )
}

export default Loginhomepage