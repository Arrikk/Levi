import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CogIcon,
  DotsVerticalIcon,
  DuplicateIcon,
  StarIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import { formatDate } from './../hooks/useDate'
import profileContext from './../context/profile/profileContext'
import userContext from '../context/user/userContext'

const ProfileHeader = ({ myProfile }) => {
  const { profile, loading: profileLoading } = useContext(profileContext)
  const {
    loading: userLoading,
    isAuthenticated,
    user,
    getUser,
  } = useContext(userContext)

  const [userObj, setUserObj] = useState({})
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    !isAuthenticated && getUser()

    if (myProfile) {
      setUserObj(user)
    } else {
      setUserObj(profile)
    }
  }, [profileLoading, userLoading])

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      const res = await axios(`subscribe/${userObj.userId}`)
      setLoading(false)
      toast.success('Subscribed', { autoClose: 1500 })
      router.reload(window.location.pathname)
    } catch (err) {
      toast.error(err.response.data.error, { autoClose: 1500 })
      setLoading(false)
    }
  }

  const handleUnSubscribe = async () => {
    try {
      setLoading(true)
      const res = await axios(`unsubscribe/${userObj.userId}`)
      setLoading(false)
      toast.success('UnSubscribed', { autoClose: 1500 })
      router.reload(window.location.pathname)
    } catch (err) {
      toast.error(err.response.data.error, { autoClose: 1500 })
      setLoading(false)
    }
  }

  const copyTextToClipboard = async () => {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(location.href);
  } else {
    return document.execCommand('copy', true, location.href);
  }
}

 const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(location.href)
      .then(() => {
        toast.success("Profile Link copied", { autoClose: 1500 })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="border-b border-gray-200">
      <div className="flex h-48 items-start justify-between bg-[url(/banner.jpg)] bg-cover bg-no-repeat pb-4 text-white">
        <div className="mt-5 flex items-center justify-between">
          <Link href="/">
            <span>
              <ArrowLeftIcon className="mx-5 h-6 w-6 cursor-pointer" />
            </span>
          </Link>

          <h1 className="text-lg font-bold">{userObj?.name}</h1>
        </div>
        <DotsVerticalIcon className="mr-5 mt-5 h-6 w-6 cursor-pointer text-white" />
      </div>

      <div className="relative flex justify-between p-4 pb-0">
        <div className="rounded-full">
          <div className="my-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 px-6 py-4 font-bold text-leviplatte hover:border-2 hover:border-leviplatte md:ml-4">
            {/* {userObj.name.split(" ")[0].charAt(0)}
            {userObj.name.split(" ")[1].charAt(0)} */}
          </div>
          <img
            src={`${
              userObj?.avatar
                ? userObj?.avatar
                : 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
            }`}
            style={{ height: '100px', width: '100px', objectFit: 'cover' }}
            alt="profile image"
            className="absolute bottom-1 rounded-full"
          />
        </div>

        {userObj?.isMyProfile && (
          <div className="">
            <Link href="/settings/profile">
              <div className="inline-flex cursor-pointer  justify-between rounded-full border border-gray-300 p-3 text-leviplatte hover:border-leviplatte hover:bg-leviplatte hover:text-white sm:px-4">
                <CogIcon className="h-6 w-6 sm:mr-3" />{' '}
                <span className="hidden font-medium sm:inline-flex">
                  EDIT PROFILE
                </span>
              </div>
            </Link>
            <div className="ml-4 inline-flex cursor-pointer rounded-full border border-gray-300 p-3 text-leviplatte hover:border-leviplatte hover:bg-leviplatte hover:text-white">
              {' '}
              <DuplicateIcon className="h-6 w-6" onClick={handleCopyClick} />{' '}
            </div>
          </div>
        )}

        {!userObj?.isMyProfile && (
          <div className="">
            <div className="ml-4 inline-flex cursor-pointer rounded-full border border-gray-300 p-3 text-leviplatte hover:border-leviplatte hover:bg-leviplatte hover:text-white">
              {' '}
              <StarIcon className="h-6 w-6" />{' '}
            </div>
            <div className="ml-4 inline-flex cursor-pointer rounded-full border border-gray-300 p-3 text-leviplatte hover:border-leviplatte hover:bg-leviplatte hover:text-white">
              {' '}
              <DuplicateIcon className="h-6 w-6" onClick={handleCopyClick}    />{' '}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 pt-0">
        <h2 className="md:text-md pt-3 text-lg font-bold">{userObj?.name}</h2>
        <p>
          <span className="mr-4 lowercase">@{userObj?.username}</span>
          <span className="cursor-pointer hover:text-leviplatte">
            Available <ChevronDownIcon className="inline-flex h-4 w-4" />{' '}
          </span>
        </p>
      </div>

      {!userObj?.isMyProfile && (
        <div className="border-y-4 p-4">
          <h1> SUBSCRIPTION </h1>
          <label
            htmlFor={
              userObj?.subscription &&
              userObj?.subscription?.isExpired === false &&
              'my-modal'
            }
            onClick={
              (userObj?.subscription === false ||
                userObj?.subscription?.isExpired) &&
              handleSubscribe
            }
            className={`${
              loading && 'loading'
            } modal-button my-3 flex cursor-pointer items-center justify-between rounded-full border py-3 px-4 text-sm text-leviplatte hover:border-leviplatte`}
          >
            {loading ? (
              <span className="text-center"> Loading... </span>
            ) : (
              <>
                <span>
                  {' '}
                  {userObj?.isSubscribed && !userObj.needsRenewal
                    ? 'SUBSCRIBED'
                    : 'SUBSCRIBE FOR'}{' '}
                </span>
                <span>
                  {' '}
                  {userObj?.subscriptionSetting?.isFree
                    ? 'FREE'
                    : userObj?.subscriptionSetting?.subscriptionAmount}{' '}
                </span>
              </>
            )}
          </label>
          {userObj?.subscription && userObj?.subscription?.isExpired && (
            <div className="flex items-center justify-between text-sm">
              <span>Expired</span>
              <span>
                {' '}
                {formatDate(userObj?.subscription?.nextRenewalDate)}{' '}
              </span>
            </div>
          )}
        </div>
      )}

      {/* MODAL */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">SUBSCRIPTION</h3>
          <p className="py-4">
            Are you sure you want to cancel your subscription?
          </p>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn-link mr-4 cursor-pointer text-leviplatte"
            >
              Back
            </label>
            <label
              htmlFor=""
              className="btn-link cursor-pointer text-leviplatte"
              onClick={
                userObj?.subscription &&
                userObj?.subscription?.isExpired === false &&
                handleUnSubscribe
              }
            >
              Unsubscribe
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader