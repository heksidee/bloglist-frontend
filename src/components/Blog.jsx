import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLikes, deleteBlog } from '../redux/blogSlice';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const currentBlog = blogs.find((b) => b.id === blog.id);
  const user = useSelector((state) => state.user);
  const isOwner = blog.user?.id === user?.id;

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikes = () => {
    dispatch(updateLikes(currentBlog));
  };

  const handleDelete = async () => {
    const confirm = window.confirm(`Sure you want to delete blog ${blog.title} by ${blog.author}?`);
    if (confirm) {
      dispatch(deleteBlog(blog.id));
    }
  };

  return (
    <div className={'playwrightblog'} style={blogStyle}>
      {showDetails ? (
        <>
          <div>
            {blog.title} {blog.author}
            <button onClick={() => setShowDetails(false)}>Hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            {`Likes: ${currentBlog.likes}`}
            <button onClick={handleLikes}>Like</button>
          </div>
          <div>Added by: {blog.user?.username || 'unknown'} </div>
          {isOwner && <button onClick={handleDelete}>Delete</button>}
        </>
      ) : (
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShowDetails(true)}>View</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
