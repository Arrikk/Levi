import Head from 'next/head'
import React, { useEffect } from 'react'
import { Layout, BookmarkMenu } from '../../components/'

const Bookmark = () => {
  return (
    <>
      <Head>
        <title>Lists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <BookmarkMenu />
      </Layout>
    </>
  )
}

export default Bookmark
