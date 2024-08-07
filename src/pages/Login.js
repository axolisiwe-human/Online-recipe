// src/components/Login.js

import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Login = () => {

    const [existingUser, setExistingUser] = useState({
        email:'',
        password:''
      });

      const [error, setError] = useState({})
      const [valid, setValid] = useState(true)
      const navigate = useNavigate()
    
      const handleSubmit = (e) => {
        e.preventDefault();
       
        let isValid = true
        let validationErrors = {}
    
        if(existingUser.username === '' || existingUser.username === null){
            isValid = false
            validationErrors.username = 'Username is required'
        }
        else if(existingUser.email === '' || existingUser.email === null){
            isValid = false
            validationErrors.username = 'Email is required'
        }
        else if(!/\S+@\S+\.\S+/.test(existingUser.email)){
            isValid = false
            validationErrors.username = 'Email is invalid'
        }
        else if(existingUser.password === '' || existingUser.password === null){
            isValid = false
            validationErrors.username = 'Password is required'
        }
        else if(existingUser.password.length < 6){
            isValid = false
            validationErrors.username = 'Password has less than 6 characters'
        }
        else if(existingUser.password !== existingUser.confirmPassword){
            isValid = false
            validationErrors.username = 'Passwords do not match'
        }
            
        axios.get('http://localhost:5000/users')
        .then(result => {
           result.data.map(user => {
            if(user.email === existingUser.email){
                if(user.password === existingUser.password){
                    alert('Login Successful')
                    navigate('/home')
                }
                else{
                    isValid = false
                    validationErrors.username = 'Invalid Password'
                }
            }
           })
           setError(validationErrors)
           setValid(isValid)
        })
        .catch(err => console.log(err))
        
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {
            valid ? <></> :
            <span className='text-error'>
                {error.username}, {error.email}, {error.password}
            </span>
        }
        <Input
          type="email"
          placeholder="Email"
          value={existingUser.email}
          onChange={(e) => setExistingUser({...existingUser, email: e.target.value})}
        />
        <Input
          type="password"
          placeholder="Password"
          value={existingUser.password}
          onChange={(e) => setExistingUser({...existingUser, password: e.target.value})}
        />
        <Button type="submit">Login</Button>
        <p>
          Don't have an account? <Link to="/registration">Register</Link>
        </p>
      </Form>
    </Container>
  );
};

export default Login;
