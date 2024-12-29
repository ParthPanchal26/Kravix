import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: 'all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: 'add-post',
      active: authStatus
    }
  ]


  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="py-3 shadow text-white bg-gray-900">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4 flex items-center">
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <ul className={`hidden md:flex ml-auto ${isMenuOpen ? 'flex' : ''}`}>
            {navItems.map((item) =>
              item.active ? (
                <li className='flex' key={item.name}>
                  <button className='inline-block px-6 py-2 duration-200 hover:bg-gray-500 rounded-full' onClick={() => navigate(item.slug)}>{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && <li><LogoutBtn /></li>}
          </ul>
        </nav>
        <div className={`md:hidden fixed inset-0 bg-gray-800 bg-opacity-10 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`w-full text-center bg-gray-900 h-auto py-6 px-4 transition-transform duration-300 transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <button className="absolute top-4 right-4 text-white focus:outline-none" onClick={toggleMenu}>
              <svg className="w-6 h-6 my-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <ul className="space-y-6">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button className='text-white px-6 py-2 duration-200 hover:bg-gray-500 rounded-full' onClick={() => { navigate(item.slug); closeMenu(); }}>{item.name}</button>
                  </li>
                ) : null
              )}
              {authStatus && <li><LogoutBtn /></li>}
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );

  // return (
  //   <>
  //     <header className='py-3 shadow text-white bg-gray-900'>
  //       <Container>
  //         <nav className="flex">
  //           <div className="mr-4">
  //             <Link to='/'> <Logo width='70px' /> </Link>
  //           </div>
  //           <ul className="flex ml-auto">
  //             {navItems.map((item) =>
  //               item.active ? (
  //                 <li className='flex' key={item.name}>
  //                   <button className='inline-block px-6 py-2 duration-200 hover:bg-gray-500 rounded-full' onClick={() => navigate(item.slug)}>{item.name}</button>
  //                 </li>
  //               ) : null
  //             )}
  //             {authStatus && <li><LogoutBtn /></li>}
  //           </ul>
  //         </nav>
  //       </Container>
  //     </header>
  //   </>
  // )
}

export default Header
