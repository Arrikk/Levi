import { RefreshIcon } from '@heroicons/react/outline'
import { TweetBox } from './index'
import { useSelector } from 'react-redux'
import FeedsItem from './feeds/FeedsItem'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BeatLoader } from "react-spinners";


const Feeds = () => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const [feeds, setFeeds] = useState([])
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
        setLoading(true)
        const fetchFeeds = async () => {
          const res = await axios('feed/')
          setFeeds(res.data)
          setLoading(false)
        }

        fetchFeeds()
      }, [user])

  return (
    <div className="col-span-10 border-x sm:col-span-9 md:col-span-8 lg:col-span-5">
      <div className="flex items-center justify-between pb-4 sticky -top-1 z-10 border-b bg-white dark:bg-[#111827]">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon className="mr-5 mt-5 h-8 w-8 cursor-pointer text-leviplatte transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>

      {/* TWEET_BOX */}
      <TweetBox />

      {loading && (
        <div className="h-[400px] flex justify-center items-center">
          <BeatLoader loading={loading} color="#000229" />
        </div>
      )}
      {feeds && feeds?.map((feed, idx) => <FeedsItem feed={feed} key={idx} />)}
    </div>
  )
}

export default Feeds