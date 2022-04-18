import {makeStyles, Typography} from "@material-ui/core"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, Bar, BarChart } from 'recharts';
import React, { useEffect, useState } from "react";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  barChart:{
    marginLeft:'20%'
  }
}))



const BarCharts = ()=> {
    const classes = useStyles()  
  const[monthlyData, setMonthlyData] = useState([])

    useEffect(()=>{
      const fetchMonthlyData = async()=>{
         const res = await axios.get('/api/admin/monthlypost')
         setMonthlyData(res.data)
         console.log(res.data);
       }
       fetchMonthlyData()
     },[])

     return(
  <div>
          <Typography style={{marginLeft:'20%',marginBottom:'0%',color:'grey',fontFamily:'vollkorn',fontFamily:700}} component='span' variant="h5">Total posts</Typography>

    <BarChart
      width={500}
      height={300}
      data={monthlyData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="total_posts" stackId="a" fill="#82ca9d" />
      {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
    </BarChart>
  </div>
      
      )
}

export default BarCharts