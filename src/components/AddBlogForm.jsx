import { useState } from 'react'

const AddBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [ url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new blog</h2>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          placeholder='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          placeholder='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="Url"
          placeholder='Url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>Add blog</button>
    </form>
  )
}
export default AddBlogForm
