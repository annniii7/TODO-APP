import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between text-white font-semibold bg-purple-500 py-3'>
        <div className="logo mx-5 text-xl">
            <span>iTask</span>
        </div>
        <ul className='flex gap-5 mx-5 text-lg'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
