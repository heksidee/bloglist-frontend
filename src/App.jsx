import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from "./components/Notification"
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sorted = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sorted)
    }) 
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
      const response = await loginService.login({
        username, password,
      })

      const user = {
        username: response.username,
        name: response.name,
        token: response.token,
        id: response.id
      }

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

  const handleCreate = async (blog) => {
    
    try {
      const returnedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(returnedBlog))
      setNotification({ message: `a new blog "${blog.title}" by ${blog.author} added`, type: "success" })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
      blogFormRef.current.toggleVisibility()
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
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
    </>
  )
  
  const blogFormRef = useRef()

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && 
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <AddBlogForm onCreate={handleCreate}/>
          </Togglable>
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App