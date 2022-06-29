import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const [user,setUser]=useState(null);

  let navigate = useNavigate();
  const getUser=async()=>{
    const res=await axios.get("/auth",{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setUser(res.data);
  };


  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/login");
    }else{
      getUser();
    }
    },[]);

  const logout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  };


  
  
  return (
    <div className="m-5">
      <div className="jumbotron">
        <p className="lead">Welcome {user && user.name}</p>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Home