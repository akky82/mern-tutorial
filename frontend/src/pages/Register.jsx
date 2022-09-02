import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset, register } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import Search from '../components/Search'
import { FaUser } from 'react-icons/fa'


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    location: '',
  })

  const { name, email, password, password2, location } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const handleOnSearchChange = (searchData) => {
    console.log(searchData)
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
        location,
      }

      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>            
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control" 
              id="name"
              name="name"
              value={name} 
              placeholder="Enter your name" 
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control" 
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email" 
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control" 
              id="password"
              name="password" value={password}
              placeholder="Enter a password" 
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control" 
              id="password2"
              name="password2" value={password2}
              placeholder="Confirm password" 
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
            <Search onSearchChange={handleOnSearchChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register