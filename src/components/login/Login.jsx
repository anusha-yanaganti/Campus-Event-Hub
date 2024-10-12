import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { userLoginContext } from '../../contexts/userLoginContext'; // Import context
import './Login.css';

function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { loginUser, error } = useContext(userLoginContext); // Access the login context
  const navigate = useNavigate(); // React Router navigation
  const [loginError, setLoginError] = useState(''); // State to store login error
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role') || 'student'; // Role comes from query string

  // Function to handle login form submission
  const handleLogin = async (data) => {
    const emailDomain = data.email.split('@')[1];

    // Email validation based on role (admin or student)
    if (role === 'student' && emailDomain !== 'pvpsit.ac.in') {
      setLoginError('Please use a valid student email');
      return;
    } else if (role === 'admin' && emailDomain !== 'pvpsiddhartha.ac.in') {
      setLoginError('Please use a valid admin email');
      return;
    }



    // Backend API call to handle login
    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:data.email, password:data.password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Save token to localStorage and context
       localStorage.setItem('token', result.token);
        //localStorage.setItem('token', response.data.token); // Storing the token after login

        // Set the logged-in user in the context
        loginUser({ email: data.email, role, token: result.token });

        // Navigate based on the user's role
        if (role === 'student') {
          navigate('/events/StudentDashboard');
        } else if (role === 'admin') {
          navigate('/events/AdminDashboard');
        }
      } else {
        setLoginError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
      console.error('Login Error: ', error);
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
