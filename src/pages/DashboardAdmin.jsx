import React from "react";
// import { ResponsiveAreaBump } from '@nivo/bump'
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { IoPersonOutline } from "react-icons/io5";
import mobile from "../components/assets/avatar.png";
import { ResponsiveRadar } from "@nivo/radar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ResponsiveBullet } from "@nivo/bullet";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const MyResponsiveBullet = ({ data /* see data tab */ }) => (
  <ResponsiveBullet
    data={data}
    margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
    spacing={60}
    titleAlign="start"
    titleOffsetX={-50}
    measureBorderColor="rgba(153, 121, 80,0.7)"
    measureBorderWidth={4}
    measureSize={2}
    rangeColors="greens"
    measureColors="greens"
    markerColors="greens"
    markerSize={3}
  />
);

const MyResponsivePie = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    fill={[
      {
        match: {
          id: "Men",
        },
        id: "dots",
      },
      {
        match: {
          id: "Women",
        },
        id: "dots",
      },
    ]}
  />
);

export const Prod=(props)=>{
  return  <div className=" mt-4 bg-[#EEEEEE] rounded-lg px-4 py-3 gap-2 flex flex-row justify-between w-full">
  <div className="gap-6 flex flex-row">
    <img src={ props?.productIamgeUrl ?   'data:image/svg+xml;base64,' + props?.productIamgeUrl : mobile } alt="" />
    <div className=" flex flex-col">
      <p className=" text-[20px] text-gray-600 ">{props?.productName}</p>
      <p className=" font-semibold text-black" >{`${props?.ordersCount} order`}</p>
    </div>
  </div>
  
  <div className=" flex flex-col justify-center items-center">
    <p className=" text-black font-semibold" >Price</p>
    <p>{`${props.productPrice}$`}</p>
  </div>
  <div className=" flex flex-col justify-center items-center">
    <p className=" text-black font-semibold" >This month</p>
    <p>{`${props?.ordersCount} order`}</p>
  </div>
</div>
}



