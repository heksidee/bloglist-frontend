import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import Home from './components/Home';
import Users from './components/Users';
import User from './components/User';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification, clearNotification } from './redux/notificationSlice';
import { fetchBlogs, createBlog } from './redux/blogSlice';
import { loginUser, restoreUser } from './redux/userSlice';
import { fetchUsers } from './redux/usersSlice';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const notify = (message, type = 'success') => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser({ username, password }));
      setUsername('');
      setPassword('');
      notify(`User ${username} logged in`, 'success');
    } catch (error) {
      notify('wrong username or password', 'error');
    }
  };

  const handleCreate = async (blog) => {
    try {
      await dispatch(createBlog(blog));
      notify(`a new blog "${blog.title}" by ${blog.author} added`, 'success');
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      notify('Blog creation failed', 'error');
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const blogFormRef = useRef();

  return (
    <div>
      <Navbar />
      <h2>Blog App</h2>
      <Notification />
      <Routes>
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            !user ? (
              loginForm()
            ) : (
              <Home user={user} blogFormRef={blogFormRef} handleCreate={handleCreate} />
            )
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
