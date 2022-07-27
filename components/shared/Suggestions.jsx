import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  DotsVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid'
import axios from 'axios'

const Suggestions = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(3)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const fetchSuggestions = async () => {
      const res = await axios('suggestions')
      setSuggestions(res.data)
    }
    fetchSuggestions()
  }, [])

  const handleNext = () => {
    if (endIndex < suggestions.length) {
      setEndIndex(endIndex + 3)
      setStartIndex(startIndex + 3)
    }
  }

  const handlePrevious = (index) => {
    if (startIndex >= 3) {
      setStartIndex(startIndex - 3)
      setEndIndex(endIndex - 3)
    }
  }

  return (
    <div className="mb-6 rounded-md border p-3">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">SUGGESSTIONS</h1>
        <div className="flex items-center gap-2">
          <ChevronLeftIcon
            className={`${
              startIndex == 0
                ? 'text-gray-300 dark:text-gray-700'
                : 'cursor-pointer active:scale-125'
            } h-8 w-8`}
            onClick={handlePrevious}
          />
          <ChevronRightIcon
            className={`${
              endIndex > suggestions.length
                ? 'text-gray-300 dark:text-gray-700'
                : 'cursor-pointer active:scale-125'
            } h-8 w-8`}
            onClick={handleNext}
          />
        </div>
      </div>

      {suggestions &&
        suggestions.slice(startIndex, endIndex).map((suggestion, idx) => (
          <div
            className="relative mt-3 flex h-40 items-center gap-4 rounded-md bg-cover px-4 py-5"
            key={idx}
          >
            <img
              src="/banner.jpg"
              alt=""
              className="absolute left-0 h-40 w-full rounded-md"
            />
            <div className="absolute bottom-0 left-0 h-[50%] w-full rounded-bl-md rounded-br-md bg-black bg-opacity-30" />
            <span className="absolute top-2 left-2 z-20 rounded-md bg-black bg-opacity-50 px-2 py-1 text-xs font-medium text-white">
              FREE
            </span>
            <div className="dropdown-end dropdown absolute right-2 top-4 ml-3 dark:text-black">
              <DotsVerticalIcon
                tabIndex="0"
                className="w-6 cursor-pointer text-white"
              />
              <ul
                tabIndex="0"
                className="dropdown-content menu rounded-box w-64 bg-base-100 p-2 shadow"
              >
                <li>
                  <a>Copy link to post</a>
                </li>
                <li>
                  <a href={`#list-modal-1`}>Add to / remove from list</a>
                </li>
                <hr />
                <li>
                  <a>Report</a>
                </li>
                <li>
                  <a>Block</a>
                </li>
              </ul>
            </div>

            <div className="relative z-10 h-24 w-24 self-end rounded-full border-2 border-white">
              <img
                src={suggestion.avatar ? suggestion.avatar : '/user.jpeg'}
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="relative z-10 self-end text-white">
              <h1 className="font-semibold">{suggestion.name}</h1>
              <Link href={`/${suggestion.username}`}>
                <a>@{suggestion.username}</a>
              </Link>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Suggestions
