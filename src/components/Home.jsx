import BlogList from './BlogList';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';

const Home = ({ user, blogFormRef, handleCreate }) => {
  return (
    <>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <AddBlogForm onCreate={handleCreate} />
      </Togglable>
      <BlogList />
    </>
  );
};

export default Home;
