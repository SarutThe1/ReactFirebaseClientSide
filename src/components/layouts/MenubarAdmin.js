import React from 'react'
import { Link } from 'react-router-dom'

const MenubarAdmin = () => {
  return (
    <nav>
        <ul className='nav flex-column'>
            <li className='nav-item'> 
            <Link to='/admin/user-manage'>User management</Link>
            </li>
            <li className='nav-item'>
            <Link to='/admin/google-user-manage'>Google user management</Link>
            </li>
        </ul>
    </nav>
  )
}

export default MenubarAdmin