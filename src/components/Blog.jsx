import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const isOwner = blog.user?.id === user?.id

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = async () => {
    const updatedBlog = await blogs.updateLikes(blog.id, likes + 1)
    setLikes(updatedBlog.likes)
  }

  const handleDelete = async () => {
    const confirm = window.confirm(`Sure you want to delete blog ${blog.title} by ${blog.author}?`)
    if (confirm) {
      await blogs.remove(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {showDetails ? (
        <>
          <div>
            {blog.title} {blog.author}
            <button onClick={() => setShowDetails(false)}>Hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            {`Likes: ${likes}`}
            <button onClick={handleLikes}>Like</button>
          </div>
          <div>Added by: {blog.user?.username || 'unknown'} </div>
          {isOwner && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </>
      ) : (
        <div className={"playwrightblog"}>
          {blog.title} {blog.author}
          <button onClick={() => setShowDetails(true)}>View</button>
        </div>
      )}
    </div>
  )
}

export default Blog