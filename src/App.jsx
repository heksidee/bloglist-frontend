import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import AddBlogForm from './components/AddBlogForm';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification, clearNotification } from './redux/notificationSlice';
import { fetchBlogs, createBlog } from './redux/blogSlice';
import { loginUser, logout, restoreUser } from './redux/userSlice';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(restoreUser());
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

  const handleLogout = () => {
    dispatch(logout());
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

  const blogForm = () => (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  const blogFormRef = useRef();

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <AddBlogForm onCreate={handleCreate} />
          </Togglable>
          {blogForm()}
        </div>
      )}
    </div>
  );
};

export default App;
