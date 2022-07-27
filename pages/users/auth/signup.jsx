import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import { Button, InputBox } from '../../../components'
import { register } from '../../../redux/features/auth.slice'

const AuthPage = () => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = formData
  const dispatch = useDispatch()
  const router = useRouter()
  const { user, error, loading } = useSelector((state) => ({ ...state.auth }))

  const handleChange = (e) => {
    const { name, value } = e.target
    setformData({ ...formData, [name]: value })
  }

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name == '' || email == '' || password == '') {
      return toast.error('Please all fields are required', { autoClose: 3000, })
    }

    if (email && password) {
      dispatch(register({ formData, router, toast }))
    }
  }

  return (
    <main className="grid h-screen grid-cols-2">
      <div className="hidden bg-leviplatte sm:inline-flex">
        <h1>Leviplatte</h1>
        <h2>Sign up to support your favorite creators</h2>
      </div>

      <div className="col-span-2 bg-black p-4 sm:col-span-1">
        <div className="mx-auto mt-28 max-w-lg">
          <h1 className="font-bold text-white">Create your account</h1>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <InputBox
              onChange={handleChange}
              placeholder="Name"
              type="text"
              color="white"
              name="name"
              value={name}
            />
            <InputBox
              onChange={handleChange}
              placeholder="Email"
              type="email"
              color="white"
              name="email"
              value={email}
            />
            <InputBox
              onChange={handleChange}
              placeholder="Password"
              type="password"
              color="white"
              name="password"
              value={password}
            />
            <Button
              text={loading ? 'Creating Account...' : 'Create Account'}
              bgColor="leviplatte"
              textColor="white"
            />
          </form>

          <div className="flex flex-col items-center justify-between py-6 text-center text-leviplatte sm:flex-row">
            <Link href="/users/reset">
              <span className="cursor-pointer">Forgot Password?</span>
            </Link>

            <Link href="/users/auth/signin">
              <span className="cursor-pointer">Already have an account? </span>
            </Link>
          </div>
          {/* <Button
            text="sign up with twitter"
            bgColor="leviplatte"
            textColor="white"
          />
          <Button
            text="sign up with google"
            bgColor="leviplatte"
            textColor="white"
          /> */}
        </div>
      </div>
    </main>
  )
}

export default AuthPage
