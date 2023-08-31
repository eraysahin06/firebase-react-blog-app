import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { RxPencil2 } from 'react-icons/rx';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';
//Components
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

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
        <div className="logo">
          <Link className="logo-btn" to={'/'}>
            <RxPencil2 className="pencil-logo" />
            Logic<span>Blog</span>
          </Link>
        </div>
        {!isAuth ? (
          <Link to={'/login'}>Login </Link>
        ) : (
          <div>
            <Link className="create-btn" to={'/createpost'}>
              Add Post +
            </Link>
            <button className="logout-btn" onClick={signUserOut}>
              Log out
            </button>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </div>
  );
}

export default App;
