import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loader:true
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.unshift(action.payload)
        },
        updatePost: (state, action) => {
            const { id, title, body,userId } = action.payload;
            if (!id || !title || !body) return; // Validate data
            
            const postIndex = state.posts.findIndex(post => post.id === id);
            if (postIndex !== -1) {
                state.posts[postIndex] = { id, title, body,userId };
            }
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
        setPosts:(state, action) => {
            state.posts =  action.payload;
        },
        updateLoader:(state, action) => {
            state.loader =  action.payload;
        }
    },
});

export const { addPost, updatePost, deletePost,setPosts,updateLoader } = postSlice.actions;
export default postSlice.reducer;
