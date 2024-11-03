import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex flex-row gap-6 place-content-center bg-[#ECDFCC] p-2 text-xl'>
        <NavLink  to="/" > Home </NavLink>
        <NavLink to="/pastes"> Pastes </NavLink>
    </div>
  )
}

export default Navbar