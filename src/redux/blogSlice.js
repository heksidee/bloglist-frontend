import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

export const fetchBlogs = createAsyncThunk('blogs/fetchAll', async () => {
  const blogs = await blogService.getAll();
  return blogs.sort((a, b) => b.likes - a.likes);
});

export const createBlog = createAsyncThunk('blogs/create', async (blog) => {
  const newBlog = await blogService.create(blog);
  return newBlog;
});

export const deleteBlog = createAsyncThunk('blogs/delete', async (id) => {
  await blogService.remove(id);
  return id;
});

export const updateLikes = createAsyncThunk('blogs/updateLikes', async (blog) => {
  const updated = await blogService.updateLikes(blog.id, blog.likes + 1);
  return updated;
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (_, action) => action.payload)
      .addCase(createBlog.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateLikes.fulfilled, (state, action) => {
        return state.map((blog) => (blog.id === action.payload.id ? action.payload : blog));
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        return state.filter((blog) => blog.id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
