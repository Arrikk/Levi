import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Avatar, Layout, MessageBox } from '../../components'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import ChatLayout from '../../components/layouts/ChatLayout'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import moment from 'moment'

function Chat() {
  const [messages, setMessages] = useState()
  const [sender, setSender] = useState()
  const router = useRouter()
  const { username } = router.query

  useEffect(() => {
    const getAllConversation = async () => {
      const res = await axios(`conversations/${username}`)
      setMessages(res.data.messages)
      setSender(res.data.other)
      // console.log(res.data)
    }
    const fetchMessages = setInterval(() => getAllConversation(), 4000)
    return () => clearInterval(fetchMessages)
  }, [])
  return (
    <>
      <Head>
        <title>{username} | Chats</title>
      </Head>
      <ChatLayout>
        <div className="col-span-10 border-r sm:col-span-9 sm:border-l md:col-span-5">
          <div className="border-b py-3 px-4">
            {' '}
            <Link href={'/chats'}>
              <a>
                <ArrowLeftIcon className="mr-4 inline-flex h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-leviplatte hover:text-white" />{' '}
              </a>
            </Link>
            <span className="text-lg font-bold uppercase"> {username}</span>
          </div>
          <div>
            <div className="transd  bg-opacity-50 p-4">
              <div className="flex  h-[55vh] max-h-[55vh] w-full flex-col gap-y-4 overflow-auto">
                {messages &&
                  messages.map((msg,i) => {
                    const { iAmSender } = msg
                    if (iAmSender) {
                      return (
                        <div key={i}>
                          <div className="flex w-full flex-row items-center justify-center py-3">
                            <div className="h-[2px] w-1/3 bg-gray-200 px-1" />
                            <div className="px-1 text-sm">
                              {moment(msg.date).format('LL')}
                            </div>
                            <div className="h-[2px] w-1/3 bg-gray-200 px-1" />
                          </div>
                          <Receiver
                            message={msg.text}
                            time={msg.date}
                            isOnline={true}
                            date={msg.date}
                          />
                        </div>
                      )
                    } else {
                      return (
                        <div key={i}>
                          <div className="flex w-full flex-row items-center justify-center py-3">
                            <div className="h-[2px] w-1/3 bg-gray-200 px-1" />
                            <div className="px-1 text-sm">
                              {moment(msg.date).format('LL')}
                            </div>
                            <div className="h-[2px] w-1/3 bg-gray-200 px-1" />
                          </div>
                          <Sender
                            image={
                              sender?.avatar ? sender.avatar : '/user.jpeg'
                            }
                            message={msg.text}
                            time={msg.date && moment(msg.date).format('LT')}
                            isOnline={true}
                            date={msg.date}
                          />
                        </div>
                      )
                    }
                  })}
              </div>

              <div className="h-[25vh]">
                <MessageBox />
              </div>
            </div>
          </div>
        </div>
      </ChatLayout>
    </>
  )
}

const Sender = ({ message, image, time, isOnline }) => {
  return (
    <div className="flew-row flex w-4/5 items-start justify-start gap-x-2">
      <div className="mx-2 w-1/12">
        <Avatar
          src={image}
          className={'!h-10 !w-10'}
          withIcon
          elem={
            <span
              className={`${
                isOnline ? 'bg-green-700' : 'bg-gray-500'
              } block rounded-full p-[5px] `}
            />
          }
        />
      </div>
      <div className="">
        <div className="rounded-tl-lg rounded-tr-lg rounded-br-xl bg-gray-200 px-3  py-2">
          <p className="text-base">{message}</p>
        </div>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </div>
  )
}

const Receiver = ({ message, image, time, isDelivered }) => {
  return (
    <div className="flew-row flex w-full items-start justify-end gap-x-2">
      <div className="w-4/5">
        <div className="rounded-tl-lg rounded-tr-lg rounded-bl-lg bg-amber-200 px-3  py-2">
          <p className="text-base">{message}</p>
        </div>
        <span className="ml-1 text-xs text-gray-500">{time}</span>
      </div>
    </div>
  )
}

const MessageTextBox = () => {
  return (
    <div className="col-span-10 border-r sm:col-span-9 sm:border-l md:col-span-5">
      <div className="border-b py-3 px-4">
        {' '}
        <span onClick={() => history.back()}>
          <ArrowLeftIcon className="mr-4 inline-flex h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-leviplatte hover:text-white" />{' '}
        </span>
        <span className="text-lg font-bold uppercase"> {username}</span>
      </div>
      <div>
        <div className="transd  bg-opacity-50 p-4">
          <div className="flex  h-[55vh] max-h-[55vh] w-full flex-col gap-y-4 overflow-auto">
            <Sender
              image={'/user.jpeg'}
              message={'Hello Omega Nigga!'}
              time={'10:20am'}
              isOnline={true}
            />
            <Sender
              image={'/user.jpeg'}
              message={'Hello Omega Nigga!'}
              time={'10:20am'}
              isOnline={true}
            />

            <Receiver
              image={'/user.jpeg'}
              message={
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam similique vel sit iste autem iure ex minus? Fugiat perferendis cumque iusto nihil quasi consequuntur cupiditate commodi? Nemo optio ipsum obcaecati.'
              }
              time={'10:20am'}
              isOnline={true}
            />
            <Receiver
              image={'/user.jpeg'}
              message={
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam similique vel sit iste autem iure ex minus? Fugiat perferendis cumque iusto nihil quasi consequuntur cupiditate commodi? Nemo optio ipsum obcaecati.'
              }
              time={'10:20am'}
              isOnline={true}
            />
            <Receiver
              image={'/user.jpeg'}
              message={
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam similique vel sit iste autem iure ex minus? Fugiat perferendis cumque iusto nihil quasi consequuntur cupiditate commodi? Nemo optio ipsum obcaecati.'
              }
              time={'10:20am'}
              isOnline={true}
            />
          </div>

          <div className="h-[25vh]">
            <MessageBox />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Chat
