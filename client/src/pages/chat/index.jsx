import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNewMessage, removeMessage, getMessages } from '../../libs/messageApi.js';
import { getUserByToken } from '../../libs/userApi.js';
import { Delete, Reload, Wait } from '../../assets/index.js';

function Chat () {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.user?.initialUser?.user)
  const messages = useSelector((state) => state?.message?.initialMessage)
  const messageLoading = useSelector((state) => state?.message?.loading)

  const handleMessage = (e) => {
    e.preventDefault()
    setMessage(e.target.value)
  }

  const handleSubmit = async () => {
    if (!message) {
      return alert('Please Enter Message')
    } else if (user && !user?._id) {
      return alert('Please Login First')
    }

    if (user.freeToken > 0) {
      dispatch({
        type: 'LOADING_STATUS',
        payload: true
      })
      await createNewMessage(message, user._id)
      dispatch({
        type: 'LOADING_STATUS',
        payload: false
      })
    } else {
      alert('You have no free token left')
    }
  }

  const removeMsg = async (messageId) => {
    dispatch({ type: 'REMOVE_MESSAGE', payload: messageId })
    await removeMessage(messageId)
  }

  const handleGetMessage = async () => {
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

  const getMessage = async (userId) => {
    const messages = await getMessages(userId)
    dispatch({type: 'LOADING_STATUS', payload: null})
    if (messages) {
      await dispatch({ type: 'SET_MESSAGE', payload: messages })
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="tokenDetails h-[70px] flex items-center justify-end p-3">
        <div className="w-[180px] mt-3 px-4 py-2 border border-black rounded-lg">
          <p className='font-montserrat text-xl text-black text-center w-full font-normal'>Free Use : {user && user?.freeToken ? user.freeToken : 0}/5</p>
        </div>
      </div>
      <div className="genrateMessage w-full h-[200px] flex flex-col items-end p-3 mt-0">
        <input className="active:border-b-light-green hover:border-b-light-green focus:border-b-light-green p-3 rounded-md" type="text" name="message" value={message} onChange={(e) => handleMessage(e)} placeholder={'Enter Text...'} />
        {
          user && user?.freeToken == 0 ?
            <p className='font-montserrat text-2xl text-red-600 text-center font-semibold w-full'>!!! Free Token Is Over</p>
            :
            <button onClick={() => handleSubmit()} className={`w-[200px] mt-2 px-2 py-2 border border-black rounded-lg`}>
              <p className='font-montserrat text-xl text-black text-center w-full font-normal '>Genrate Message</p>
            </button>
        }
        
      </div>
      <div className="allMessage w-full h-full p-3 mt-2">
        <div className='flex flex-row justify-between'>
          <h2 className='medium-text text-3xl font-semibold mb-6'>Your All Conversations : {messages && messages.length ? messages.length : 0}</h2>
          {messageLoading === true ?
            <span className='cursor-pointer ml-2'>
              <img src={Wait} alt='chat' className='w-[25px] h-[25px]' />
            </span> : messageLoading === false &&
            <span className='cursor-pointer ml-2' onClick={() => handleGetMessage()}>
              <img src={Reload} alt='chat' className='w-[25px] h-[25px]' />
            </span>
          }
        </div>
        <div className='w-full h-[80%] max-sm:max-h-[480px] max-md:max-h-[560px] max-lg:max-h-[700px] md:h-[65%] overflow-y-scroll overflow-x-hidden p-1'>
          {messages && messages.data && messages.data.length ? messages.data.map((message, index) => {
            return (
              <div key={index} className='messageBox w-[98%] h-auto flex flex-col p-5 m-[2%] bg-slate-100 rounded-lg'>
                <div className='question medium-text flex flex-row justify-between items-start mb-3'>
                  <p>{index + 1}. {message.question}</p>
                  <button className='w-[20px] h-[20px] float-right' onClick={() => removeMsg(message._id)}>
                    <img src={Delete} alt='delete' />
                  </button>
                </div>
                <div className='answer indent-8 text-justify'>
                  <p>{message.answer && message.answer.choices[0].message.content}</p>
                </div>
              </div>
            )
          }) : ''}
        </div>
      </div>
    </div>
  )
}

export default Chat