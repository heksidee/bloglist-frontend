import { render, screen } from '@testing-library/react'
import Blog from "./Blog"
import { expect } from 'vitest'

test("renders title and author but not url or likes", () => {
    const blog = {
        title: "Space Travel",
        author: "Michael Pollock",
        url: "www.cosmictravel.com",
        likes: 5,
        user: {
            username: "Albo",
            id: "123"
        }
    }

    render(<Blog blog={blog} user={{ username: "Albo", id: "123" }} />)

    expect(screen.getByText((content) =>
        content.includes('Space Travel') && content.includes('Michael Pollock')
    )).toBeInTheDocument()


    expect(screen.queryByText("www.cosmictravel.com")).not.toBeInTheDocument()
    expect(screen.queryByText(/likes/i)).not.toBeInTheDocument()
})