import { useSelector, useDispatch } from 'react-redux';
import { SkeltonButton } from '../../components';
import { deleteUser } from '../../libs/userApi';
import { useNavigate } from 'react-router-dom';

function Profile () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.user?.initialUser?.user)

  const handleDeleteUser = async () => {
    await deleteUser(user._id)
    dispatch({ type: 'REMOVE_USER' })
    dispatch({ type: 'DELETE_MESSAGE' })
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className='profile w-full h-[25%] flex flex-col lg:hidden items-center justify-center p-5 mb-3'>
        <div className='profile w-[150px] h-[150px]'>
          <img className='w-full h-full rounded-full' src={user && user?.photo ? user.photo : ''} alt='profile' />
        </div>
      </div>
      <div className='fullName flex flex-col sm:flex-row justify-center sm:justify-between items-start sm:items-center mb-3'>
        <p className='medium-text font-bold mr-2 mb-0 break-normal w-[200px]'>Full Name :</p>
        <input readOnly className="active:border-b-light-green hover:border-b-light-green focus:border-b-light-green p-3 rounded-md" type="text" name="message" value={user && user?.fullName ? user.fullName : 'Demo -- Name'} />
      </div>
      <div className='email flex flex-col sm:flex-row justify-center sm:justify-between items-start sm:items-center mb-3'>
        <p className='medium-text font-bold mr-2 mb-0 break-normal w-[200px]'>Email :</p>
        <input readOnly className="active:border-b-light-green hover:border-b-light-green focus:border-b-light-green p-3 rounded-md" type="text" name="message" value={user && user?.email ? user.email : 'Demo -- Email'} />
      </div>
      <div className='freetoken flex flex-col sm:flex-row justify-center sm:justify-between items-start sm:items-center mb-3'>
        <p className='medium-text font-bold mr-2 mb-0 break-normal w-[200px]'>FreeToken :</p>
        <input readOnly className="active:border-b-light-green hover:border-b-light-green focus:border-b-light-green p-3 rounded-md" type="number" name="message" value={user && user?.freeToken ? user.freeToken : 0} />
      </div>
      <div className='deleteUser flex flex-row justify-end items-center mb-3'>
        <SkeltonButton btnText='Delete User' handleClick={handleDeleteUser}  customClassCSS={'mt-3 sm:mt-0 max-w-[150px]'}/>
      </div>
    </div>
  )
}

export default Profile