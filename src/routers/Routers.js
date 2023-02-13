import React from 'react'
import {Route, Routers, Navigate} from 'react-router-dom'

import Home from "../pages/Home"
import Create from '../pages/Create'
import Profile from '../pages/Profile'
import Market from '../pages/Market'


const Routers = () => {
  return (
    <Routers>
        <Route path='/' element={<Navigate to = "/home"></Navigate>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/market' element={<Market/>}></Route>
    </Routers>
  )
}

export default Routers