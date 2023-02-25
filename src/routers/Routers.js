import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'

import Home from "../pages/Home"
import Create from '../pages/Create'
import MyProfile from '../pages/MyProfile'
import VendorProfile from '../pages/VendorProfile'
import Market from '../pages/Market'
import NftDetal from '../pages/NftDetal'
import Request from '../pages/Request'


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to = "/home"></Navigate>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/my-profile' element={<MyProfile/>}></Route>
        <Route path='/vendor-profile' element={<VendorProfile/>}></Route>
        <Route path='/market' element={<Market/>}></Route>
        <Route path='/market/:id' element={<NftDetal/>}></Route>
        <Route path='requests' element={<Request/>}></Route>
    </Routes>
  )
}

export default Routers