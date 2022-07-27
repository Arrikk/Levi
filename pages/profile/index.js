import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { Layout, PersonalProfile, Suggestions, Widgets } from '../../components'
import { useSelector } from 'react-redux'
import Friends from './../../components/shared/Friends'
// import userContext from '../../context/user'

const profile = () => {
  // const { getUser } = useContext(userContext)
  // useEffect(() => {
  //   // getUser()
  //   const token = JSON.parse(localStorage.getItem('profile'))
  //   setToken(token.token)
  // }, [])

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PersonalProfile myProfile={true} />
        <Widgets>
          <Suggestions />
          <Friends myFriends={true} />
        </Widgets>
      </Layout>
    </>
  )
}

export default profile
