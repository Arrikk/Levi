import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const editUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (
    { id, formDetails: updatedUserData, toast, router },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.editUserProfile(updatedUserData, id)
      toast.success('Profile Updated Successfully')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const getUser = createAsyncThunk(
  'profile/getUserProfile',
  async ({ rejectWithValue }) => {
    try {
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const profileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    username: '',
    display_name: '',
    bio: '',
    location: '',
    phone_number: '',
    website_url: '',
    avatar: '',
    amazon_url: '',
    error: '',
    loading: false,
  },

  extraReducers: {
    [editUserProfile.pending]: (state) => {
      state.loading = true
    },
    [editUserProfile.fulfilled]: (state, action) => {
      state.loading = false
      console.log('action', action)
      const {
        arg: { id },
      } = action.meta

      console.log(arg)

      if (id) {
        state = action.payload
      }
    },
    [editUserProfile.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload[0]
    },
  },
})

export default profileSlice.reducer
