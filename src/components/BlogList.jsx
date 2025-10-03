import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.items);

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
