import React, { useState } from 'react'
import styles from './SignUp.module.css'
import { useNavigate } from 'react-router-dom'
import Input from '../../common/Input';
import Radio from '../../common/Radio';
import axios from "axios";

const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signup", { name, email, password });

      console.log(res.data.user);

      navigate('/bookstore');

    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.error || "Error creating user");
    }
  }
  return (
    <div className={styles.formContainer}>
      <div >
        <h2 className={styles.heading}>Create your PopX account</h2>
        <form onSubmit={handleSubmit}  className={styles.form}>   
          <Input label="Full Name" type="text" isRequired={true} onChange={(e)=> setName(e.target.value)} value={name}/>
          <Input label="Phone Number" type="tel" isRequired={true} onChange={(e)=> setPhone(e.target.value)} value={phone}/>
          <Input label="Email address" type="email" isRequired={true} onChange={(e)=> setEmail(e.target.value)} value={email}/>
          <Input label="Password" type="password" isRequired={true} onChange={(e)=> setPassword(e.target.value)} value={password}/>
          <Input label="Company Name" type="text" onChange={(e)=> setCompany(e.target.value)} value={company}/>
          <div>
            <label className={styles.radioHeading}>
              Are you an Agency?
              <span style={{ color: '#DD4A3D', marginLeft: 0 }}>*</span>
            </label>
            <div className={styles.radioContainer}>
              <Radio label="Yes"/>
              <Radio label="No"/>
            </div>
          </div>
          <button className={styles.createButton} type="submit">Create Account</button>
        </form>
      </div>
      
    </div>
  )
}

export default Signup