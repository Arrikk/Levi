import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/auth.slice'
import settingsReducer from './features/settings.slice'

export default configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer
  },
})
