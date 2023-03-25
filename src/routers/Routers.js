import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'

import Create from '../pages/Create'
import Market from '../pages/Market'
import NftDetail from '../pages/NftDetal'
import Request from '../pages/Request'
import MyRequest from '../pages/MyRequest'
import MyOffer from '../pages/MyOffer'


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to = "/home"></Navigate>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/my-offer' element={<MyOffer/>}></Route>
        <Route path='/home' element={<Market/>}></Route>
        <Route path='/receipt/:id' element={<NftDetail/>}></Route>
        <Route path='/requests' element={<Request/>}></Route>
        <Route path='/my-request' element={<MyRequest/>}></Route>
    </Routes>
  )
}

export default Routers