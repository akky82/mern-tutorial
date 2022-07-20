import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset, updateUser } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FaUserCog } from 'react-icons/fa'

function Profile() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    location: ''
  })

  const { email, password, password2, location } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/profile')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  if(isLoading) {
    return <Spinner />
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        email,
        password,
        location,
      }

      dispatch(updateUser(userData))
      
      toast.success("Details updated!")
    }
  }

  return (
    <>            
      <section className="heading">
        <h1>
          <FaUserCog /> Edit Profile
        </h1>
        <p>Change account details below</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control" 
              id="email"
              name="email"
              value={email}
              placeholder="Enter new email" 
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control" 
              id="password"
              name="password"
              value={password}
              placeholder="Enter new password" 
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control" 
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm new password" 
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control" 
              id="location"
              name="location"
              value={location} 
              placeholder="Enter new location" 
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Profile