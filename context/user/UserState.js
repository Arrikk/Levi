import userContext from './userContext'
import userReducer from './userReducer'
import { useReducer } from 'react'
import {
  GET_USER,
  LOGIN_USER,
  SET_ERROR,
  SET_LOADING,
  UPDATE_SUCCESS,
  LOGIN_FAILED,
  UPDATE_FAILED,
  SWITCH_DISPLAY,
  SUBSCRIPTION_SETTINGS
} from './../types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const UserState = (props) => {
  const defaultState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    message: null,
  }

  const router = useRouter()

  const [state, dispatch] = useReducer(userReducer, defaultState)

  // Get user Data
  const getUser = async () => {
    try {
      let res = await axios.get('my/profile')
      dispatch({
        type: GET_USER,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response?.data?.error && err.response.data.error,
      })
      !state.loading && router.push('/users/auth/signin')
    }
  }

  const resetLoading = () => {
    dispatch({
      type: SET_LOADING,
    })
  }

  const loginUser = async (data) => {
      resetLoading()
    try {
      let res = await axios.post('user/login', data)
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: err.response?.data
      })
      err.response?.data && toast.error(err.response?.data)
    }
  }

  const updateUser = async (data) => {
    resetLoading()
    try {
      let res = await axios.post(`profile/update/${state.user?.userId}`, data)
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data,
      })
      toast.success('Profile Updated')
    } catch (error) {
      dispatch({
        type: UPDATE_FAILED,
        payload: error.response.data && error.response.data,
      })
    }
  }

  const fetchUser = () => {
    if(state.isAuthenticated){
      state.loading = true
      state.loading = false
    }
  }

  const switchTheme = async () => {
    try {
      let res = await axios.post('settings/display', { id: state.user?.userId })
      console.log(res.data)
      dispatch({
        type: SWITCH_DISPLAY,
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.response?.data.error && error.response.data.error,
      })
      error.response?.data.error && toast.error(error.response.data.error)
    }
  }

  const updateSubscriptionSettings = (amount) => {
      resetLoading()
    axios.post('subscription/set', {amount}).then(res => {
        dispatch({
            type: SUBSCRIPTION_SETTINGS,
            payload: amount
        })
        toast.success("Successfully set $"+amount)
    }).catch(err => {
        dispatch({
            type: SET_ERROR,
            payload: ''
        })
        err.response?.data?.error && toast.error(err.response.data.error)
    })
  }
  const updatePassword = (password) => {
      resetLoading()
      state.error = null
    axios.post('password/change', password).then(res => {
        state.loading = false
        toast.success("Password successfully changed")
    }).catch(err => {
        dispatch({
            type: SET_ERROR,
            payload: err.response?.data && err.response?.data?.error
        })
        err.response?.data?.error && toast.error(err.response.data.error)
    })
  }

  return (
    <userContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        getUser,
        updateUser,
        switchTheme,
        updateSubscriptionSettings,
        updatePassword,
        fetchUser
      }}
    >
      {props.children}
    </userContext.Provider>
  )
}

export default UserState
