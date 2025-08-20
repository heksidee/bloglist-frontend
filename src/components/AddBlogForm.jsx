import React from "react"

const AddBlogForm = ({
    handleCreate,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl
}) => {
    return (
        
        <form onSubmit={handleCreate}>
            <h2>Create new blog</h2>
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
}
export default AddBlogForm
    