import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/add-Post' className='btn btn-light'>
        <i className='fas fa-pencil-alt text-primary' /> Write a Story
      </Link>
    </div>
  );
};

export default DashboardActions;
