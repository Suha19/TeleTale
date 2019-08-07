import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const Createprofile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    position: '',
    location: ''
  });

  const { age, gender, position, location } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> let people get to know me better
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Age'
            name='age'
            value={age}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Remember, age is just a number.</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Position'
            name='position'
            value={position}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Give us an idea of what you do?</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            City & state suggested (eg. Houston, TX)
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Gender'
            name='gender'
            value={gender}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Female Male or Other</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

Createprofile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(Createprofile));
