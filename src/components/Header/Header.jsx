import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: authStatus,
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
    name: "All Posts",
    slug: "/all-posts",
    active: authStatus,
  },
  {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
    <header className='py-2 w-full shadow bg-cyan-700 flex justify-between items-center'>
      {/* <Container> */}
      <div className='mx-4'>
        <Link to='/'>
          <Logo width='700px'   />
        </Link>
      </div>
      <nav className='flex justify-between'>
          <ul className='flex ml-auto'>
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock mx-2 px-6 py-2 duration-200 hover:bg-cyan-300 rounded-full'
                >
                  {item.name}
                </button>
              </li>
            ) : null)}
          </ul>
        </nav>
        {authStatus && (
          <li className='list-none'>
            <LogoutBtn />
          </li>
        )}
      {/* </Container> */}
    </header>
  )
}

export default Header