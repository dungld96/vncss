import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  userId: string
}

const initialState: User = {
  userId: ''
}

const blogSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startEditPost: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    cancelEditPost: (state) => {
      state.userId = ''
    }
  }
})

const blogReducer = blogSlice.reducer
export const { cancelEditPost, startEditPost } = blogSlice.actions
export default blogReducer