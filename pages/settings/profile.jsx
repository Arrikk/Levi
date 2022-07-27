import React, { useState, useEffect, useContext } from 'react'
import Layout from '../../components/Layout'
import { ArrowLeftIcon, UserIcon, LightBulbIcon, ShieldCheckIcon, CurrencyDollarIcon, CogIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import EditUserProfile from '../../components/EditUserProfile'
import Head from 'next/head'
import {
  SettingsHeader,
  SettingsMainHeader,
  UserAccountSettings,
  UserNotification,
  PrivacySettings,
  UserDisplaySettings,
  UserSubscriptionSettings,
  UserPasswordSettings
} from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { updateSettings } from '../../redux/features/settings.slice'
import userContext from './../../context/user/userContext';

const profileSettings = () => {
  const dispatch = useDispatch()
  const { value } = useSelector((state) => ({ ...state.settings }))
  const {user, getUser, loading, isAuthenticated} = useContext(userContext)


  useEffect(() => {
    !isAuthenticated && getUser()
  }, [loading])

  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="col-span-2 sm:col-span-9 md:col-span-3 border-x sticky top-0 h-screen">
          <div className="border-b py-3 text-center sm:text-left sm:px-4">
            <Link href={`/${user?.username}`}>
              <span className="">
                <ArrowLeftIcon className="mr-4 inline-flex h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-leviplatte hover:text-white" />{' '}
              </span>
            </Link>
            <span className="font-bold hidden sm:inline-flex"> SETTINGS</span>
          </div>
          <div className="border-b py-3 px-4 hidden sm:block">
            <Link href="/profile">
              <span className="cursor-pointer font-medium hover:text-leviplatte">
                @ {user?.username}
              </span>
            </Link>
          </div>

          <div onClick={() => dispatch(updateSettings('profile'))} className="flex items-center border-b justify-center py-3 sm:py-0 cursor-pointer">
            <UserIcon className="w-6 h-6 sm:hidden" />
            <SettingsHeader text="Profile" clas="hidden sm:flex" />
          </div>

          <div onClick={() => dispatch(updateSettings('account'))} className="flex items-center border-b justify-center py-3 sm:py-0 cursor-pointer">
            <CogIcon className="w-6 h-6 sm:hidden" />
            <SettingsHeader text="Account" clas="hidden sm:flex" />
          </div>
          <div onClick={() => dispatch(updateSettings('privacy'))} className="flex items-center border-b justify-center py-3 sm:py-0 cursor-pointer">
            <ShieldCheckIcon className="w-6 h-6 sm:hidden" />
            <SettingsHeader text="Privacy and Safety" clas="hidden sm:flex" />
          </div>
          {/* <SettingsHeader
            onClick={() => dispatch(updateSettings('notification'))}
            text="Notification"
          /> */}
          <div onClick={() => dispatch(updateSettings('subscription'))} className="flex items-center border-b justify-center py-3 sm:py-0 cursor-pointer">
            <CurrencyDollarIcon className="w-6 h-6 sm:hidden" />
            <SettingsHeader text="Subscription" clas="hidden sm:flex" />
          </div>

          <div className="hidden sm:block"> 
          <SettingsMainHeader text="General" />
          </div>
          <div onClick={() => dispatch(updateSettings('display'))} className="flex items-center border-b justify-center py-3 sm:py-0 cursor-pointer">
            <LightBulbIcon className="w-6 h-6 sm:hidden" />
            <SettingsHeader text="Display" clas="hidden sm:flex" />
          </div>

        </div>
        <div className="col-span-8 md:block sm:col-span-9 sm:border-l md:col-span-5 overflow-auto">
          {value == 'password' && <UserPasswordSettings />}
          {value == 'profile' && <EditUserProfile />}
          {value == 'account' && <UserAccountSettings />}
          {value == 'privacy' && <PrivacySettings />}
          {value == 'notification' && <UserNotification />}
          {value == 'subscription' && <UserSubscriptionSettings />}
          {value == 'display' && <UserDisplaySettings />}
        </div>
      </Layout>
    </>
  )
}

export default profileSettings
