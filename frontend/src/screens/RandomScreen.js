import axios from 'axios'
import React, { useState, useEffect } from 'react'

const RandomScreen = () => {
    const [data , setData] = useState([])
    const call_api = async() => {
        const {data, status} = await axios.get("/api/products");
        setData(data)
        console.log(typeof(data))
        console.log(data)
    }
    useEffect(() => {
        call_api()
        
    }, [])


  return (
    <div>
        {data && data.map((item) =>(
           <div key={item._id}><p>Random Screen</p><h1>{item.name}</h1></div>
        ))}
    </div>
  )
}

export default RandomScreen