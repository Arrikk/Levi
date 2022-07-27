import axios from 'axios'

const API = axios.create({ baseURL: 'https://certify.baremind.co.za' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

export const signIn = (formData) => API.post('/user/login', formData)

export const register = (formData) => API.post('/user/create', formData)

export const editUserProfile = (formData, userId) =>
  API.post(`/user/update/${userId}`, formData)
