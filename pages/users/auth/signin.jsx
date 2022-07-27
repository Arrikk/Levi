import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

// COMPONENTS
import { Button, InputBox } from '../../../components'
import { login } from '../../../redux/features/auth.slice'

const AuthPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => ({ ...state.auth }))
  const router = useRouter()

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  // HANDLE INPUT CHAGE
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email == '' || password == '') {
      return toast.error('Please all fields are required', {
        autoClose: 3000,
      })
    }

    if (email && password) {
      dispatch(login({ formData, router, toast }))
    }
  }

  return (
    <main className="grid h-screen grid-cols-2">
      <div className="hidden bg-leviplatte p-20 sm:flex sm:flex-col sm:items-end lg:pt-40 lg:pr-40">
        <h1 className="text-5xl font-bold">Leviplatte</h1>
        <h2 className="text-3xl">Sign up to support your favorite creators</h2>
      </div>
      <div className="col-span-2 bg-black p-4 sm:col-span-1">
        <div className="mx-auto mt-28 max-w-lg">
          <h1 className="font-bold text-white">Login</h1>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <InputBox
              value={email}
              placeholder="Email"
              type="email"
              color="white"
              name="email"
              onChange={handleChange}
            />
            <InputBox
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              color="white"
            />
            <button
              className={`${loading && 'loading'
                } btn btn-block bg-leviplatte font-bold capitalize`}
            >
              {loading ? '' : 'SIGN IN'}
            </button>
          </form>

          <div className="py-6 text-center text-leviplatte">
            <Link href="/users/reset">
              <span className="mr-6 cursor-pointer">Forgot Password?</span>
            </Link>

            <Link href="/users/auth/signup">
              <span className="cursor-pointer">Sign up for Leiplatte</span>
            </Link>
          </div>
          {/* <Button
            text="sign in with twitter"
            bgColor="leviplatte"
            textColor="white"
          />
          <Button
            text="sign in with google"
            bgColor="leviplatte"
            textColor="white"
          /> */}
        </div>
      </div>
    </main>
  )
}

export default AuthPage
