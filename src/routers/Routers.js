import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'

import Create from '../pages/Create'
import VendorProfile from '../pages/VendorProfile'
import Market from '../pages/Market'
import NftDetail from '../pages/NftDetal'
import Request from '../pages/Request'
import MyRequest from '../pages/MyRequest'


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to = "/home"></Navigate>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/vendor-profile' element={<VendorProfile/>}></Route>
        <Route path='/home' element={<Market/>}></Route>
        <Route path='/requests/:id' element={<NftDetail/>}></Route>
        <Route path='/requests' element={<Request/>}></Route>
        <Route path='/my-request' element={<MyRequest/>}></Route>
    </Routes>
  )
}

export default Routers