import { useState, useEffect, useContext } from 'react'
import { InputBox, SettingsHeader, SettingsMainHeader } from './index'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import userContext from './../context/user/userContext';

const UserSubscriptionSettings = () => {
  const {getUser, user, updateSubscriptionSettings, loading} = useContext(userContext)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    setAmount(user?.subscriptionSetting.amount)
  }, [])

  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      if(amount >= 5 || amount == 0){
        updateSubscriptionSettings(amount)
      }
  }

  return (
    <div className="max-h-screen border-r">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center">
          <Link href="/profile">
            <span className="md:hidden">
              <ArrowLeftIcon className="mr-4 inline-flex h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-leviplatte hover:text-white" />{' '}
            </span>
          </Link>
          <span className="text-xl font-bold">Subscription</span>
        </div>
        {loading ? <button class="btn btn-square loading bg-leviplatte"></button> : <button
          className="rounded-full loading bg-leviplatte p-2 px-5 font-bold text-white"
          onClick={handleSubmit}
        >
          {' '}
          SAVE
        </button>}
      </div>
      <div className="p-4">
        <form>
          <InputBox
            label="Price"
            type="number"
            placeholder="$5"
            value={amount}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  )
}

export default UserSubscriptionSettings
