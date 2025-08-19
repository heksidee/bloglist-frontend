import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from "./components/Notification"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      setNotification({ message: `User ${username} logged in`, type: "success" })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    } catch (error) {
      setNotification({ message: "wrong username or password", type: "error" })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle("")
      setAuthor("")
      setUrl("")
      setNotification({ message: `a new blog "${title}" by ${author} added`, type: "success" })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    } catch (error) {
      setNotification({ message: "Blog creation failed", type: "error" })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const blogForm = () => (
    <>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
  const createForm = () => (
    <form onSubmit={handleCreate}>
      <div>
        title
        <input
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
        type="text"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>Add blog</button>
    </form>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && 
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {createForm()}
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App