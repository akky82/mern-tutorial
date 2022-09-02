import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Update user details
const updateUser = async (userData, token) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  // console.log(user)
  const response = await axios.put(API_URL + user._id, userData, config)
  // console.log(response)
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  updateUser,
  login,
  logout,
}

export default authService