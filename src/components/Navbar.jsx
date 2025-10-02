import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const padding = {
    padding: '1rem',
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <div>
      {user && (
        <>
          <Link style={padding} to="/blogs">
            Blogs
          </Link>
          <Link style={padding} to="/users">
            Users
          </Link>
          <span style={padding}>{user.username} logged in</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
