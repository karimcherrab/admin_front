import React, { useState } from "react";

import { FiUsers } from "react-icons/fi";
import { BsArrowUp } from "react-icons/bs";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { useEffect } from "react";

function Customers() {
  const baseUrl ="http://localhost:8010/v1/api/user/"
  const urlGet = `${baseUrl}getAllUsers`;
  const bs=process.env.REACT_APP_QUERY_BASE_URL
  const urlGetLastMonth= `${bs}statistics/getMySubscription`
  const [customers, setCustomers] = useState([
    {
      name:"Customer1",
      birthdayDate:"1998-02-19",
      email:"Customer1@gmail.com",
      userGender:"MALE",
      userId:"Customer1"

    },
    {
      name:"Customer2",
      birthdayDate:"1988-02-19",
      email:"Customer2@gmail.com",
      userGender:"MALE",
      userId:"Customer2"

    },
  ]);
  const [lastMonth,setLastMonth]=useState(0)
  const columns = [
    {
      field: "name",
      headerName: "Customer name",
      minWidth: 200,
      flex: 2,
      headerClassName: "super-app-theme--header",
      renderCell: (param) => (
        <p className=" hover:cursor-pointer w-full flex justify-start items-center ">
          {param.formattedValue}
        </p>
      ),
    },
    {
      field: "birthdayDate",
      headerName: "bithday",
      minWidth: 200,
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (param) => {
        const timestamp = param.formattedValue;
        var date = new Date(timestamp); // Create a new Date object

        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
        var day = ("0" + date.getDate()).slice(-2);
        var hour = ("0" + date.getHours()).slice(-2);
        var minute = ("0" + date.getMinutes()).slice(-2);
        var second = ("0" + date.getSeconds()).slice(-2);

        var formattedDate =
          year +
          "-" +
          month +
          "-" +
          day +
          " " +
          hour +
          ":" +
          minute +
          ":" +
          second;
        console.log(formattedDate);
        return (
          <p className=" hover:cursor-pointer w-full flex justify-start items-center ">
            {formattedDate}
          </p>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (param) => (
        <p className=" hover:cursor-pointer w-full flex justify-start items-center ">
          {param.formattedValue}
        </p>
      ),
    },
    {
      field: "userGender",
      headerName: "Gender",
      minWidth: 200,
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (param) => (
        <p className=" hover:cursor-pointer w-full flex justify-start items-center ">
          {param.formattedValue}
        </p>
      ),
    },
  ];
  const getLastMonth= async ()=>{
    try{
      let res = await axios.get(urlGetLastMonth,{withCredentials:true})
      console.log(res)
      setLastMonth(res.data.body)

    }
    catch(e){

    }
  }
  const getSubs = async () => {
    try {
      let res = await axios.get(urlGet, { withCredentials: true });
      console.log(res);
      setCustomers(res.data);
    } catch (e) {}
  };
  useEffect(() => {
    getSubs();
    getLastMonth();
  }, []);
  return (
    <div className=" px-5 py-5 flex flex-col">
    

      <div className=" mt-5 py-4 px-4 bg-white flex flex-col gap-4 rounded-2xl h-[80vh] ">
        <div className=" w-full flex flex-row justify-start">
          <div className=" flex flex-col  ">
            <h1 className=" font-bold text-[25px] text-black">All Customers</h1>
            <p className=" font-semibold text-green-500">Active Members</p>
          </div>
        </div>
        <div className=" h-full ">
          <DataGrid
            rows={customers}
            columns={columns}
            pageSize={100}
            getRowId={(row) => row.userId}
            rowsPerPageOptions={[100]}
            localeText={{ noRowsLabel: "" }}
            sx={{
              position: "relative",
              backgroundImage: undefined,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              ".super-app-theme--header": {
                fontWeight: 900,
                color: "gray",
                fontSize: "15px",
                fontFamily: "unset",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              "& .MuiDataGrid-row": {
                border: "none",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              // "& .MuiDataGrid-footerContainer": {
              //   display: "none",
              // },
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "&.MuiDataGrid-root": {
                border: "none",
                color: `black`,
              },
              "& .MuiTablePagination-root": {
                color: `black`,
              },
              "& .MuiDataGrid-iconSeparator": {
                color: `black`,
              },
              "& .MuiTablePagination-caption": {
                color: `black`,
              },
              "& .MuiTablePagination-select": {
                color: `black`,
              },

              "& .MuiDataGrid-page": {
                color: `black`,
              },
              "& .MuiTablePagination-selectIcon": {
                color: `black`,
              },

              "& .MuiTablePagination-actions button": {
                color: `black`,
              },
              "& .MuiTablePagination-actions button:hover": {
                backgroundColor: "red",
                color: `black`,
              },
              "& .MuiPaginationItem-root": {
                color: `black`,
              },
              "& .MuiPaginationItem": {
                color: `black`,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Customers;
