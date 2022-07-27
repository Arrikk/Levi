import { useState, useEffect, useContext } from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import { TweetBox } from './index'
import { useSelector } from 'react-redux'
import FeedsItem from './feeds/FeedsItem'
import axios from 'axios'
import { useRouter } from "next/router"
import profileContext from './../context/profile/profileContext';
import userContext from './../context/user/userContext'
import { BeatLoader } from "react-spinners";


const ProfileMedia = () => {
  const {feedLoading, loading: profileLoading, feeds: profileFeeds} = useContext(profileContext)

  const [feeds, setFeeds] = useState([])
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathName = router.pathname

  useEffect(() => {
    // const otherUser = JSON.parse(localStorage.getItem('otherProfile'))
    const { data } = JSON.parse(localStorage.getItem('userProfile'))
    setLoading(true)

    const fetchFeeds = async () => {
      if(pathName === "/my/profile") {
        const res = await axios(`my/feeds?agent=${data?.userId}`)
        setFeeds(res.data)
      } else {
        setFeeds(profileFeeds)
      }
      setLoading(false)
    }

    fetchFeeds()
  }, [feedLoading, profileLoading])

  return (
    <div>
      <div className="flex cursor-pointer items-center p-3">
        <div className="flex-[0.5] border-b-2 border-black text-center active:border-b-2 active:border-black dark:border-white">
          {' '}
          POSTS
        </div>
        <div className="flex-[0.5] text-center active:border-b-2 active:border-black">
          {' '}
          MEDIA
        </div>
      </div>

      <div>
        {loading && (
        <div className="h-[400px] flex justify-center items-center">
          <BeatLoader loading={loading} color="#000229" />
        </div>
      )}
        {feeds && feeds.length !== 0 && feeds?.map((feed, idx) => <FeedsItem feed={feed} key={idx} />)}
        {feeds && feeds.length === 0 && <h1 className="p-4 text-center"> No Post available at the moment </h1>}
      </div>
    </div>
  )
}

export default ProfileMedia
