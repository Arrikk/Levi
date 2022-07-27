import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { Layout, PersonalProfile, Widgets, Suggestions, Friends } from '../../components'
import { useSelector } from 'react-redux'
import userContext from './../../context/user/userContext';

const profile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PersonalProfile  myProfile={true} />
        <Widgets>
          <Suggestions />
          <Friends myFriends={true} />
        </Widgets>
      </Layout>
    </>
  )
}

export default profile
