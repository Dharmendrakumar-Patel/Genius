import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate ,Outlet, NavLink } from 'react-router-dom';
import { getUserByToken } from '../../libs/userApi';
import { getMessages } from '../../libs/messageApi';
import { SkeltonButton } from '../../components';
import { logout } from '../../libs/userApi';
import {
  Chat, User, Logout
} from '../../assets/index.js';

function Home () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user?.initialUser?.user)

  useEffect(() => {
    if (user) {
      getMessage(user._id)
    } else {
      if (localStorage.getItem('token')) {
        getUserByToken(localStorage.getItem('token'))
          .then((user) => {
            getMessage(user.user._id)
            dispatch({
              type: 'SET_USER',
              payload: user
            })
          }).catch((err) => {
            console.log(err)
          })
      }
    }
  }, [])

  const getMessage = async (userId) => {
    const messages = await getMessages(userId)
    if (messages) {
      await dispatch({ type: 'SET_MESSAGE', payload: messages })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    logout()
    dispatch({
      type: 'SET_USER',
      payload: null
    })
    navigate('/login')
  }
  
  return (
    <div className="home w-screen h-screen overflow-hidden flex flex-col lg:flex-row bg-green-100">
      <div className='hidden lg:flex flex-col w-[15%] min-w-[320px] bg-green-50 h-full p-3'>
        <div className='profile w-full h-[25%] flex flex-col items-center justify-center p-5'>
          <div className='profile w-[100px] h-[100px]'>
            <img className='w-full h-full rounded-full' src={user && user?.photo ? user.photo : ''} alt='profile' />
          </div>
          <h2 className='text-xl text-center mt-3 break-words'>{user && user.fullName ? user.fullName : ''}</h2>
        </div>
        <div className='menu w-full h-[65%] p-3'>
          <ul className='px-5 w-full'>
            <li>
              <NavLink to='/home'>
                <span className='flex'>
                  <img className='mr-3' src={Chat} height={20} width={20} alt='Chat' />
                  Chat
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/home/profile'>
                <span className='flex'>
                  <img className='mr-3' src={User} height={20} width={20} alt='Profile' />
                  Profile
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='w-full h-[10%] p-3'>
          <SkeltonButton btnText='Logout' handleClick={handleLogout} />
        </div>
      </div>
      <div className='w-[100%] lg:w-[85%] h-full p-10'>
        <div className='w-full h-full'>
          <Outlet />
        </div>
      </div>
      <div className='w-[100%] flex flex-row items-center justify-between lg:hidden h-[10%] bg-green-50 p-3 px-10 sticky bottom-0 '>
        <span>
          <NavLink to='/home'>
            <img className='w-[30px] h-[30px]' src={Chat} alt='Chat' />
          </NavLink>
        </span>
        <span>
          <NavLink to='/home/profile'>
            <img className='w-[30px] h-[30px]' src={User} alt='Profile' />
          </NavLink>
        </span>
        <span className="cursor-pointer" onClick={handleLogout}>
          <img className='w-[30px] h-[30px]' src={Logout} alt='Logout' />
        </span>
      </div>
    </div>
  )
}

export default Home