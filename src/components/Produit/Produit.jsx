import React, { useState } from 'react';
import TopBar from '../Layout/TopBar'
import ReactSelect from 'react-select';

const Produit = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);

  const categories = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    // Add more options as needed
  ];
  const prices = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    // Add more options as needed
  ];

  const shops = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    // Add more options as needed
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '200px',
      height: '3rem',
      backgroundColor: '#F6F6F6',
      borderColor: state.isFocused ? '#000' : '#F6F6F6',
      borderRadius: '.375rem',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(79, 70, 229, 0.2)' : 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#4F46E5' : state.isFocused ? '#E2E8F0' : '#EDF2F7',
      color: state.isSelected ? '#FFFFFF' : '#4A5568',
      cursor: 'pointer',

    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#4A5568',
    }),
  };
  



  return (
    <div className='flex flex-col '>
        <TopBar TopName="Products"/>

        <div className=' w-full bg-white mt-8 px-8 py-4 flex justify-between items-center rounded-lg shadow-lg'>
        <div className='bg-white flex gap-8'>
            <div>
            <p>Category</p>
            <ReactSelect
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categories}
                    styles={customStyles}
                    className='w-[200px] mt-2'
            />
            </div>
            <div>
            <p>Price</p>
            <ReactSelect
                    value={selectedPrice}
                    onChange={setSelectedPrice}
                    options={prices}
                    styles={customStyles}
                    className='w-[200px] mt-2'
            />
            </div>
            <div>
            <p>Shop</p>
            <ReactSelect
                    value={selectedShop}
                    onChange={setSelectedShop}
                    options={shops}
                    styles={customStyles}
                    className='w-[200px] mt-2'
            />
            </div>
        </div>

        <div>
            <button>Apply Filter</button>
        </div>

        </div>
       
        

       
    </div>
  )
}

export default Produit