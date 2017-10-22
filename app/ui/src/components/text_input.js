import React, { Component } from 'react';
import PropTypes from 'prop-types';


const TextInput  = ({
  label,
  value,
  onChange,
  errorMessage
}) =>
  <div className='form-group'>
    <label htmlFor="">{label}</label>
    <input
      className={`form-control ${(errorMessage !== '') ? 'is-invalid' : ''}`}
      type="text" 
      value={value} 
      onChange={onChange}/>
    <div className="invalid-feedback">{errorMessage}</div>
  </div>

TextInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  errorMessage: PropTypes.string
}

export default TextInput;