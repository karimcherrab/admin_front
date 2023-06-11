import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

const TopBar = ({TopName}) => {
  return (
    <div className='flex justify-between items-center gap-6   w-[70%]'>
    <h1 className='font-bold text-4xl	'>{TopName}</h1>
    <div className='border  py-2.5 px-2.5   rounded-lg  flex bg-white w-[60%] shadow-lg'>
          <AiOutlineSearch className='w-[25px] h-[25px] '/>
          <input className='focus:outline-none px-2 py-0.5  ' placeholder='Sreach'/>
     </div>
  </div>  
  )
}

export default TopBar