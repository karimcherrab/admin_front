import React, { useEffect, useRef, useState } from "react";
import {GiCancel} from "react-icons/gi"
import Loader from '../Loader'
import { BiImageAdd } from "react-icons/bi";
import axios from "axios"
import ca from "../../components/assets/ca.svg"

function UpdateProductPopup(props) {
  const bs = process.env.REACT_APP_COMMAND_BASE_URL;
  const urlUpdate=`${bs}products/update/${props.id}`
  const urlImage=`${bs}products/matchImageWithProduct/`
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading,setLoading]=useState(false)
    const [info,setInfo]=useState({
      img:props.img,
      name:props.name,
      desc:props.desc,
      price:props.price,
      qte:props.qte,
      shopId:props.shopId

    })
    const modifyProduct = (itemId) => {
      props.setProducts(prevProducts => {
        return prevProducts.map(item => {
          if (item.productId === itemId) {
            return {
              shopId:info.shopId,
              productName:info.name, 
              productPrice:info.price, 
              productQuantity:info.qte, 
              productImageUrl:"das", 
              productDesc:info.desc, 
              categoryName:"dasdas"
            };
          }
          return item;
        });
      });
    };
    const fileInputRef = useRef(null);
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  useEffect(()=>{
    console.log({
      shopId:info.shopId,
      productName:info.name, 
      productPrice:info.price, 
      productQuantity:info.qte, 
      productImageUrl:"das", 
      productDesc:info.desc, 
      categoryName:"dasdas"
    }) 
  })
  const globalFunc= async ()=>{
    handleUpdate().then(id=>addImage(id))
  }

  const addImage=async(id)=>{
    let data = new FormData()
    data.append("file",selectedFile)
    try{
      let res = await axios.post(`${urlImage}${id}`,data,{withCredentials:true})
      setSelectedFile(null) 
    }
    catch(e){
      console.log(e)
    }
  }
  const handleUpdate= async ()=>{
    try{
      let res = await axios.patch(urlUpdate,{
        shopId:info.shopId,
        productName:info.name, 
        productPrice:info.price, 
        productQuantity:info.qte, 
        productDesc:info.desc, 
        categoryName:"dasdas"
      },{withCredentials:true})
      console.log(res)
      modifyProduct(props.id)
      // props.setToggle(false)
    }
    catch(e){
      console.log(e)
    }

  }
  return (
    <div className=" pb-8 pt-2  flex justify-center flex-col items-center animate-slideup bg-white dark:bg-[#1C1817] text-black  md:w-[50%] w-[90%] rounded-[24px] z-[10] absolute px-8 ">
        <div className=' w-full flex justify-end' >
          <GiCancel onClick={()=>{props.setToggle(false)}} className=' hover:cursor-pointer hover:drop-shadow-xl rounded-full text-black text-[30px]' />


        </div>
        <div className=' mt-4 justify-center items-center flex flex-row w-full' >
        <img src={ca} alt="" className=' flex-1 w-[250px] h-[250px]' />
       <div className='flex-1 text-[20px] text-black  flex flex-col gap-5 justify-start items-start' >
        <div className=' w-full flex flex-row gap-3 justify-between items-center' >
            <p>Name:</p>
            <input onChange={(e)=>{setInfo({...info,name:e.target.value})}} value={info.name} className='w-[80%] outline-none py-1 px-2 bg-transparent border-[1px] border-[#000] border-opacity-40 rounded-md ' disabled type="text"/>

        </div>
        <div className='w-full flex flex-row gap-3 justify-between items-center' >
            <p>Price:</p>
            <input onChange={(e)=>{setInfo({...info,price:parseFloat(e.target.value)})}} value={info.price} className='w-[80%] outline-none py-1 px-2 bg-transparent border-[1px] border-[#000] border-opacity-40 rounded-md ' disabled type="text"/>

        </div>
        <div className='w-full flex flex-row gap-3 justify-between items-center' >
            <p>Qte:</p>
            <input onChange={(e)=>{setInfo({...info,qte: parseFloat(e.target.value) })}} value={info.qte} className='w-[80%] outline-none py-1 px-2 bg-transparent border-[1px] border-[#000] border-opacity-40 rounded-md ' disabled  type="text"/>

        </div>
        
        <div className='w-full flex flex-row gap-3 justify-between items-center' >
            <p>Desc:</p>
            <textarea onChange={(e)=>{setInfo({...info,desc:e.target.value})}} style={{resize:"none"}} value={info.desc} className=' w-[80%] outline-none py-1 px-2 bg-transparent border-[1px] border-[#000] border-opacity-40 rounded-md ' disabled type="text"/>

        </div>
       

  

       </div>


        </div>

        
       


    </div>
  )
}

export default UpdateProductPopup