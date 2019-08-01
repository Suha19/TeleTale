import React, { useEffect, Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    position: '',
    location: ''
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      age: loading || !profile.age ? '' : profile.age,
      position: loading || !profile.gender ? '' : profile.gender,
      gender: loading || !profile.position ? '' : profile.position,
      location: loading || !profile.location ? '' : profile.location
    });
  }, [loading, getCurrentProfile]);

  const { age, gender, position, location } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'> Create Your Profile </h1>{' '}
      <p className='lead'>
        <i className='fas fa-user' />
        let people get to know me better{' '}
      </p>{' '}
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Age'
            name='age'
            value={age}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'> Remember, age is just a number. </small>{' '}
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Position'
            name='position'
            value={position}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>
            {' '}
            Give us an idea of What you do ?{' '}
          </small>{' '}
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>
            City & state suggested(eg.Houston, TX){' '}
          </small>{' '}
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Gender'
            name='gender'
            value={gender}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'> Female Male or Other </small>{' '}
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back{' '}
        </Link>{' '}
      </form>{' '}
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  {
    createProfile,
    getCurrentProfile
  }
)(withRouter(EditProfile));
