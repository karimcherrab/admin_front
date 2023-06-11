import React from 'react'
import ItemMenu from './ItemMenu'
import {BiCategory} from "react-icons/bi"
import {Link} from 'react-router-dom'

const LeftBar = () => {
  
  
  return (
    <div className='w-[18%] h-screen bg-white border-t px-4 py-2  rounded-b shadow-lg'>  	  

      <div className='flex flex-col gap-4 mt-3'>
      
            <div>
              <h1>Site Name</h1>
            </div>
            <Link to="/category">
            <div className='flex gap-4 items-center' >
              <BiCategory className='w-[25px] h-[25px]'/>
              <span className='text-lg'>Category</span>
          </div>
             </Link>

             <Link to="/shop">
          <div className='flex gap-4 items-center '>
              <BiCategory className='w-[25px] h-[25px]'/>
              <span className='text-lg'>Shop</span>
          </div>
          </Link>
          <Link to="/order">
          <div className='flex gap-4 items-center '>
              <BiCategory className='w-[25px] h-[25px]'/>
              <span className='text-lg'>Order</span>
          </div>
          </Link>
          <Link to="/produit">
          <div className='flex gap-4 items-center '>
              <BiCategory className='w-[25px] h-[25px]'/>
              <span className='text-lg'>Produit</span>
          </div>
          </Link>
      </div>

    
    


    </div>
  )
}

export default LeftBar