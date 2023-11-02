import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../../libs/userApi"
import {
  Button,
  SkeltonButtonUrl,
} from "../../components"
import { 
  Brand,
  Art,
  ArrowDown,
  FacebookIcon,
  GoogleIcon,
} from "../../assets"
 
function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => { 
    window.history.replaceState({}, "", "/login");
  }, [])

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Please fill all the fields')
    const user = await login(email, password)
    dispatch({
      type: 'SET_USER',
      payload: user
    })
    navigate('/home')
  }

  return (
    <div className="w-screen h-screen bg-auth-background flex flex-row items-center justify-center">
      <div className="hidden lg:block w-[35%] h-full">
        <img src={Brand} width={42} height={52} alt="brand" className="pt-10 ml-5 min-w-[42px] lg:min-w-[65px]" />
        <p className="medium-text lg:text-2xl xl:text-3xl ml-5 mt-12 text-white w-[90%]">Find 3D Objects, Mockups and Illustration here.</p>
        <div className="min-w-[345px] w-[33.33%] absolute z-10 bottom-0 lg:left-10 xl:left-20 hidden lg:block">
          <img src={Art} alt="brand" className="w-full h-auto" />
        </div>
      </div>
      <div className="w-[90%] h-[90%] lg:p-12 lg:w-[65%] lg:h-full bg-white rounded-[45px] drop-shadow-2xl lg:drop-shadow-none lg:rounded-l-[55px] lg:rounded-r-none">
        <div className="w-full h-[35%] p-8 md:p-14">
          <div className="flex flex-row justify-end items-center styled-select mb-3">
            <select name="language" id="language">
              <option value="Default">Language</option>
              <option value="English">English</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Hindi">Hindi</option>
            </select>
            <img src={ArrowDown} alt="arrow down icon" className="w-8 h-8 ml-0" />
          </div>
          <p className="font-montserrat text-3xl text-black font-normal">Create Account</p>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <SkeltonButtonUrl btnText={'Sign up with Facebook'} btnIcon={FacebookIcon} handleUrl={`${import.meta.env.VITE_BACKEND_API}/auth/facebook`} />
            <SkeltonButtonUrl btnText={'Sign up with Google'} btnIcon={GoogleIcon} handleUrl={`${import.meta.env.VITE_BACKEND_API}/auth/google`} />
          </div>
          <p className="hidden md:block font-montserrat text-2xl text-black font-normal my-8 md:my-12 text-center">- OR -</p>
        </div>
        <div className="w-full h-[65%]">
          <div className="flex flex-col items-center">
            <form className="flex flex-col w-[90%] mt-20 mb-12" type="action" onSubmit={(e) => handleSubmit(e)}>
              <input className="active:border-b-light-green hover:border-b-light-green focus:border-b-light-green" type="email" name="email" value={email} onChange={(e) => handleEmail(e)} placeholder={'Email Address'} />
              <input className="active:border-b-light-green hover:border-b-light-green focus:border-b-light-green" type="password" name="password" value={password} onChange={(e) => handlePassword(e)} placeholder={'Password'} />
              <Button btnText={'Login'} customClassCSS={'bg-light-green'} type={'submit'} />
            </form>
            <p className="w-[89%] font-montserrat text-xl text-black font-normal text-left mt-2">Not have an account?
              <NavLink to={'/'}>
                <span className="text-light-green"> Sign Up</span>
              </NavLink> 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login