import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import {
  DotsHorizontalIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'

const MessageBox = () => {
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const imageRef = useRef()

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      setImage({
        image: URL.createObjectURL(img),
      })
    }
  }

  const onHandleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(message, image)
    setImage(null)
    setMessage('')
    toast.success('Submitted')
  }

  return (
    <div className="border-y p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="text"
            placeholder="Create a new Message"
            className="flex-1 bg-transparent pb-1 outline-none"
            name="message_text"
            onChange={onHandleChange}
            value={message}
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
          <button disabled={message==''} className="btn btn-warning rounded-full px-10">Send</button>

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
        <div className="relative w-1/4 h-10 mt-3">
          <div
            className="absolute right-2 top-2  cursor-pointer rounded-full bg-black p-1"
            onClick={() => setImage(null)}
          >
            <XIcon className=" h-3 w-3 text-white" />
          </div>
          <img
            src={image.image}
            alt=""
            className="max-h-20 w-full object-cover"
          />
        </div>
      )}
    </div>
  )
}

export default MessageBox
