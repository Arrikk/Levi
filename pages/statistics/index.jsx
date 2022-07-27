import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Layout, ListBox, TabButton } from '../../components/'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { CurrencyDollarIcon, UsersIcon, CashIcon } from '@heroicons/react/outline'
import axios from "axios"
// import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';





function Statistics() {

    // const { loading, user } = useSelector((state) => ({ ...state.auth }));

    // const userProfile = typeof window !== 'undefined'
    // ? JSON.parse(window.localStorage.getItem('profile') || null)
    // : null
    

    const [earnings, setEarnings] = useState([]);
    const [wallet, setWallet] = useState([]);

    const [rightTab, setRightTab] = useState('payout_request');

    const [message, setMessage] = useState('');
    const [messageGroupData, setMessageGroupData] = useState([]);

    const [dloading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState(Number(0));
    const [payoutRequestList, setPayoutRequestList] = useState([]);
    const [referralList, setReferralList] = useState([]);
    const [userProfile, setUserProfile] = useState();


    const getWallet = async () => {
        const res = await axios(`my/wallet`)
        setWallet(res.data)
    }
    const getUserPayoutRequest = async () => {
        setLoading(true)
        try {
            const res = await axios(`my/withdrawals`)
            setPayoutRequestList(res.data)
            setLoading(false)
            console.log(res);
        } catch (err) {
            setError(err)
            setLoading(false)
        }

    }

    const getReferals = async (cb) => {
        setLoading(true)
        try {
            const res = await axios(`my/referrals`)
            setReferralList(res.data)
            setLoading(false)
        } catch (err) {
            setError(err)
            setLoading(false)
        }

    }
    const getMyEarnings = async () => {
        setLoading(true)
        try {
            const res = await axios(`my/earnings`)
            setEarnings(res.data)
            setLoading(false)
        } catch (err) {
            setError(err)
            setLoading(false)
        }

    }
    useEffect(() => {
        setUserProfile(JSON.parse(window.localStorage.getItem('userProfile')))
    }, [])
    useEffect(() => {

        getReferals()
        getUserPayoutRequest()
        getWallet();
        getMyEarnings()
    }, [])

    const handleWithdrawalRequest = async (e) => {
        e.preventDefault();


        const user = Number(userProfile?.data?.userId);
        const amount = Number(withdrawAmount);
        if (amount > Number(wallet.balance)) {
            return toast.warn("Insufficient Amount", {
                autoClose: 3000,
            })
        }

        try {
            const res = await axios.post('withdraw', {
                user,
                amount
            });
            console.log(res);
            toast.success(`Withdrawal Request for $${amount} Sent`)
            getWallet();
            getUserPayoutRequest()

        } catch (error) {
            setError(error?.message);
            toast.error(error?.message)
        }

    }
    return (
        <>
            <Head>
                <title>Statistics</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className="col-span-3 border-x md:block">
                    <div className="border-b py-3 px-4">
                        {' '}
                        <span onClick={() => history.back()}>
                            <ArrowLeftIcon className="mr-4 inline-flex h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-leviplatte hover:text-white" />{' '}
                        </span>
                        <span className="text-xl font-bold uppercase"> Statistics</span>
                    </div>
                    <div className=' max-h-[98vh] overflow-auto'>
                        <ToastContainer />
                        <div className="border border-slate-400 rounded-md p-6 mx-4 my-3 ">
                            <div className="flex flex-col gap-5">
                                <span className="text-2xl font-bold">$ {wallet.balance ? (Number(wallet.balance).toFixed(2)) : '0.00'}  </span>
                                <span className="text-base lg:text-lg">Current Balance</span>
                            </div>
                        </div>
                        <div className="border border-gray-400 rounded-md p-6 py-4 mx-4  my-3" >
                            <div className="flex flex-col gap-5">
                                <span className="text-2xl font-bold">$ {wallet.pending ? (Number(wallet.pending).toFixed(2)) : '0.00'}  </span>
                                <span className="text-base lg:text-lg">Pending Balance</span>
                            </div>
                        </div>
                        <div className="border border-gray-400 rounded-md px-6 py-4 m-4 " >
                            <span className="text-lg font-bold">Request Payout </span>
                            <form action="" method="post" onSubmit={handleWithdrawalRequest}>
                                <div className="flex flex-row justify-between items-center">
                                    <input type="number"  placeholder={`$${wallet.balance ? (Number(wallet.balance).toFixed(2)) : '0.00'}`} onChange={(e) => setWithdrawAmount(Number(e.currentTarget.value))} className='px-4 py-3 w-3/5 border-slate-400 outline-slate-300 transition-all border rounded-lg my-2' name="amount" id="amount" />
                                    <div className="">
                                        <button className="px-6 py-3 hover:opacity-80 transition-opacity bg-leviplatte text-white outline-leviplatte rounded-lg" type='submit' role={'button'}>Request</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="border border-gray-400 rounded-md px-6 py-3 m-4 flex flex-col gap-y-3 items-start" >

                            <StatsTabButton
                                text={"Payout Request"}
                                Icon={CashIcon}
                                onClick={() => setRightTab('payout_request')}
                            />
                            <StatsTabButton
                                text={"Earnings"}
                                Icon={CurrencyDollarIcon}
                                onClick={() => setRightTab('earnings')}

                            />
                            <StatsTabButton
                                text={"Referals"}
                                Icon={UsersIcon}
                                onClick={() => setRightTab('referals')}

                            />
                        </div>

                    </div>
                </div>
                <div className="col-span-10 sm:col-span-9 sm:border-l md:col-span-5">
                    {rightTab === 'payout_request' && <PayoutsRequest data={payoutRequestList} />}
                    {rightTab === 'earnings' && <Earnings data={earnings} />}
                    {rightTab === 'referals' && <Referals data={referralList} />}
                </div>
            </Layout>
        </>
    )
}

const StatsTabButton = ({ Icon, text, onClick }) => {
    return (
        <button onClick={onClick} className="flex items-center gap-x-2 my-2 text-slate-800 hover:text-leviplatte transition-all">
            <Icon className="w-6 h-6 " />
            <span>{text}</span>
        </button>
    )
}


const PayoutsRequest = ({ data }) => {
    return (
        <div>
            <div className="border-b py-4 px-4">
                <span className="text-xl font-bold uppercase"> Payout Request</span>
            </div>
            <div className="p-4">
                <table className='table-auto text-left w-full'>
                    <thead className="px-2 py-3 border-b">
                        <tr className='!pb-4'>
                            <th>Invoice</th>
                            <th>Approve</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="font-light">
                        {
                            data && data.map((pr, i) => {
                                const { invoice, isApproved, amount, status, bankaccname } = pr;
                                return (
                                    <tr className="my-4 " key={i}>
                                        <td className="font-light">{invoice}</td>
                                        <td className="font-light">{isApproved ? "Approved" : "Not Approved"}</td>
                                        <td className="font-light">{amount}</td>
                                        <td className="font-light py-3">
                                            <span
                                                className={`px-3 py-2 font-normal 
                                            ${status === "approved" ? "bg-green-400" :
                                                        (status === "pending" ? "bg-leviplatte" :
                                                            (status === "declined" && "bg-red-500")
                                                        )}
                                              my-2 rounded-full text-white text-xs capitalize`}
                                            >{status}</span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const Earnings = ({ data }) => {
    return (
        <div>
            <div className="border-b py-4 px-4">
                <span className="text-xl font-bold uppercase"> Earnings</span>
            </div>
            <div className="p-4">
                <table className='table-auto text-left w-full'>
                    <thead className="px-2 py-3 border-b">
                        <tr className='!pb-4'>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody className="font-light">
                        {
                            data.map((er, i) => (
                                <tr key={i}>
                                    <td className='px-3 py-2 font-normal '>{er.description}</td>
                                    <td>{er.amount}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const Referals = ({ data }) => {
    return (
        <div>
            <div className="border-b py-3 px-4">
                <span className="text-xl font-bold uppercase">Referals</span>
            </div>
            <div className="p-4">
                <table className='table-auto text-left w-full'>
                    <thead className="px-2 py-3 border-b">
                        <tr className='!pb-4'>
                            <th>Display Name</th>
                            <th>UserName</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map((ref, i) => {
                                const {display_name, username, email} = ref;
                                return (
                                    <tr key={i}>
                                        <td className='px-3 py-2 font-normal '>{display_name}</td>
                                        <td>{username}</td>
                                        <td>{email}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Statistics