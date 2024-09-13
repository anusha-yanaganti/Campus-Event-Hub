import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { userLoginContext } from '../../contexts/userLoginContext';
import './Login.css';

function Login() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role') || 'student'; // Default to 'student' role
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { loginUser, error } = useContext(userLoginContext); // Access context
  const navigate = useNavigate(); // Use navigate here, in the component
  const [loginError, setLoginError] = useState(''); // State to store error message

  const handleLogin = async (data) => {
    const emailDomain = data.email.split('@')[1];

    // Validate role-based email domains
    if (role === 'student' && emailDomain !== 'pvpsit.ac.in') {
      setLoginError('Please use a valid student email');
      return;
    } else if (role === 'admin' && emailDomain !== 'pvpsiddhartha.ac.in') {
      setLoginError('Please use a valid admin email');
      return;
    }

    // Simulate login, call loginUser, and handle response
    const loginSuccessful = await loginUser({ ...data, role });

    if (!loginSuccessful) {
      // Check if the error is due to non-existent user or incorrect credentials
      setLoginError('Invalid email or password. If you are a new user, please sign up.');
    } else {
      // Clear error and navigate based on the role
      setLoginError('');
      if (role === 'student') {
        navigate('/events');
      } else if (role === 'admin') {
        navigate('/events');
      }
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit(handleLogin)}>
        {/* Email Field */}
        <div>
          <label>Email ID</label>
          <input 
            type="email" 
            {...register('email', { 
              required: 'Email ID is required', 
              pattern: { 
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
                message: 'Invalid email format' 
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
            {...register('password', { required: 'Password is required' })} 
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Login Error Display */}
        {loginError && <p className="error">{loginError}</p>}

        {/* Submit Button */}
        <button type="submit">Login</button>
      </form>

      {/* Sign-Up Prompt */}
      <p className="signup-prompt">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
