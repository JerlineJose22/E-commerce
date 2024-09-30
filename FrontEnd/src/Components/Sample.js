import axios from 'axios'
import React, { useState } from 'react'


function Sample() {
  const [details, setDetails] = useState([])

  let x = 'http://127.0.0.1:8081/media/upload/download_1.jpeg'
  function getall(){
    axios.get("http://127.0.0.1:8000/Movies/list/")
    .then(res => {console.log(res.data)
        setDetails(res.data)
    }
    )
  }

  function getalldata(){
    axios.get("http://127.0.0.1:8081/product/list/")
    .then(res => console.log(res.data)
    )
  }

  
  // getall()
  // getalldata()
  return (
    <div>
      <img src={x} alt='sample' />
    </div>
  )
}

export default Sample
