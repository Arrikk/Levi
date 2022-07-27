import { useEffect } from 'react'
import Head from 'next/head'
import { Widgets, Layout, Feeds, Suggestions } from '../components'
import { setUser, isLoggedIn } from '../redux/features/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import axios from 'axios'

const Home = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state.auth }))

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(setUser(isLoggedIn().token) || user)
    }

    axios
      .get('user')
      .then((data) => {
        localStorage.setItem('userProfile', JSON.stringify(data))
      })
      .catch((err) => console.log('An error occured'))

    if (!user && !isLoggedIn()) {
      toast.success('Please sign in to continue', { autoClose: 3000, })
      router.push('/users/auth/signin')
      return
    }
  }, [])

  return (
    <>
      <div>
        <Head>
          <title>LeviPlatte</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout>
          {/* FEEDS PAGE */}
          <Feeds />
          {/* SEARCH */}
          <Widgets> 
            <Suggestions />
          </Widgets>
        </Layout>
      </div>
    </>
  )
}

export default Home
