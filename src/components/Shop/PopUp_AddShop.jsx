import React, { useEffect, useRef, useState } from "react";
import {GiCancel} from "react-icons/gi"
import Loader from '../Loader'
import axios from 'axios';
import { toast } from "react-toastify";

function PopUp_AddShop(props) {
  const bs = process.env.REACT_APP_COMMAND_BASE_URL;
    const [loading,setLoading]=useState(false)
    const [inputValue, setInputValue] = useState('');

    const [info,setInfo]=useState({
      img:props.img,
      name:props.name,
      desc:props.desc,
      price:props.price,
      qte:props.qte,
      shopId:props.shopId

    })
 
 


  
    const handleCreateShop = async () => {
        setLoading(true);
        try {
          
          const response = await axios.post(`http://localhost:8010/v1/api/shop/createShop`, 
          {
            "email":inputValue
          },
          {
            withCredentials:true
          }
        );
      
          if (response.status === 200) {
            toast.success(response.data);
            props.setShowPopup(false)
            setLoading(false);

          } else {
            console.log(response);
        
          }
        } catch (error) {
          toast.error(error.response.data);
          props.setShowPopup(false)
          setLoading(false);

          console.error('Error updating category:', error.response.data);
        }
      } 



  return (
    <div className=" pb-4 pt-2  flex justify-center flex-col items-center animate-slideup bg-white dark:bg-[#1C1817]  md:w-[40%] w-[60%] h-[33%] rounded-[24px] z-[10] absolute px-8 ">
        <div className=' w-full flex justify-end' >
          <GiCancel onClick={()=>{props.setShowPopup(false)}} className=' hover:cursor-pointer hover:drop-shadow-xl rounded-full text-blue-500 text-[30px]' />


        </div>

        <div className='  justify-center items-center flex flex-col w-full gap-6' >
      
            <p className="text-black text-lg font-bold ">Add new Shop</p>
            <div className=' w-full flex flex-row gap-6 justify-center items-center' >
            <p >Email:</p>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className='w-[80%] outline-none py-1 px-2 bg-transparent border-[2px] border-[#000] border-opacity-40 rounded-md ' 
              type="email"/>
               
            </div>

            <div className=' flex justify-end items-center w-[35%] ' >
                    <button 
                    onClick={handleCreateShop} 
                    className=' text-white rounded-[10px] h-10 w-full bg-blue-500 font-bold flex items-center justify-center ' >
                        {loading ? <Loader/>   : "Add" }
                    </button>

             </div>
        </div>

        
       


    </div>
  )
}

export default PopUp_AddShop