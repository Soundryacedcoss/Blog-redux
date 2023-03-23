import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPost = createAsyncThunk("fetchPost/fetch", async () => {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
  console.log(data);
  return data;
});
const postSlice = createSlice({
  name: "fetchPost",
  initialState: {
    post: [],
    loader: false,
    msg: "",
    user: [],
    comment: [],
  },
  reducers: {
    addAccount: (state, action) => {
      if (JSON.parse(localStorage.getItem("userAccount") !== null)) {
        state.user = JSON.parse(localStorage.getItem("userAccount"));
      }
      state.user = action.payload;
      localStorage.setItem("userAccount", JSON.stringify(state.user));
    },
    like: (state, action) => {
      console.log(state.post);
      for (let i = 0; i < state.post.length; i++) {
        if (
          action.payload === state.post[i].id &&
          state.post[i].liked === false
        ) {
          state.post[i].liked = true;
        } else if (
          action.payload === state.post[i].id &&
          state.post[i].liked === true
        ) {
          state.post[i].liked = false;
        }
      }
      localStorage.setItem("AllBlog", JSON.stringify(state.post));
    },
    deletePost: (state, action) => {
      for (let i = 0; i < state.post.length; i++) {
        if (state.post[i].id === action.payload) {
          state.post.splice(i, 1);
        }
      }
      localStorage.setItem("AllBlog", JSON.stringify(state.post));
    },
    editPost: (state, action) => {},
    commentHandler: (state, action) => {
      state.post = JSON.parse(localStorage.getItem("AllBlog"));
      for (let i = 0; i < state.post.length; i++) {
        if (state.post[i].id === action.payload.id) {
          state.comment.push(action.payload);
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state) => {
      state.loader = true;
      state.msg = "pending";
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      // state.post = action.payload;
      state.loader = false;
      state.msg = "done";
      console.log(action.payload);
      action.payload.posts.forEach((element) => {
        var obj = {
          id: element.id,
          title: element.title,
          body: element.body,
          liked: false,
          comment: false,
        };
        state.post.push(obj);
      });
      state.post = [...state.post];
      localStorage.setItem("AllBlog", JSON.stringify(state.post));
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.msg = "Error occured !";
      state.loader = false;
    });
  },
});

export default postSlice.reducer;
export const { addAccount, deletePost, like, commentHandler } =
  postSlice.actions;
