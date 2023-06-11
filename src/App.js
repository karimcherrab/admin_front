import './App.css';
import {CategoryPage , ShopPage  , ProduitPage , OrderPage, LoginPage,Orders,ProductList,Customers,DashboardAdmin} from './Routes.js'
import LeftBar from './components/Layout/LeftBar/LeftBar';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import {Routes,Route, useActionData} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute";

import Login from "./pages/LoginPage";
import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute2 from "./utils/PrivateRoute2";
import { useStateContext } from "./contexts/ContextProvider";

import Sidebar from './components/Layout/Sidebar';
import NavbarMobile from './components/Layout/NavbarMobile';
import NavbarAdmin from './components/Layout/NavbarAdmin';


/*
const Layout = () => {
  return (
    <div className='w-full h-[100%] bg-gray-100'>
      
      <div className='flex justify-between h-full'>
      <SideBar />
      <Outlet  />
    
      </div>
      
    </div>
  );
}
const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<CategoryPage/>
        },
        {
          path:"/category",
          element:<CategoryPage/>
        },
        {
          path:"/shop",
          element:<ShopPage/>
        },
        {
          path:"/produit",
          element:<ProduitPage/>
        },
        {
          path:"/order",
          element:<OrderPage/>
        },
        {
          path:"/login",
          element:<LoginPage/>
        },
      ] 
      
    },
   
    
  ]
)

function App() {
  return (
    <div >
      <RouterProvider router={router}/>
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
    </div>
  );
}
*/
function App() {
  const {authTokens} = useContext(AuthContext)
  const {screenSize,setScreenSize,setActiveMenu,activeMenu}=useStateContext()
  useEffect(()=>{
    const handleResize = ()=> setScreenSize(window.innerWidth)
    window.addEventListener('resize',handleResize)
    
    handleResize();
    return ()=>window.removeEventListener('resize',handleResize)
    },[])

    useEffect(()=>{
      if(screenSize <= 1140 ){setActiveMenu(false)}
      else{setActiveMenu(true)}
      },[screenSize])  
  return (
    <div className="relative h-screen " >

       { authTokens && <NavbarMobile/> }
       { authTokens && activeMenu ? (
            <div className={`w-72 sidebar fixed bg-white`}>
              <Sidebar />
            </div>
          ) : (
            ""
          )}      
    <div className="  " >
    { authTokens && <NavbarAdmin/> }
    </div>

    <div className={` ${ authTokens && activeMenu ? "ml-72" :"" }  bg-slate-50  h-[90%]`}  >
    { false && authTokens && <div className="fixed left-0 top-0 w-[100%] h-screen bg-black bg-opacity-60 backdrop-blur-sm z-[9999] flex justify-center items-center  " >
                {/* <InfosSeller/> */}
              </div>
               
                }
    <Routes>
              <Route element={<PrivateRoute />}>


              <Route exact path="/category" element={<CategoryPage />} />
              <Route exact path="/shop" element={<ShopPage />} />
              
              <Route exact path="/orders" element={<Orders />} />
              <Route exact path="/product" element={<ProductList />} />
              <Route exact path="/customers" element={<Customers />} />
              <Route exact path="/customers" element={<Customers />} />
              <Route exact path="/" element={<DashboardAdmin />} />
              <Route exact path="/dashboard" element={<DashboardAdmin />} />

                {/* <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/product" element={<ProductList />} />
                <Route exact path="/product/add" element={<AddProduct />} />
                <Route exact path="/customers" element={<Customers />} />
                <Route exact path="/orders" element={<Orders />} />
                <Route exact path="/customer complaint" element={<Complaints />} /> */}
                
              </Route>
              
              <Route element={<PrivateRoute2 />} >
              <Route path="/login" element={<Login />} />
              </Route>
             
              
    </Routes> 
    </div>
    <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
         
 
  </div>
  );
}

export default App;
