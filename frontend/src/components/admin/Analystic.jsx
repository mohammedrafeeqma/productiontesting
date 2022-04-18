import {makeStyles, Typography} from "@material-ui/core"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, Bar } from 'recharts';
import React, { useEffect, useState } from "react";
import axios from "axios";
import BarCharts from "./BarCharts";
import PieCharts from "./PieChart";
import CommentsBar from "./usersList/CommentsBar";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const useStyles = makeStyles((theme) => ({
  barChart:{
    marginLeft:'20%'
  }
}))

function Chart ({monthlyData}){
  
  return(
  
        <AreaChart width={530} height={250} data={monthlyData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
   
  </defs>
  <XAxis dataKey="name" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
  <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
  )
}


function Analystic() {
    const classes = useStyles()  
  const[monthlyData, setMonthlyData] = useState([])

    useEffect(()=>{
      const fetchMonthlyData = async()=>{
         const res = await axios.get('/api/admin/monthly')
         setMonthlyData(res.data)
         console.log(res.data);
       }
       fetchMonthlyData()
     },[])

  return (
      <>
      
      <div style={{marginTop:'10%'}}>
        <Typography style={{marginLeft:'20%',marginBottom:'2%',color:'grey',fontFamily:'vollkorn',fontFamily:600}} variant="h5">New Users</Typography>
      </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <Chart monthlyData={monthlyData}/>
          
            <BarCharts/>
          
          
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:''}}>
          <PieCharts/>
          
             <CommentsBar/>
        
         
        </div>
        

       
      </>
     
   
      
    
  )
}

export default Analystic