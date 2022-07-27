import { useState, useEffect, useContext } from 'react'
import { InputBox, SettingsHeader, SettingsMainHeader } from './index'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import userContext from '../context/user/userContext';

const UserPasswordSettings = () => {
  const {updatePassword, loading, error} = useContext(userContext)
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setPassword({...password, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      const {newPassword, confirmPassword} = password
      if( newPassword.length >= 6 ){
        if(newPassword !== confirmPassword){
          toast.warning("Please confirm your password matches")
        }else{
          updatePassword(password)
          !error && setPassword({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
          })
        }
      }else{
        toast.error('Password minimum of 6 characters')
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
          <span className="text-xl font-bold">Password</span>
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
            label="Old Password"
            type="password"
            placeholder="Old Password"
            name='oldPassword'
            value={password.oldPassword}
            onChange={handleChange}
          />
          <InputBox
            label="New Password"
            type="password"
            placeholder="New Password"
            name='newPassword'
            value={password.newPassword}
            onChange={handleChange}
          />
          <InputBox
            label="Confirm Password"
            type="password"
            placeholder="****"
            name='confirmPassword'
            value={password.confirmPassword}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  )
}

export default UserPasswordSettings
