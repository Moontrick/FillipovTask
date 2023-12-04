import React, { useState, useRef,useEffect  } from 'react';
import { useNavigate, Navigate, NavLink  } from "react-router-dom";
import '../Profile/Profile.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletePhoto, getPhoto, setsecpassword } from '../../features/user';

function Profile() {
    
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { id } = useParams();
  return (
  
    <div className='ProfilePage'>
    {user && user.filter(res => res._id === id).map((res, index) => (
          
          <div className='search_center' key={index}>
            <p className='search_title'>{res._source.Title}</p>
            <p className='search_Time'>{res._source.Time}</p>
            <p className='search_Par1'>{res._source.Paragraph1}</p>
            
            {res._source.Player_img && (
              <img className='search_img' src={res._source.Player_img} alt='Player Image' />
            )}
            <p className='search_Par2'>{res._source.Paragraph2}</p>
            <p className='search_Par3'>{res._source.Paragraph3}</p>
            <p className='search_Author'>{res._source.Author}</p>
          </div>
        
      ))}
  </div>
  );
}

export default Profile;
