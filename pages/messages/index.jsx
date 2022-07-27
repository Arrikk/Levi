import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Layout, ListBox, TabButton, Avatar, MessageBox } from '../../components/'
import { ArrowLeftIcon, XIcon } from '@heroicons/react/solid'
import truncateString from '../../utils/truncateString'
import moment from 'moment'


const Messages = () => {
    const [messageGroup, setMessageGroup] = useState('all');
    const [message, setMessage] = useState('');
    const [messageGroupData, setMessageGroupData] = useState([]);


    return (
        <>
            <Head>
                <title>Messages</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className="col-span-3 hidden border-x md:block ">
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
                                <button className="w-full px-4">
                                    <div className="hover:bg-amber-100 transition-all rounded-lg py-4  mx-1 w-full mb-7 flex flex-row px-2 text-left gap-x-3">
                                        <div className="flex w-1/6 flex-row items-start justify-center ">
                                            <Avatar
                                                src={'/user.jpeg'}
                                                withIcon
                                                elem={
                                                    <span className="bg-gray-400 block p-[5px] rounded-full "></span>
                                                }
                                            />
                                        </div>
                                        <div className="w-5/6 border-b pb-4">
                                            <div className="flex flex-row gap-x-2 justify-between textlg">
                                                <span className="font-bold capitalize text-gray-700">{truncateString('agent.display_name', 13)}</span>{' '}
                                                <span className="text-gray-500"> {truncateString('@agent.username', 11)}</span>
                                                <button className='group h-5 w-5 p-[2px] flex justify-center items-center hover:bg-red-200 rounded-full'>
                                                    <XIcon className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                                                </button>
                                            </div>
                                            <div className="my-1 flex items-center justify-between text-gray-400">
                                                <p className={`text-sm ${true ? "text-gray-700 font-bold" : "text-gray-400"} capitalize`}>message snippet</p>
                                                <span className={`text-xs ${true ? "text-leviplatte font-bold" : 'text-gray-400'}`}>{moment().startOf('hour').fromNow()}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Message Box */}
                <MessageTextBox />
            </Layout>
        </>
    )
}


const Sender = ({ message, image, time, isOnline }) => {
    return (
        <div className="flex flew-row gap-x-2 justify-start items-start w-4/5">
            <div className="w-1/12 mx-2">
                <Avatar
                    src={image}
                    className={"!w-10 !h-10"}
                    withIcon
                    elem={<span className={`${isOnline ? "bg-green-700" : "bg-gray-500"} block p-[5px] rounded-full `} />}
                />
            </div>
            <div className="">
                <div className="bg-gray-200 px-3 py-2 rounded-tl-lg rounded-tr-lg  rounded-br-xl">
                    <p className="text-base">
                        {message}
                    </p>
                </div>
                <span className="text-xs text-gray-500">{time}</span>
            </div>
        </div>
    )
}

const Receiver = ({ message, image, time, isDelivered }) => {
    return (
        <div className="flex flew-row gap-x-2 justify-end items-start w-full">

            <div className="w-4/5">
                <div className="bg-amber-200 px-3 py-2 rounded-tl-lg rounded-tr-lg  rounded-bl-lg">
                    <p className="text-base">
                        {message}
                    </p>
                </div>
                <span className="text-xs text-gray-500 ml-1">{time}</span>

            </div>
        </div>
    )
}


const MessageTextBox = () => {
    return (
        <div className="col-span-10 sm:col-span-9 sm:border-l md:col-span-5 border-r">
            <div className="border-b py-3 px-4">
                {' '}
                <span onClick={() => history.back()}>
                    <ArrowLeftIcon className="mr-4 inline-flex h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-leviplatte hover:text-white" />{' '}
                </span>
                <span className="text-lg font-bold uppercase"> Sender Name</span>
            </div>
            <div>
                <div className="p-4  bg-opacity-50 transd">
                    <div className='flex  flex-col gap-y-4 w-full max-h-[55vh] overflow-auto h-[55vh]'>

                        <Sender
                            image={"/user.jpeg"}
                            message={"Hello Omega Nigga!"}
                            time={"10:20am"}
                            isOnline={true}
                        />
                        <Sender
                            image={"/user.jpeg"}
                            message={"Hello Omega Nigga!"}
                            time={"10:20am"}
                            isOnline={true}
                        />

                        <Receiver
                            image={"/user.jpeg"}
                            message={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam similique vel sit iste autem iure ex minus? Fugiat perferendis cumque iusto nihil quasi consequuntur cupiditate commodi? Nemo optio ipsum obcaecati."}
                            time={"10:20am"}
                            isOnline={true}
                        />
                          <Receiver
                            image={"/user.jpeg"}
                            message={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam similique vel sit iste autem iure ex minus? Fugiat perferendis cumque iusto nihil quasi consequuntur cupiditate commodi? Nemo optio ipsum obcaecati."}
                            time={"10:20am"}
                            isOnline={true}
                        />
                          <Receiver
                            image={"/user.jpeg"}
                            message={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam similique vel sit iste autem iure ex minus? Fugiat perferendis cumque iusto nihil quasi consequuntur cupiditate commodi? Nemo optio ipsum obcaecati."}
                            time={"10:20am"}
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
export default Messages
