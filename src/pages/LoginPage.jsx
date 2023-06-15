import React, { useState , useContext } from 'react';
import admin from "../components/assets/myadmin.svg"
import axios from 'axios';
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAuthTokens} = useContext(AuthContext)
  const [cookies, setCookie] = useCookies(['cookieName']);

  const history = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



  const handleSubmit = async (e) => {
   

    e.preventDefault()
    setCookie('token', 'tokenValue', { path: '/' });

    setAuthTokens(Cookies?.get('token'))
        history("/");
    console.log("cherrab")
    /*
    try {
      
      const response = await axios.post(`http://localhost:8010/v1/api/user/loginAdmin`, 
      {
        "email":email,
        "password":password
      },
      {
        withCredentials:true
      }
    );
  
      if (response.status === 200) {
        toast.success("Logged in successfully");
        setAuthTokens(Cookies?.get('token'))
        history("/");
      }
    } catch (error) {
      toast.error(error.response.data);
  
      console.error('Error updating category:', error.response.data);
    }*/
  } 
  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[90%] h-[90vh] flex flex-row justify-center items-center gap-10 px-6 py-32 bg-gradient-to-r from-blue-200 to-cyan-200 border border-gray-300 shadow-lg rounded-lg">
        <div className=' flex flex-col justify-center items-center h-full px-4 w-[30%] ' >
        <form className=' mt-6 w-full' onSubmit={handleSubmit}>
          <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ring-blue-200 ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ring-blue-200 ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >

            Login
          </button>
        </form>

        </div>
        <div className=' flex justify-end items-center w-[70%]' >
            <img src={admin} alt="" className=' h-[80%] w-[80%] object-contain' /> 

        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;