import React, { useState, useEffect } from 'react'
import { Layout, UserContainer } from '../../components'
import { ChevronLeftIcon, DotsVerticalIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import axios from 'axios'

const listDetails = () => {
  const router = useRouter()
  const { slug } = router.query
  const [listData, setListData] = useState([])

  useEffect(() => {
    axios
      .get(`lists/${slug}`)
      .then((res) => {
        setListData(res.data)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }, [])

  return (
    <Layout>
      <div className="col-span-10 h-screen border-x sm:col-span-9 md:col-span-8 lg:col-span-8">
        <div className="flex items-center border-b p-4">
          <ChevronLeftIcon
            className="mr-3 h-8 w-8 cursor-pointer"
            onClick={() => history.back()}
          />
          <span className="text-xl font-bold uppercase">
            {listData?.name ? listData.name : 'Loading'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 p-3 md:grid-cols-2 lg:grid-cols-3">
          {listData?.users && listData.users.length > 0
            ? listData.users.map((data, idx) => (
                <UserContainer key={idx} data={data} listData={listData} />
              ))
            : 'No Data'}
        </div>
      </div>
    </Layout>
  )
}

export default listDetails
