import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// import * as api from '../api'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    value: 'profile',
  },
  reducers: {
    updateSettings: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateSettings } = settingsSlice.actions

export default settingsSlice.reducer
