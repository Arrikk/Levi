import Head from 'next/head'
import React, { useEffect } from 'react'
import { Layout, ListBox } from '../../components/'

const List = () => {
  return (
    <>
      <Head>
        <title>Lists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ListBox />
      </Layout>
    </>
  )
}

export default List
