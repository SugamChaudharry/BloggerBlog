import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PublishedBlogs: [],
  DraftBlogs: [],
  Blog: {},
  ExploreBlogs: [],
};

const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers:{}, 
});
