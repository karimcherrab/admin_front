import React ,  { useState , useEffect } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {RiDeleteBin5Fill} from 'react-icons/ri'
import { toast } from "react-toastify";
import {GiCancel} from "react-icons/gi"
import Loader from '../Loader'

import axios from 'axios';
const Category = () => {

  const [loading,setLoading]=useState(false)

    const [categories, setCategories] = useState([
      {
        categoryName:"Electronics",
        categoryId:"categoryId1"
      },
      {
        categoryName:"Books",
        categoryId:"categoryId2"
      },
      {
        categoryName:"Sporting Goods- internal link",
        categoryId:"categoryId3"
      },
    ]);


    const [showPopup, setShowPopup] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [popupTitle, setPopupTitle] = useState('');
    const [categorySelect, setcategorySelect] = useState('');

    const itemsPerPage = 7;

  //Pagination
  const [totalPages, setTotalPages] = useState(Math.ceil(categories.length / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      setTotalPages( Math.ceil(filteredCategories.length / itemsPerPage));

    };
    const filteredCategories = categories.filter((category) =>
       category.categoryName.includes(searchTerm)
    );

   
    useEffect(() => {
      fetchCategories();

      console.log("cherrab")
    }, []);
  
    const fetchCategories = async () => {
      try {
        const response =
         await axios.get(`http://localhost:8091/categories/getAll`)
        
        if (response.status === 200) {
          setCategories(response.data);
          setTotalPages( Math.ceil(response.data.length / itemsPerPage));

        } else {
          console.error('Error fetching categories:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const isNameExists = (name) => {
            return categories.some((category) => category.categoryName === name);
    };

    const handleCreateCategory = async () => {
      setLoading(true);
      console.log('Validating input:', inputValue);

      if(popupTitle === "Add New Category"){
 
      try {
          if(inputValue === ""){
             toast.error("Please type a value");
          }else if(isNameExists(inputValue)){
            toast.warning("There is the same category name");
            setShowPopup(false);
            setInputValue('');
          }else{
         
           
            const response = await 
            axios.post(`http://localhost:8090/categories/create`, 
            {
              "categoryName":inputValue
            },{
              withCredentials:true
            }
          );
      
            if (response.status === 200) {
             
                console.log("cherrab")
                setShowPopup(false);
                setLoading(false);

                setInputValue('');
                toast.success('Category created successfully');
                console.log(response)
                setTotalPages( Math.ceil((categories.length+1) / itemsPerPage));
  
                const newItem =response.data;
                console.log(newItem)
                setCategories([...categories, newItem]);
  
              
              
            } 

           

          }
       
       
        } catch (error) {
          setShowPopup(false);
          setInputValue('');
          console.error('Error creating category:', error);
          toast.error(error.response.data);

        } }
        //Update

        else{


          try {
            if(inputValue === ""){
              toast.error("Please type a value");
           }else if(isNameExists(inputValue)){
             toast.warning("There is the same category name");
             setShowPopup(false);
             setInputValue('');
           }else{
            const response = await axios.patch(`http://localhost:8090/categories/update/${categorySelect}`, {
              "categoryName":inputValue
            },{
              withCredentials:true
            });
      
            if (response.status === 200) {
              toast.success('Category updated successfully');
              setInputValue('');
              setShowPopup(false);
              setLoading(false);


              console.log(categorySelect)

              const updatedItems = categories.map(item => {
                if (item.categoryId === categorySelect) {
                  return { ...item, categoryName: inputValue };
                }
                return item;
              });

              console.log(updatedItems)

              setCategories(updatedItems);



            } else {
              setShowPopup(false);
              setInputValue('');
              console.error('Error updating category:', response.statusText);
              toast.error('Error updating category:', response.statusText);
              setLoading(false);

            }
         
          }
          } catch (error) {
            setShowPopup(false);
            setInputValue('');
            console.error('Error updating category:', error);
            toast.error('Error updating category:', error);
            setLoading(false);

          }

        }





      };
    
      const handleDeleteCategory = async (id) => {
        console.log(id)
        try {
          const response = await axios.delete(`http://localhost:8090/categories/delete/${id}`,{
            withCredentials:true
          }
           );
    
          if (response.status === 200) {
            toast.success('Category Deleted successfully');
         
            //Find Item By id And removed from the list
            console.log(id)
            console.log(Math.ceil((categories.length-1) / itemsPerPage))
            setTotalPages( Math.ceil((categories.length-1) / itemsPerPage));
            
            if((categories.length-1) % itemsPerPage === 0 && (categories.length-1) > 7 ){
              console.log("true")
              setCurrentPage(currentPage-1)

            }else{
              console.log("false")

            }
            const updatedItems = categories.filter(item => item.categoryId !== id);
            console.log(updatedItems)
            setCategories(updatedItems);

          } 
         
        } catch (error) {
     
          console.error('Error Deleted category:', error);
          toast.error('Error Deleted category:', error);

        }
     
      }

    
      const handleUpdate = (id) => {
        // Handle the update action
        setPopupTitle("Update Category");
        setShowPopup(true);
        setcategorySelect(id);

      };
    
      const handleDelete = (id) => {
        // Handle the delete action
       // setcategorySelect(id);
        handleDeleteCategory(id);
      };
    
   
      const handleOpenPopup = () => {
        setPopupTitle("Add New Category");

        setShowPopup(true);
      };
    
      const handleClosePopup = () => {
        setShowPopup(false);
        setInputValue('');
      };
    
      const handleValidate = () => {
        // Perform validation logic or any other actions
        console.log('Validating input:', inputValue);

        handleCreateCategory();
      };
  return (
    <div className='flex flex-col  '>

      


      <div className='bg-white h-[600px] w-[100%] px-4 py-4  shadow-lg rounded-lg relative '>
            <div className='flex justify-between'>
                <button  onClick={handleOpenPopup} className='bg-blue-400 text-white px-6 py-2 rounded-lg font-bold'>Add New Category</button>
                <div className='border  py-2 px-2   rounded-lg  flex bg-gray-50 w-[30%]'>
                    <AiOutlineSearch className='w-[25px] h-[25px] '/>
                    <input className='focus:outline-none px-2 py-0.5 bg-gray-50  'value={searchTerm} onChange={handleSearch} placeholder='Sreach'/>
                </div>
            </div>

 <table className="min-w-full divide-y divide-gray-200 mt-6 ">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id category</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">

      {searchTerm !== '' ? (
      filteredCategories.map((category) => (
        <tr key={category.categoryId}>
        <td className="px-6 py-4 whitespace-nowrap">{category.categoryId}</td>
        <td className="px-6 py-4 whitespace-nowrap">{category.categoryName}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button onClick={() => handleUpdate(category.categoryId)} className="text-indigo-600 hover:text-indigo-900">Update</button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button onClick={() => handleDelete(category.categoryId)} className="text-red-600 hover:text-red-900">Delete</button>
        </td>
      </tr>
      ))
    ) : (
      currentItems.map((category) => (
        <tr key={category.categoryId}>
          <td className="px-6 py-4 whitespace-nowrap">{category.categoryId}</td>
          <td className="px-6 py-4 whitespace-nowrap">{category.categoryName}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button onClick={() => handleUpdate(category.categoryId)} className="text-indigo-600 hover:text-indigo-900">Update</button>
          </td>
          <td className="px-6 py-4 whitespace-nowrap ">
            <button  className=" text-red-600 hover:text-red-900"><RiDeleteBin5Fill onClick={() => handleDelete(category.categoryId)}/></button>
          </td>
        </tr>
      ))
    )}


     
      </tbody>
    </table>
    <div className="flex items-center justify-center  absolute bottom-0 right-0 py-4 px-6">
      <nav className="relative z-0 inline-flex shadow-sm">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>

        {/* Pagination numbers */}
        <div className="hidden md:flex">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`-ml-px relative inline-flex items-center px-4 py-2 border ${
                  currentPage === pageNumber
                    ? 'bg-blue-500 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                } text-sm font-medium`}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </nav>
    </div>
</div>

{showPopup && (

<div className=" fixed left-0 top-0 w-[100%] h-screen bg-black bg-opacity-60 backdrop-blur-sm z-[9999] flex justify-center items-center  ">
<div className=" pb-4 pt-2  flex justify-center flex-col items-center animate-slideup bg-white dark:bg-[#1C1817]  md:w-[40%] w-[60%] h-[33%] rounded-[24px] z-[10] absolute px-8 ">
      <div className=' w-full flex justify-end' >
        <GiCancel onClick={()=>{handleClosePopup()}} className=' hover:cursor-pointer hover:drop-shadow-xl rounded-full text-blue-500 text-[30px]' />


      </div>

      <div className='  justify-center items-center flex flex-col w-full gap-6' >
    
          <p className="text-black text-lg font-bold ">{popupTitle}</p>
          <div className=' w-full flex flex-row gap-6 justify-center items-center' >
          <p >Name:</p>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className='w-[80%] outline-none py-1 px-2 bg-transparent border-[2px] border-[#000] border-opacity-40 rounded-md ' 
            type="email"/>
             
          </div>

          <div className=' flex justify-end items-center w-[35%] ' >
                  <button 
                  onClick={handleValidate} 
                  className=' text-white rounded-[10px] h-10 w-full bg-blue-500 font-bold flex items-center justify-center ' >
                      {loading ? <Loader/>   : "Save" }
                  </button>

           </div>
      </div>

      
     


  </div>

</div>
     
      )}

{/* {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-lg font-bold text-center	 mb-4">{popupTitle}</h2>
            <p className="text-sm  mb-2">Category Name</p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4"
              placeholder="Enter value"
            />
            <div className="flex justify-end">
              <button onClick={handleClosePopup} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
                Cancel
              </button>
              <button onClick={handleValidate} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Validate
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default Category