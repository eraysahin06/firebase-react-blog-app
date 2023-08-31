import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuth }) => {
  const navigation = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigation('/');
    });
  };

  return (
    <div className="loginPage">
      <p>Sign in with Google to proceed</p>
      <button onClick={handleGoogleSignIn} className="login-with-google-btn">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
