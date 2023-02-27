import React, { useEffect, useState } from 'react'
import "../component/Temp.css"
function Temp() {
    const[city,setCity]=useState("")
    const[search,setSearch]=useState("pune")
 
    const prev= window.localStorage.getItem("recent")
    useEffect(()=>{
        const fetchApi=async()=>{
                const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=c38aed2b08bf4db4bc3b3df570dbb1cc`
                const response=await fetch(url)
                const resJson=await response.json()
                setCity(resJson.main)
            
        }
        fetchApi()
    },[search])
    
  return (
    <div className='box'>
        <h1 id='header-text'>Weather App</h1>
        <div className="inputData">
             <input
             type="search"
             className='inputField'
             value={search}
             onChange={(e)=>{
                setSearch(e.target.value)
                localStorage.setItem("recent",search)
            }}
             placeholder="Enter City Name"/>
        </div>
        <br/>
        <div>  
            {!city?(
                <div >
                    <div className='error'>Enter valid city name</div>
                    <div>
                        <h3>List of city previously searched</h3>
                        {localStorage.getItem("recent")}
                    </div>
                </div>
                
            ):(
                <div className='information'>
                <h2 className='location'>Weather Details of City : {search}</h2>
                <h2 className='curr-temp'>Current Temperature : {city.temp} *C</h2>
                <h2 className='range'>Temperature Range : {city.temp_min} *C to {city.temp_max} *C</h2>
                <h2 className='humidity'>Humidity : {city.humidity}</h2>
                <h2 className='sea-level'>Sea Level : {city.sea_level}</h2>
                <h2 className='ground-level'>Ground Level : {city.grnd_level}</h2>
    
            </div>
            )
        }
        </div>

    </div>
  )
}

export default Temp

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=c38aed2b08bf4db4bc3b3df570dbb1cc