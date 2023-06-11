import React from 'react'

const ItemMenu = ({image , title}) => {
  return (
    <div className='flex gap-4 items-center '>
    
        <img className='w-[25px] h-[25px]' src={image} alt={title}/>
        <span className='text-sm'>{title}</span>
    </div>
  )
}

export default ItemMenu