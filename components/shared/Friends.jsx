import { useState, useEffect, useContext } from 'react'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Link from 'next/link'
import profileContext from './../../context/profile/profileContext'

const Friends = ({ myFriends }) => {
  const { loading, profile } = useContext(profileContext)
  const [friends, setFriends] = useState([])
  const router = useRouter()
  const pathName = router.pathname

  useEffect(() => {
    const currentFriends = JSON.parse(localStorage.getItem('userProfile'))

    if (myFriends) {
      setFriends(currentFriends?.data)
    } else {
      setFriends(profile)
    }
  }, [loading])

  return (
    <div className="mb-6 rounded-md border p-3">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">FRIENDS</h1>
      </div>

      <div className="no-scrollbar flex gap-4 overflow-y-hidden overflow-x-scroll">
        {friends?.friends && friends?.friends.length !== 0 ? (
          friends?.friends?.map((friend, idx) => (
            <div
              className="relative my-3 flex w-40 flex-col items-center rounded-md border bg-cover px-4 py-5"
              key={idx}
            >
              <img
                src={friend.banner ? friend.banner : '/banner.jpg'}
                alt=""
                className="absolute left-0 top-0 h-20 w-full rounded-tl-md rounded-tr-md"
              />
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
              <div className="relative z-10 h-24 w-24 rounded-full border-2 border-white">
                <img
                  src={friend?.avatar ? friend?.avatar : '/user.jpeg'}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="relative z-10 text-center text-black dark:text-white">
                <h1 className="font-semibold">{friend?.display_name}</h1>
                <Link href={`/${friend?.username}`}>
                  <a>@{friend.username}</a>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h1 className="pt-3 text-sm">
            {' '}
            {myFriends ? 'You' : friends?.name} currently has no friends.{' '}
          </h1>
        )}
      </div>
    </div>
  )
}

export default Friends
