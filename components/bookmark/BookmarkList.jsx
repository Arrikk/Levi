import React from 'react'
import { BookmarkIcon, CollectionIcon } from '@heroicons/react/outline'
import FeedsItem from '../feeds/FeedsItem'


const BookmarkList = ({ title, feeds, bookmarkMedia }) => {
  return (
    <div className="flex flex-col border-r">
      <div className="flex items-center justify-between border-b py-3 px-4">
        <span className="text-lg font-bold uppercase"> {title} </span>
        <span>
          <CollectionIcon className="mr-4 inline-flex h-6 w-6 cursor-pointer" />{' '}
        </span>
      </div>

      <div className="">
        {feeds ? feeds?.map((feed, idx) => (
          <FeedsItem feed={feed} key={idx} />
        )) : (
          <div className="flex flex-col items-center justify-center">
            <BookmarkIcon className="h-20 w-20" />
            <span>No bookmark yet</span>
          </div>
        )}
      </div>
{/* 
      <div className="grid grid-cols-3">
        {bookmarkMedia?.map((media, idx) => (
          { media?.media?.mediaType == "image" && (
            <img src={media?.media?.source} key={idx} className="w-52 h-52" />
          )}  
      ))}
      </div> */}
    </div>
  )
}

export default BookmarkList
