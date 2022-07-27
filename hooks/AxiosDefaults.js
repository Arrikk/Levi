import axios from 'axios'
import { APIURL } from './useDate'

export const axiosDefaults = () => {
  const token =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('profile') || null)
    : null
    if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`
    } 
  axios.defaults.baseURL = APIURL
}