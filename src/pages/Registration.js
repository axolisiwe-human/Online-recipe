// src/components/Register.js

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
  background-color: #28a745;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const Registration = () => {
  const [newUser, setNewUser] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  });

  const [error, setError] = useState({})
  const [valid, setValid] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
   
    let isValid = true
    let validationErrors = {}

    if(newUser.username === '' || newUser.username === null){
        isValid = false
        validationErrors.username = 'Username is required'
    }
    else if(newUser.email === '' || newUser.email === null){
        isValid = false
        validationErrors.username = 'Email is required'
    }
    else if(!/\S+@\S+\.\S+/.test(newUser.email)){
        isValid = false
        validationErrors.username = 'Email is invalid'
    }
    else if(newUser.password === '' || newUser.password === null){
        isValid = false
        validationErrors.username = 'Password is required'
    }
    else if(newUser.password.length < 6){
        isValid = false
        validationErrors.username = 'Password has less than 6 characters'
    }
    else if(newUser.password !== newUser.confirmPassword){
        isValid = false
        validationErrors.username = 'Passwords do not match'
    }
    setError(validationErrors)
    setValid(isValid)


    if(Object.keys(validationErrors).length === 0){
        
        axios.post('http://localhost:5000/users', newUser)
        .then(result => {
            alert('Registration successful')
            navigate('/login')
        })
        .catch(err => console.log(err))
    }
    

  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
      
        <h2>Register</h2>
        {
            valid ? <></> :
            <span className='text-error'>
                {error.username}, {error.email}, {error.password}, {error.confirmPassword}
            </span>
        }
        <Input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({...newUser, username: e.target.value})}
        />
        <Input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
        />
        <Input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({...newUser, password: e.target.value})}
        />
         <Input
          type="password"
          placeholder="Confirm Password"
          value={newUser.confirmPassword}
          onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
        />
        <Button type="submit">Register</Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Container>
  );
};

export default Registration;
