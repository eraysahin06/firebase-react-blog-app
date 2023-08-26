import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';
//Components
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate('/login');
    });
  };

  return (
    <div>
      <nav>
        <Link to={'/'}>Home </Link>
        {!isAuth ? (
          <Link to={'/login'}>Login </Link>
        ) : (
          <>
            <Link to={'/createpost'}>Create Post </Link>
            <button onClick={signUserOut}>Log out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </div>
  );
}

export default App;
