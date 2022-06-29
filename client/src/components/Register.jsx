import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Register = (props) => {
  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const { name, email, password } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(
        "/auth/register", { name, email, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
      
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form>
      <h3>Create an account</h3>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Register
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default Register
