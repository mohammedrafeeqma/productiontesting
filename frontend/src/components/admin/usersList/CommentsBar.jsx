import {makeStyles, Typography} from "@material-ui/core"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, Bar, BarChart } from 'recharts';
import React, { useEffect, useState } from "react";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  barChart:{
    marginLeft:'20%'
  }
}))



const CommentsBar = ()=> {
    const classes = useStyles()  
  const[monthlyData, setMonthlyData] = useState([])

    useEffect(()=>{
      const fetchMonthlyData = async()=>{
         const res = await axios.get('/api/admin/comments')
         setMonthlyData(res.data)
         console.log(res.data);
       }
       fetchMonthlyData()
     },[])

     return(
  <div>
          <Typography style={{marginLeft:'20%',marginBottom:'0%',color:'grey'}} component='span' variant="h5">Total Comments</Typography>

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
      <Bar dataKey="total_posts" stackId="a" fill="#ffc658" />
      {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
    </BarChart>
  </div>
      
      )
}

export default CommentsBar