import {makeStyles, Typography} from "@material-ui/core"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, Bar, BarChart, PieChart, Pie, Cell } from 'recharts';
import React, { useEffect, useState } from "react";
import axios from "axios";


const data = [
    { name: 'Group A', value: 1 },
    { name: 'Group B', value: 13 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F'];
  
  const RADIAN = Math.PI / 180;
  const men = 'men'
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
  
    return (
      <text   x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };



const useStyles = makeStyles((theme) => ({
  
}))



const PieCharts = ()=> {
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
          <Typography style={{marginLeft:'20%',marginBottom:'0%',color:'grey'}} component='span' variant="h5">Gender wise</Typography>

            <div style={{display:'flex', alignItems:'center',marginBottom:'5px',marginTop:'8px'}}>
         <Typography variant="p">Men</Typography>
          <div style={{width:'20px',height:'10px',backgroundColor:'#00C49F',marginLeft:'5px',marginRight:'15px'}}></div>

          <Typography variant="p">Women</Typography>
          <div style={{width:'20px',height:'10px',backgroundColor:'#0088FE',marginLeft:'5px'}}></div>
            </div>

      
    
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      
  </div>
      
      )
}

export default PieCharts