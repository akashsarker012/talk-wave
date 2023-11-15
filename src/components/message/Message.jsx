import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Search from '../search/Search';
import Group from '../group/Group';
import Friend from '../friend/Friend';

const Message = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const data = useSelector(state => state.userLoginInfo.userInfo);

  useEffect(() => {
    if (!data) {
      navigate('/login');
      setLoading(false);
    } else {
      onAuthStateChanged(auth, (user) => {
        (user.emailVerified && setVerify(true)) || setLoading(false);
        
          dispatch(userLoginInfo(user));
          localStorage.setItem("userLoginInfo", JSON.stringify(user));
      });
    }
  }, [auth, data, dispatch, navigate]);
  return (
    <div>
      <div className='flex'>
      
      <div><Sidebar active='message'></Sidebar></div>
      <div className='flex flex-wrap sm:ml-[186px] mt-2 gap-x-3'>
      <div>
       <Friend></Friend>
      </div>
      </div>
     </div>
    </div>
  )
}

export default Message
