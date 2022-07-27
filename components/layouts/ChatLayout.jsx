import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Layout, ListBox, TabButton, Avatar, MessageBox } from '../../components'
import { ArrowLeftIcon, XIcon } from '@heroicons/react/solid'
import truncateString from '../../utils/truncateString'
import moment from 'moment'
import axios from 'axios'
import Link from 'next/link'


const ChatLayout = ({ children }) => {
    const [messageGroup, setMessageGroup] = useState('all');
    const [messageList, setMessageList] = useState('');
    const [messageGroupData, setMessageGroupData] = useState([]);

    useEffect(() => {
        const getAllConversation = async () => {
            const res = await axios(`conversations`)
            setMessageList(res.data)
            // console.log(res.data);
            //    const user =  await axios(`profile/${res.data[0].other}`)
            //    console.log(res.data);
        }
        getAllConversation()
    }, [])

    // const getuser = async()

    return (

        <Layout>
            <div className={` ${children ? "col-span-3 hidden border-x md:block" : "col-span-9 md:col-span-3"} `}>
                <div className="border-b py-3 px-4">
                    {' '}
                    <span onClick={() => history.back()}>
                        <ArrowLeftIcon className="mr-4 inline-flex h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-leviplatte hover:text-white" />{' '}
                    </span>

                    <span className="text-xl font-bold uppercase"> Messages</span>
                </div>
                <div>
                    <div className="flex flex-row px-5 py-2 gap-x-2 overflow-auto">

                        <TabButton
                            active={messageGroup === 'all' ? true : false}
                            text={"All"}
                            onClick={() => setMessageGroup('all')}
                            className={"text-xs py-2"}
                        />
                        <TabButton
                            active={messageGroup === 'priority' ? true : false}
                            text={"Priority"}
                            onClick={() => setMessageGroup('priority')}
                            className={"text-xs py-2"}
                        />
                    </div>
                    <div>
                        <div className=''>
                           
                                {/* <a className="w-full md:w-3/4 lg:w-3/5 px-[2px]"> */}
                                {
                                 messageList &&    messageList.map((message) => {
                                        return ( <Link href={`/chats/${message.other.username}`} prefetch={true}>
                                            <a className="hover:bg-amber-100 transition-all rounded-lg py-4  mb-3 flex flex-row justify-start lg:justify-beyween mx-1 lg:mx-4 px-6 lg:px-4 my-2 text-left gap-x-3">
                                                <div className="flex w-1/6 flex-row items-start justify-center ">
                                                    <Avatar
                                                        src={message.other.avatar}
                                                        withIcon
                                                        elem={
                                                            <span className="bg-green-700 block p-[5px] rounded-full "></span>
                                                        }
                                                    />
                                                </div>
                                                <div className="w-5/6 border-b pb-1 lg:pb-4">
                                                    <div className="flex flex-row lg:gap-x-2 justify-between text-sm">
                                                    <div className="flex flex-row lg:gap-x-2 justify-start items-center text-sm">
                                                         <span className="font-bold capitalize text-gray-700">{truncateString(message.other.display_name, 13)}</span>{' '}
                                                        <span className="text-gray-500 text-base"> @{truncateString(message.other.username, 11)}</span>
                                                    </div>
                                                       
                                                        <button className='group h-5 w-5 p-[2px] flex justify-center items-center hover:bg-red-200 rounded-full'>
                                                            <XIcon className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                                                        </button>
                                                    </div>
                                                    <div className="my-1 flex flex-row items-start lg:items-center justify-between text-gray-400">
                                                        <p className={`text-sm ${true ? "text-gray-700 font-bold" : "text-gray-400"} capitalize`}> {truncateString(message.text, 15)} </p>
                                                        <span className={`text-xs ${true ? "text-leviplatte font-bold" : 'text-gray-400'}`}>{moment(message.date).startOf('hour').fromNow()}</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-400">

                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                             </Link>
                                        )
                                    })
                                }
                                {/* </a> */}
                           
                        </div>
                    </div>
                </div>
            </div>
            {/* Message Box */}
            {children && children}
        </Layout>
    )
}

export default ChatLayout



