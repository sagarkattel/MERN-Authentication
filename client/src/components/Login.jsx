import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Register = (props) => {
  
  const [data, setData] = useState({
    email: "",
    password: "",
    error:null
  })
  const { email, password,error } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData({...data,error:null})
      const res=await axios.post(
        "/auth/login", { email, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
      localStorage.setItem('token',res.data.token)
      navigate("/");
    } catch (err) {
      setData({...data,error:err.response.data.error})
    }
  };
  return (
    <div className='form mt-5'>
      <h4 className="text-muted text-center mb-5">Log into your account</h4>
      <div className="card p-5 shadow">
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            className="form-control" 
            name='email'
            value={email}
            onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            className="form-control" 
            name='password'
            value={password}
            onChange={handleChange}
            />
          </div>
          {error? <p className='text-danger'>{error}</p>:null}
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
          </div>
          <p className="mt-3 text-center">
            Not a User? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register
