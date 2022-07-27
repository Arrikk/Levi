import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Layout, ListBox, UserContainer } from '../../components/'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import axios from 'axios'

const Subscriptions = () => {
  const [listData, setListData] = useState()
  useEffect(() => {
    axios.get('my/subscriptions').then(res => {
      setListData(res.data)
      console.log(res.data)
    }).catch(err => {
      console.log(err.response?.data)
    })
  }, [])
  return (
    <>
      <Head>
        <title>Subscriptions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <Layout>
      <div className="col-span-10 h-screen border-x sm:col-span-9 md:col-span-8 lg:col-span-8">
        <div className="flex items-center border-b p-4">
          <ChevronLeftIcon
            className="mr-3 h-8 w-8 cursor-pointer"
            onClick={() => history.back()}
          />
          <span className="text-xl font-bold uppercase">Subscriptions</span>
        </div>

        <div className="grid grid-cols-1 gap-5 p-3 md:grid-cols-2 lg:grid-cols-3">
        {listData && listData?.length > 0
            ? listData?.map((data, idx) => (
                <UserContainer key={idx} data={data} listData={listData} />
              ))
            : 'No Data'}
        {/* <UserContainer /> */}
        </div>
      </div>
    </Layout>
    </>
  )
}

export default Subscriptions
