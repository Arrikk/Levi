import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Layout, TabButton, Widgets, Avatar } from '../../components'
import { useSelector } from 'react-redux'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import {
  BellIcon,
  UserAddIcon,
  AnnotationIcon,
  CashIcon,
  SpeakerphoneIcon,
  StarIcon,
} from '@heroicons/react/outline'
import axios from 'axios'
import moment from 'moment'

function Notifications() {

  const { loading, user } = useSelector((state) => ({ ...state.auth }))
  const [] = useState()

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <NotificationMenu />
        {user && <Widgets />}
      </Layout>
    </>
  )
}

function NotificationMenu() {
  const [notification, setNotification] = useState('all')
  const [notificationData, setNotificationData] = useState([])

  useEffect(() => {
    const getAllNotifications = async () => {
      const res = await axios(`my/notifications`)
      setNotificationData(res.data)
    }
    getAllNotifications()
  }, [])

  return (
    <div className="col-span-10 border-x sm:col-span-9 md:col-span-8 lg:col-span-5">
      <div className="flex items-center border-b p-4">
        <ChevronLeftIcon
          className="mr-3 h-8 w-8 cursor-pointer"
          onClick={() => history.back()}
        />
        <span className="text-xl font-bold uppercase">Notifications</span>
      </div>

      {/* Tab Buttons */}
      <div className="flex flex-row gap-x-2 overflow-auto px-5 py-2">
        <TabButton
          active={notification === 'all' ? true : false}
          text={'All'}
          onClick={() => setNotification('all')}
        />
        <TabButton
          active={notification === 'promotions' ? true : false}
          text={'Promotions'}
          onClick={() => setNotification('promotions')}
        />
        <TabButton
          active={notification === 'comments' ? true : false}
          text={'Comments'}
          onClick={() => setNotification('comments')}
        />
        <TabButton
          active={notification === 'subscriptions' ? true : false}
          text={'Subscriptions'}
          onClick={() => setNotification('subscriptions')}
        />
        <TabButton
          active={notification === 'tip' ? true : false}
          text={'Tips'}
          onClick={() => setNotification('tip')}
        />
      </div>

      {/* Tab contents */}
      <div className="py-4">
        {notification === 'all' && (
          <NotificationList feeds={notificationData} />
        )}
        {notification === 'promotions' && (
          <NotificationList
            feeds={notificationData.filter((media) => media.isForPromotion)}
          />
        )}
        {notification === 'comments' && (
          <NotificationList
            feeds={notificationData.filter((media) => media.isForComment)}
          />
        )}
        {notification === 'tips' && (
          <NotificationList
            feeds={notificationData.filter((media) => media.isForTip)}
          />
        )}
        {notification === 'subscriptions' && (
          <NotificationList
            feeds={notificationData.filter((media) => media.isForSubscription)}
          />
        )}
      </div>
    </div>
  )
}


const NotificationList = ({ feeds }) => {
  return (
    <>
      {feeds &&
        feeds.map((feed) => {
          return <NotificationItem key={feed.notificationId} feed={feed} />
        })}
    </>
  )
}

const NotificationItem = ({ feed }) => {
  const {
    isForComment,
    isForPromotion,
    isForSubscription,
    isForTip,
    date,
    agent,
    description,
  } = feed
  return (
    <div className="mb-7 flex flex-row py-2">
      <div className="flex w-1/6 flex-row items-start justify-center">
        <Avatar
          src={agent.avatar !== null ? feed.agent.avatar : '/user.jpeg'}
          withIcon={true}
          Icon={
            isForComment
              ? AnnotationIcon
              : isForPromotion
              ? SpeakerphoneIcon
              : isForSubscription
              ? UserAddIcon
              : isForTip
              ? CashIcon
              : BellIcon
          }
        />
      </div>
      <div className="w-5/6 border-b pb-4">
        <div className="flex flex-row gap-x-2 text-sm">
          <span className="font-bold">{agent.display_name}</span>{' '}
          <span className="text-gray-500">@{agent.username}</span>
        </div>
        <button className="my-1 flex flex-row items-center gap-x-1">
          <StarIcon className="h-4 w-4 text-leviplatte" />
          <span className="text-sm">Add to favorites and other lists</span>
        </button>
        <div className="my-1">
          <p className="text-sm">{description}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            {moment(date).format('MMMM D')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Notifications
