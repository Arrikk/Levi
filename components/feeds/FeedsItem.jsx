import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Carousel from './Carousel'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { format } from 'timeago.js'
import {
  ChatIcon,
  CurrencyDollarIcon,
  HeartIcon,
  BookmarkIcon,
  BadgeCheckIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import {
  BookmarkIcon as BookmarkSolid,
  HeartIcon as HeartSolid,
} from '@heroicons/react/solid'
import { TipsModal } from '../index'
import AddToListModal from './../shared/AddToListModal';
import { toast } from "react-toastify"

const FeedsItem = ({ feed }) => {
  const [feedItem, setFeedItem] = useState({ ...feed })
  const [lists, setLists] = useState([])
  
  const setBookmark = () => {
    setFeedItem({ ...feedItem, isBookmarked: !feedItem.isBookmarked })
    // feedItem.isBookmarked && feedItem.isBookmarked ? toast.error("Bookmark Removed", { autoClose: 1500 }) : toast.success("Bookmark Added", { autoClose: 1500 })
    axios
      .get(`bookmark/${feedItem.id}`)
      .then((res) => console.log(res.data.message))
  }

  const likeUnnlikeFeed = () => {
    setFeedItem({
      ...feedItem,
      isliked: !feedItem.isliked,
      likes: feedItem.isliked ? feedItem.likes - 1 : feedItem.likes + 1,
    })
    axios
      .get(`like/${feedItem.id}`)
      .then((res) => console.log(res.data.message))
  }

  const loadList = async () => {
    try {
      let res = await axios.get(`lists?check=${feedItem?.author?.userId}`)
      setLists(res.data)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <div className="border-y">
      <div className="align-center flex justify-between p-4">
        <div className="flex">
          <img
            src={`${feedItem?.author?.avatar
              ? feedItem?.author?.avatar
              : 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
              }`}
            alt="user"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="ml-2 flex flex-col">
            <span className="flex items-center font-bold capitalize">
              {feedItem?.author?.name}
              <BadgeCheckIcon className="ml-1 inline-flex h-5 w-5" />
            </span>
            <span className="lowercase">@{feedItem?.author?.username}</span>
          </div>
        </div>
        <div className="align-center-center flex justify-between">
          <span className="w-full">{format(feedItem?.createdAt)}</span>
          <div className="dropdown dropdown-end ml-3">
            <DotsHorizontalIcon tabIndex="0" className="w-6 cursor-pointer" />
            <ul
              tabIndex="0"
              className="dropdown-content menu rounded-box w-64 bg-base-100 p-2 shadow"
            >
              <li>
                <a>Copy link to post</a>
              </li>
              <li>
                <a href={`#list-modal-${feedItem.id}`} onClick={loadList}>Add to / remove from list</a>
              </li>
              <hr />
              <li>
                <a>I dont like this post</a>
              </li>
              <li>
                <a>Hide users post from feedItems</a>
              </li>
              <li>
                <a>Report</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <AddToListModal author={feedItem?.author} id={feedItem.id} lists={lists} />

      <div>
        <p className="px-4 pb-3">{feedItem?.text}</p>

        {/*  If feedItem has a media and can view media .... If it does not have any media it remains empty */}
        {feedItem?.hasMedia && feedItem?.canViewMedia && (
          <Carousel media={feedItem?.media} />
        )}

        {/*  If feedItem has a media and cannot view media */}
        {feedItem.hasMedia && !feedItem.canViewMedia && (
          <img
            src="https://www.tribedigitalventures.com/wp-content/themes/theme-tdv/img/03.png"
            alt="Broken"
          />
        )}

        {!feedItem.canViewMedia && (
          <div className="m-4 rounded-lg border p-5">
            <VideoCameraIcon className="h-6 w-6" />
            <button className="btn btn-block rounded-full border-none bg-leviplatte text-white hover:bg-leviplatte">
              Unlock post for ${`${feedItem?.priceRaw}`}{' '}
            </button>
          </div>
        )}

        <div className="p-4">
          <div className="align-center flex justify-between">
            <div className="align-center flex gap-4">
              {/* If feed is already liked by user like feed else unlike feed */}
              {feedItem?.canLike ? (
                feedItem?.isliked ? (
                  <HeartSolid
                    onClick={likeUnnlikeFeed}
                    className="h-6 w-6 cursor-pointer"
                  />
                ) : (
                  <HeartIcon
                    onClick={likeUnnlikeFeed}
                    className="h-6 w-6 cursor-pointer"
                  />
                )
              ) : (
                <HeartIcon className="h-6 w-6 cursor-pointer opacity-5" />
              )}

              {/* <HeartIcon className="h-6 w-6 cursor-pointer" /> */}

              {/* If feed is already liked by user like feed else unlike feed */}
              {feedItem.canComment ? (
                <ChatIcon className="h-6 w-6 cursor-pointer" />
              ) : (
                <ChatIcon className="h-6 w-6 cursor-pointer opacity-5" />
              )}
              {/* <ChatIcon className="h-6 w-6 cursor-pointer" /> */}
              <label
                className="modal-button cursor-pointer"
                htmlFor={`tip-modal-${feedItem.id}`}
              >
                {' '}
                <CurrencyDollarIcon className="inline-flex h-6 w-6" /> SEND TIP{' '}
              </label>

              <TipsModal feedItem={feedItem} setFeedItem={setFeedItem} />
            </div>
            {feedItem.isBookmarked ? (
              <BookmarkSolid
                onClick={setBookmark}
                className="h-6 w-6 cursor-pointer"
              />
            ) : (
              <BookmarkIcon
                onClick={setBookmark}
                className="h-6 w-6 cursor-pointer"
              />
            )}
          </div>
          <div className="mt-3">
            <span className="mr-4">{`${feedItem.likes}`} likes</span>
            <span>
              {`${feedItem.comments}`} <Link href="/">comments </Link>
            </span>
            <span>
              {feedItem.tipAmountActual > 0 && (
                <span className="mr-4 font-bold">
                  ${feedItem.tipAmountActual} tips
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedsItem