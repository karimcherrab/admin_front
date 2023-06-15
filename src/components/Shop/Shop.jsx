import React ,  { useState , useEffect } from 'react'
import TopBar from '../Layout/TopBar'
import {AiOutlineSearch} from 'react-icons/ai'
import axios from 'axios';
import { toast } from "react-toastify";
import PopUp_AddShop from './PopUp_AddShop';
import {GiCancel} from "react-icons/gi"
import Loader from '../Loader'
const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  

  const [stores, setstores] = useState([
    {
      shopId:"shopID1",
      name:"Shop01",
      email:"shop@gmail.com",
      numberPhone:"+213755418515",
      enabled:true,

    },
    {
      shopId:"shopID2",
      name:"Shop02",
      email:"shop2@gmail.com",
      numberPhone:"+213619548515",
      enabled:false,

    },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [shopId, setshopId] = useState("");

  const [ShowPopUpConfirmation, setShowPopUpConfirmation] = useState(false);
  const itemsPerPage = 7;

  
  const [inputValue, setInputValue] = useState('');
  const [totalPages, setTotalPages] = useState(Math.ceil(stores.length / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stores.slice(indexOfFirstItem, indexOfLastItem);
  const [loading,setLoading]=useState(false)

  const [modalOpen, setModalOpen] = useState(false);

  //---------------Search------------------//
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm)
  };
 
   const filteredStores = stores.filter((store) =>
  store.name.includes(searchTerm)
);

// if(searchTerm.length!==0){
//   try {
//     setTotalPages(1);

//     console.log(filteredStores.length)
//   } catch (error) {
//     console.log(error)
//   }
// }



  //---------------------------------//


  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
const handleOpenPopup = () => {
  setShowPopup(true);
};




useEffect(() => {
  fetchStores();
}, []);

//------------------------------------------------//
const fetchStores = async () => {
  try {
    const response = await axios.get('http://localhost:8010/v1/api/shop/getAllShops');
    //setstores(response.data);
   // const currentItems = stores.slice(indexOfFirstItem, indexOfLastItem);
     setTotalPages( Math.ceil(response.data.length / itemsPerPage));
    setstores(response.data.filter((store) => store.active ));
    console.log(stores)    //setTotalPages(5);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
//------------------------------------------------//
const handleCreateShop = async () => {

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
      setShowPopup(false);

    } else {
      console.log(response);
  
    }
  } catch (error) {
    toast.error(error.response.data);
    setShowPopup(false);

    console.error('Error updating category:', error.response.data);
  }
} 

//-------------Active-disable Shop ------------------//

const handleActiveUser = async (shopId)=>{
  console.log(shopId)

  if(!isActive){
    handleActiveShop();
  }else{

    handledisableShop();
  }
}


const handleActiveShop = async () => {
  console.log(shopId)
  try {
    
    const response = await axios.put(`http://localhost:8010/v1/api/shop/enableShop`, 
    {
      "shopId":shopId
    },
    {
      withCredentials:true
    }
  );

    if (response.status === 200) {
      toast.success("Shop has been enabled successfully");
      console.log(response)

      const updatedItems = stores.map(item => {
        if (item.shopId === shopId) {
          return { ...item, enabled: true };
        }
        return item;
      });
      setShowPopUpConfirmation(false)

      setstores(updatedItems);
    } 
  } catch (error) {
    toast.error(error.response.data);
    setShowPopUpConfirmation(false)

    console.error('Error:', error.response.data);
  }
} 


const handledisableShop = async () => {
  console.log(`IdShop ==== ` + shopId)

  try {
    
    const response = await axios.put(`http://localhost:8010/v1/api/shop/disableShop`, 
    {
      "shopId":shopId
    },
    {
      withCredentials:true
    }
  );

    if (response.status === 200) {
      toast.success("Shop has been disable successfully");
      const updatedItems = stores.map(item => {
        if (item.shopId === shopId) {
          return { ...item, enabled: false };
        }
        return item;
      });
      setShowPopUpConfirmation(false)

      setstores(updatedItems);

    } 
  } catch (error) {
    toast.error(error.response.data);
    setShowPopUpConfirmation(false)

    console.error('Error:', error);
  }
} 

  return (
    <div className='flex flex-col  '>

     
      <div className='bg-white h-[600px] w-[100%] px-4 py-4  shadow-lg rounded-lg relative '>
          <div className='flex justify-between'>
              <button  onClick={handleOpenPopup} className='bg-blue-400 rounded-lg font-bold text-white px-6 py-2 '>Add New Store</button>
              <div className='border  py-2 px-2   rounded-lg  flex bg-gray-50 w-[30%]'>
                  <AiOutlineSearch className='w-[25px] h-[25px] '/>
                  <input className='focus:outline-none px-2 py-0.5 bg-gray-50  'value={searchTerm} onChange={handleSearch}  placeholder='Sreach'/>
              </div>
          </div>

<table className="min-w-full divide-y divide-gray-200 mt-6">
    <thead>
      <tr>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store Id</th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store Name</th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enable</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">

    {searchTerm !== '' ? (
    filteredStores.map((store) => (
      <tr key={store.shopId}>
      <td className="px-6 py-4 whitespace-nowrap">{store.shopId}</td>
      <td className="px-6 py-4 whitespace-nowrap">{store.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{store.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{store.numberPhone}</td>
      <td 
      
      className="px-6 py-4 whitespace-nowrap ">
        
        {
        store.enabled ? <div   
        //onClick={() => handledisableShop(store.shopId)}
        onClick={
          
          () =>{
            setIsActive(true)
            setShowPopUpConfirmation(true)

            console.log("karimaziofjioazfjia")
            console.log(store.shopId)

            console.log(store.shopId)
            setshopId(store.shopId)
            }
        
        }

        className='bg-green-200 border-solid
        border-green-400 
        border-4	
        rounded-lg 
        py-2 
        text-center
      text-green-500
        font-bold'>&nbsp;Active&nbsp;</div> : <div
      //  onClick={() => handleActiveShop(store.shopId)}
      onClick={
          
        () =>{
          setIsActive(false)
           setShowPopUpConfirmation(true)
           setshopId(store.shopId)

          }
      
      }

        className='bg-red-200 border-solid
        border-red-400 
        border-4	
        rounded-lg 
        py-2 
        text-center
      text-red-500
        font-bold'
        
        >Inactive</div>

      }
      
      
      </td>

    </tr>
    ))
  ) : (
    currentItems.map((store) => (
      <tr key={store.shopId}>
      
      <td className="px-6 py-4 whitespace-nowrap">{store.shopId}</td>
      <td className="px-6 py-4 whitespace-nowrap">{store.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{store.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{store.numberPhone}</td>
      <td className="px-6 py-2 whitespace-nowrap">
      {
        store.enabled ? <div   
        //onClick={() => handledisableShop(store.shopId)}
        onClick={
          
          () =>{
            setIsActive(true)
            setShowPopUpConfirmation(true)

            console.log("karimaziofjioazfjia")
            console.log(store.shopId)

            console.log(store.shopId)
            setshopId(store.shopId)
            }
        
        }

        className='bg-green-200 border-solid
        border-green-400 
        border-4	
        rounded-lg 
        py-2 
        text-center
      text-green-500
        font-bold'>&nbsp;Active&nbsp;</div> : <div
      //  onClick={() => handleActiveShop(store.shopId)}
      onClick={
          
        () =>{
          setIsActive(false)
           setShowPopUpConfirmation(true)
           setshopId(store.shopId)

          }
      
      }

        className='bg-red-200 border-solid
        border-red-400 
        border-4	
        rounded-lg 
        py-2 
        text-center
      text-red-500
        font-bold'
        
        >Inactive</div>

      }



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

<div>

</div>
{showPopup && (
        <div className=" fixed left-0 top-0 w-[100%] h-screen bg-black bg-opacity-60 backdrop-blur-sm z-[9999] flex justify-center items-center  ">
          <PopUp_AddShop
           setShowPopup={setShowPopup}
           
          />
        </div>
      )}



{ShowPopUpConfirmation && (
        <div className=" fixed left-0 top-0 w-[100%] h-screen bg-black bg-opacity-60 backdrop-blur-sm z-[9999] flex justify-center items-center  ">
           <div className=" pb-4 pt-2  flex justify-center flex-col items-center animate-slideup bg-white dark:bg-[#1C1817]  md:w-[40%] w-[60%] h-[25%] rounded-[24px] z-[10] absolute px-8 ">
      

        <div className='  justify-center items-center flex flex-col w-full gap-6' >
      
            <p className="text-black text-lg font-bold ">Are You Sure You Want to Continue?</p>
           

            <div className=' flex justify-end items-center w-[40%] gap-8 ' >
                    <button 
                    onClick={handleActiveUser} 
                    className=' text-white rounded-[10px] h-10 w-full bg-green-500 font-bold flex items-center justify-center ' >
                        {loading ? <Loader/>   : "Yes" }
                    </button>

                    <button 
            onClick={() => setShowPopUpConfirmation(false)}
            className=' text-white rounded-[10px] h-10 w-full bg-red-500 font-bold flex items-center justify-center ' >
                              {loading ? <Loader/>   : "No" }
                    </button>
             </div>
        </div>

        
       


    </div>
        </div>
      )}


{/* {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-lg font-bold text-center	 mb-4">Add New Store</h2>
            <p className="text-sm  mb-2">Email Store</p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
              className="border border-gray-300 rounded px-4 py-2 mb-4"
          
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

export default Shop