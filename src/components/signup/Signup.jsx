import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const navigate = useNavigate();
  const password = watch('password');
  const [err, setErr] = useState(''); // State to handle server-side errors

  // Handle form submission
  const handleSignup = async (data) => {
    try {
      // Simulating backend call to register user
      let response = await fetch('http://localhost:4000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      let result = await response.json();

      if (result.message === 'User registered successfully') {
        // If registration is successful, navigate to login page
        navigate('/login');
      } else {
        // Handle server-side error
        setErr(result.message);
      }
    } catch (error) {
      // Set error state if there is a network or server error
      setErr('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(handleSignup)}>
        <h2>Sign Up</h2>

        {/* Server-side error */}
        {err && <p className="error">{err}</p>}

        {/* Username Field */}
        <div>
          <label>Username</label>
          <input
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              }
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long'
              }
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match'
            })}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>

        {/* Mobile Number Field */}
        <div>
          <label>Mobile Number</label>
          <input
            type="tel"
            {...register('mobileNumber', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Mobile number must be 10 digits'
              }
            })}
          />
          {errors.mobileNumber && <p className="error">{errors.mobileNumber.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit">Sign Up</button>

        {/* Sign Up Error Message */}
        {err && <p className="error">{err}</p>}
      </form>
    </div>
  );
}

export default Signup;