export default function DashboardAdmin() {
   const urlGet="http://localhost:8091/adminStatistics/getMyAdminStatistics" 
   const [stats, setStats] = useState({
    ageModelStatistics: {
        under18: 50,
        between18_30: 100,
        between30_40: 80,
        between40_50: 60,
        between50_60: 60
    },
    totalMaleCount: 200,
    totalFemaleCount: 150,
    totalProductsCount: 1,
    totalUsers: 350,
    totalShops: 2
});
  let data = [
    {
      id: " -18",
      ranges: [0, stats.totalUsers],
      measures: [stats.totalUsers],
      markers: [stats.ageModelStatistics.under18],
    },
    {
      id: "18-30",
      ranges: [0, stats.totalUsers],
      measures: [stats.totalUsers],
      markers: [stats.ageModelStatistics.between18_30],
    },
    {
      id: "30-40",
      ranges: [0, stats.totalUsers],
      measures: [stats.totalUsers],
      markers: [stats.ageModelStatistics.between30_40],
    },
    {
      id: "40-50",
      ranges: [0, stats.totalUsers],
      measures: [stats.totalUsers],
      markers: [stats.ageModelStatistics.between40_50],
    },
    {
      id: "50-60",
      ranges: [0, stats.totalUsers],
      measures: [stats.totalUsers],
      markers: [stats.ageModelStatistics.between50_60],
    },
  ];

  const [dataLine, setDataLine] = useState([]);
  
 
 let ressss = {
    "ageModelStatistics": {
        "under18": 0,
        "between18_30": 1,
        "between30_40": 0,
        "between40_50": 0,
        "between50_60": 0
    },
    "totalMaleCount": 1,
    "totalFemaleCount": 0,
    "totalProductsCount": 5,
    "totalUsers": 1,
    "totalShops": 6
}
  const getStatsAdmin= async ()=>{
    try{
        let res = await axios.get(urlGet,{withCredentials:true})
        console.log(res)
        setStats(res.data)

    }
    catch(e){

    }
  }
  

  useEffect(()=>{
    getStatsAdmin()
  },[])



 
 
  return (
    <div className=" px-5 py-5 w-full gap-6 justify-center items-center flex flex-col">
      <div className=" h-[60vh] w-full flex flex-row gap-2 " >
      <div className="flex-col rounded-2xl bg-white drop-shadow-xl h-full flex sm:w-[50%] w-full">
          <div className=" px-10 flex flex-col justify-start items-start w-full">
            <h1 className=" text-[25px] font-bold text-gray-400">Customers:</h1>
            <p className=" text-[18px] font-semibold text-gray-500">
              Information about customers
            </p>
          </div>
          <div className="h-full w-full">
            <MyResponsivePie
              data={[
                {
                  id: "Men",
                  label: "Men",
                  value: stats.totalMaleCount,
                  color: "hsl(285, 70%, 50%)",
                },
                {
                  id: "Women",
                  label: "Women",
                  value: stats.totalFemaleCount,
                  color: "hsl(14, 70%, 50%)",
                },
              ]}
            />
          </div>
        </div>

        <div className=" rounded-2xl bg-white drop-shadow-xl px-4 py-4 flex h-full flex-col sm:w-[50%] w-full">
          <div className=" flex flex-col ">
            <h1 className="text-[#535353] font-bold text-[25px] ">
              Stats Overview:
            </h1>
            <p className=" text-[#A7A7A7]">Information about store visits</p>
          </div>
          <div className="w-full h-[90%]">
            {/* <MyResponsiveRadar data={dataRadar} /> */}
            <MyResponsiveBullet data={data} />
          </div>

          <div></div>
        </div>

      </div>
    
 

      <div className=" w-full sm:h-[40vh] justify-center items-center flex sm:flex-row flex-col gap-6">
        <div className="bg-white rounded-2xl drop-shadow-xl px-4 py-8 flex h-full flex-col w-full ">
          <div className=" h-full w-full flex flex-row gap-4 justify-around items-center ">
            <div className=" w-[50%] px-4 h-full bg-[#EEEEEE] justify-center gap-8 rounded-md py-3 items-center flex flex-row ">
              <IoPersonOutline className=" text-[42px] text-yellow-500" />
              <div className=" text-[32px] flex flex-col justify-center items-center">
                <p className=" text-gray-500">Total Users</p>
                <p className=" text-gray-500">{stats.totalUsers}</p>
              </div>
            </div>
            <div className="  text-[32px]  w-[50%] px-4 h-full bg-[#EEEEEE] justify-center gap-8 rounded-md py-3 items-center flex flex-row ">
              <IoPersonOutline className=" text-[42px] text-yellow-500" />
              <div className=" flex flex-col justify-center items-center">
                <p className=" text-gray-500">Total Shops</p>
                <p className=" text-gray-500">{stats.totalShops}</p>
              </div>
            </div>
            <div className="  text-[32px]  w-[50%] px-4 h-full bg-[#EEEEEE] justify-center gap-8 rounded-md py-3 items-center flex flex-row ">
              <IoPersonOutline className=" text-[42px] text-yellow-500" />
              <div className=" flex flex-col justify-center items-center">
                <p className=" text-gray-500">Total Products</p>
                <p className=" text-gray-500">{stats.totalProductsCount}</p>
              </div>
            </div>
          </div>

          {/* <div className=" mt-4 w-full flex flex-col gap-2 ">
            <div className=" w-full flex justify-start items-center">
              <h1 className=" text-[25px] text-gray-400 font-semibold">
                Top products:
              </h1>
            </div>
           

            {bestSelling?.map((item,index)=>(
              <Prod key={item.productId} {...item} />
            ))}



          </div> */}




          
        </div>
       
      </div>
    </div>
  );
}
