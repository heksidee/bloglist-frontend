import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const blogs = useSelector((state) => state.blogs);

  const userBlogCounts = blogs.reduce((acc, blog) => {
    const user = blog.user;
    if (!user) return acc;

    const id = user.id;
    if (!acc[id]) {
      acc[id] = {
        id: user.id,
        username: user.username,
        name: user.name,
        count: 1,
      };
    } else {
      acc[id].count += 1;
    }
    return acc;
  }, {});

  const users = Object.values(userBlogCounts);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Added</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name || user.username}</Link>
              </td>
              <td>{user.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
