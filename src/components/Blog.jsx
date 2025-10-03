import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLikes, deleteBlog, addComment, setCommentDraft } from '../redux/blogSlice';

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blogs.items.find((b) => b.id === id));
  const user = useSelector((state) => state.user);
  const commentDraft = useSelector((state) => state.blogs.commentDraft);

  if (!blog) return <p>Blog not found</p>;
  const isOwner = blog.user?.id === user?.id;

  const handleLikes = () => {
    dispatch(updateLikes(blog));
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Sure you want to delete blog ${blog.title} by ${blog.author}?`);
    if (confirm) {
      dispatch(deleteBlog(blog.id));
      navigate('/blogs');
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(addComment({ blogId: blog.id, comment: commentDraft }));
  };

  return (
    <>
      <div className={'playwrightblog'}>
        <div>
          <h2>
            {blog.title} by {blog.author}
          </h2>
        </div>
        <div>{blog.url}</div>
        <div>
          {`Likes: ${blog.likes}`}
          <button onClick={handleLikes}>Like</button>
        </div>
        <div>Added by: {blog.user?.username || 'unknown'} </div>
        {isOwner && <button onClick={handleDelete}>Delete</button>}
      </div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
          <div>
            <label>
              comment
              <input
                type="text"
                value={commentDraft}
                onChange={(e) => dispatch(setCommentDraft(e.target.value))}
                placeholder="Write commment"
              />
            </label>
          </div>
          <button type="submit">Add comment</button>
        </form>
        {blog.comments && blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </>
  );
};

export default Blog;
