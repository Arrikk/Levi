import { useState, useRef, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import {
  DotsHorizontalIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'
import axios from "axios"
import userContext from './../context/user/userContext';

const TweetBox = () => {
  const [userId, setUserId ] = useState()
  const [loading, setLoading ] = useState(false)
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const [tweet, setTweet] = useState('')
  const imageRef = useRef()

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem('userProfile'));
  setUserId(user?.data?.userId)
}, []);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      let img = e.target.files[0]
      setImage({
        image: URL.createObjectURL(img),
      })
    }
  }

  const onHandleChange = (e) => {
    const { value } = e.target
    setTweet(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formD =  new FormData()
    formD.append('image', file)
    formD.append('text', tweet)
    formD.append('id', userId)

    setLoading(true)

    const createFeed = async () => {
      try{
        await axios.post(`feed/create`, formD)
        setImage(null)
        setTweet('')
        setLoading(false)
        location.reload()
      }catch(err) {
        toast.error(err.response.data.error, { autoClose: 1500 })
        setLoading(false)
      }
      
    }
    createFeed()
  }

  return (
    <div className="border-y p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <textarea
            type="text"
            placeholder="Compose new post"
            className="flex-1 bg-transparent pb-8 outline-none"
            name="tweet_text"
            onChange={onHandleChange}
            value={tweet}
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div
            className="inline-flex cursor-pointer"
            onClick={() => imageRef.current.click()}
          >
            <PhotographIcon className=" h-6 w-6  text-gray-400" type="file" />
            <span className="mr-4 pl-1">Image</span>
            {/* <input type="file" name="" id="" /> */}
            <DotsHorizontalIcon className="h-6 w-6 cursor-pointer rounded-full text-gray-400 hover:bg-gray-100 hover:text-leviplatte" />
          </div>
          <button className={`${loading && 'loading'} btn btn-warning`}>{loading ? '' : "Post"}</button>

          <input
            type="file"
            name="image"
            ref={imageRef}
            onChange={onImageChange}
            className="hidden"
          />
        </div>
      </form>
      {image && (
        <div className="relative mt-3">
          <div
            className="absolute right-2 top-2 cursor-pointer rounded-full bg-black p-2"
            onClick={() => setImage(null)}
          >
            <XIcon className=" h-6 w-6 text-white" />
          </div>
          <img
            src={image.image}
            alt=""
            className="max-h-96 w-full object-cover"
          />
        </div>
      )}
    </div>
  )
}

export default TweetBox
