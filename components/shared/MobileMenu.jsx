import React, {useState, useEffect} from 'react'
import Link from "next/link"
import { HomeIcon, BellIcon, PlusCircleIcon, ChatAltIcon, UserCircleIcon } from '@heroicons/react/outline'

const MobileMenu = () => {
  const [username, setUsername] = useState('')
    useEffect(() => {
  const user = JSON.parse(localStorage.getItem('userProfile'));
  setUsername(user?.data?.username)
}, []);

  return (
    <div className="fixed  bottom-0 left-0 bg-white border-t p-4 w-full flex items-center justify-between md:hidden">
        <Link href="/">
        <HomeIcon className="w-7 h-7" />
        </Link>

        <Link href="/notifications">
        <BellIcon className="w-7 h-7" />
        </Link>
        <Link href="/">
        <PlusCircleIcon className="w-7 h-7" />
        </Link>
        <Link href="/messages">
        <ChatAltIcon className="w-7 h-7" />
        </Link>
        <Link href={`/${username}`}>
        <UserCircleIcon className="w-7 h-7" />
        </Link>
    </div>
  )
}

export default MobileMenu