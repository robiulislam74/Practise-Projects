import React, { useState } from 'react'
import ShowInfo from '../components/ShowInfo'
import WriteInfo from '../components/WriteInfo'

const Home = () => {
  const [ data,setData] = useState('')


const dataShow = (item) =>{
  setData(item)
}


  return (
    <div className='homeBody'>
        <div className='boxDawon'>
        <WriteInfo dataShow={dataShow}/>
        <ShowInfo data={data} />
        </div>
    </div>
  )
}

export default Home