import Link from 'next/link'
import {useState} from 'react'
import { ChevronLeftIcon, DotsVerticalIcon } from '@heroicons/react/solid'
import AddToListModal from './AddToListModal';
import UserTipModal from './UserTipModal';
import axios from 'axios'
import {
  BadgeCheckIcon,
  StarIcon,
  CurrencyDollarIcon,
  ChatIcon,
} from '@heroicons/react/outline'

const UserList = ({ user, Restrict, Block, handleBlock, changeRadio }) => {
  const [lists, setLists] = useState([])
  const loadList = async () => {
    try {
      let res = await axios.get(`lists?check=${user.userId}`)
      setLists(res.data)
    } catch (err) {
      console.log(err.response.data)
    }
  }
  return (
    <div className="rounded-md border">
      {/* <div
        className={`flex h-20 justify-end bg-[url('${user?.profileCover ? user.profileCover : `/profile-banner.jpg`}')] pt-3 pr-3`}
      > */}
      <div
        className={`flex h-20 justify-end bg-[url('/profile-banner.jpg')] pt-3 pr-3`}
      >
        <div className="align-items-center flex justify-between">
          <div className="dropdown-end dropdown ml-3">
            <DotsVerticalIcon
              tabIndex="0"
              className="w-5 cursor-pointer text-white"
            />
            <ul
              tabIndex="0"
              className="dropdown-content menu rounded-box w-64 bg-base-100 p-2 shadow"
            >
              <li>
              <a>Copy link to post</a>
              </li>
              {/*  If a user is blocked restrict access to below lists */}
              {!user.isBlocked && (
                <>
                  <li>
                    <a href={`#list-modal-${user.userId}`} onClick={loadList}>Add to / remove from list</a>
                  </li>
                  <hr />
                  <li onClick={Restrict}>
                    <a>{user.isRestricted ? 'Unrestrict' : 'Restrict'}</a>
                  </li>
                </>
              )}
              {/*  If a user is blocked restrict access to below lists */}

                {/* If user is blocked show unblock else show block */}
                  <li>
                    {!user.isBlocked ? (
                      <a href={`#my-modal-${user.userId}`}>Block</a>
                      ) : (
                        <span onClick={Block}>Unblock</span>
                        )}
                  </li>
                {/* If user is blocked show unblock else show block */}
              <li>
                <a>Report</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="flex">
          <img
            src={`${
              user?.avatar
                ? user.avatar
                : 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
            }`}
            alt="user"
            className="md:h-30 md:w-30 -mt-12 mb-4 h-24 w-24 rounded-full object-cover"
          />
          <div className="ml-2 flex flex-col">
            <span className="flex items-center font-bold capitalize">
              {user?.name ? user.name : '__'}
              <BadgeCheckIcon className="ml-1 inline-flex h-5 w-5" />
            </span>
            <span className="lowercase">
              @{user?.username ? user.username : '__'}
            </span>
          </div>
        </div>

        {/* Show all action buttons and components here only if a user is not blocked */}
        {!user.isBlocked && (
          <>
            <div className="flex items-center hover:text-leviplatte">
              <StarIcon className="h-4 w-4" />
              <Link href="#">Add to favourites and other lists</Link>
            </div>
            <div className="mt-3 flex gap-3">
              <Link href={`/chats/${user?.username}`} prefetch={true}>
                <a className="flex items-center rounded-full bg-gray-400 px-3 py-2 text-white hover:bg-leviplatte">
                  <ChatIcon className="h-5 w-5" /> Message
                </a>
              </Link>

              {/* Allow to send tip only if user is not restricted */}
              {!user.isRestricted && (
                <label htmlFor={`tip-modal-${user.userId}`}  className="flex items-center rounded-full bg-gray-400 px-3 py-2 text-white hover:bg-leviplatte">
                    <CurrencyDollarIcon className="h-5 w-5" /> Send a tip{' '}
                  {/* <button className="flex items-center rounded-full bg-gray-400 px-3 py-2 text-white hover:bg-leviplatte">
                  </button> */}
                </label>
              )}
              {/* Allow to send tip only if user is not restricted */}
            </div>

            <div className="mt-3 flex items-center justify-between rounded-full bg-gray-400 px-3 py-2 uppercase text-white hover:bg-leviplatte">
              <span>subscribed </span>
              <span> for free </span>
            </div>
          </>
        )}
         {/* Show all action buttons and components here only if a user is not blocked */}
      </div>

      {/* Add or remove from list moal */}
      <AddToListModal author={user} id={user.userId} lists={lists} />
      {/* Add or remove from list moal */}

      {/* Send tip to a user */}
      <UserTipModal user={user} />
      {/* Send tip to a user */}

      <div className="modal" id={`my-modal-${user.userId}`}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">BLOCK USER</h3>
          <div className="form-control mt-3">
            <label className="flex cursor-pointer items-center">
              <input
                type="radio"
                name="radio-6"
                className="radio mr-2 checked:bg-leviplatte"
                value="block"
                onFocus={changeRadio}
              />
              <span className="text-base">
                Block user from accessing your profile
              </span>
            </label>
          </div>
          <div className="form-control mt-3">
            <label className="flex cursor-pointer items-center">
              <input
                type="radio"
                name="radio-6"
                className="radio mr-2 checked:bg-leviplatte"
                value="restrict"
                onFocus={changeRadio}
              />
              <span className="text-base">
                Restrict, user will not be able to send you direct message or
                reply to your posts.
              </span>
            </label>
          </div>
          <div className="modal-action">
            <a href="#" className="btn btn-link">
              Cancel
            </a>
            <a href="#" className="btn btn-link" onClick={handleBlock}>
              Confirm
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList
