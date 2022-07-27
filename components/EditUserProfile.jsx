import { useState, useEffect, useContext, useRef } from 'react'
import { InputBox, SettingsHeader, SettingsMainHeader } from './index'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import axios from 'axios'
import userContext from './../context/user/userContext';

const EditUserProfile = () => {
  const [formDetails, setFormDetails] = useState({})
  const router = useRouter()
  const {getUser, user, updateUser, loading} = useContext(userContext)
  
  const [ usernameExists, setUsernameExists ] = useState(false)
  
  const buttonRef = useRef()
  
    useEffect(() => {
      getUser();
      // !user && router.push('/users/auth/signin')
      setFormDetails({
        username: user?.username,
        display_name: user?.name,
        bio: user?.bio,
        location: user?.location,
        website_url: user?.website_url
      })
    }, [loading])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormDetails({ ...formDetails, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser(formDetails)
  }

  const handleCheckUsername = (e) => {
    if(user?.username !== formDetails.username){
      axios
      .post('user/check', { check: formDetails.username })
      .then((data) => {
        setUsernameExists(data.data.exists)
        buttonRef.current.disabled = false
      })
      .catch((err) => {
        console.log('An error occured', err)
      })
    }
    handleChange(e);
  }

  return (
    <div className="border-r overflow-y-scroll no-scrollbar">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center">
          <span className="text-sm sm:text-xl font-bold">EDIT PROFILE</span>
        </div>
        {loading ? <button ref={buttonRef} class="btn btn-square loading bg-leviplatte"></button> : <button
          className="rounded-full loading bg-leviplatte p-2 px-5 font-bold text-white text-sm sm:text-base"
          onClick={handleSubmit} disabled={usernameExists}
        >
          {' '}
          SAVE
        </button>}
      </div>
      <div className="p-4">
        <form>
          <InputBox
            label="Username"
            type="text"
            name="username"
            placeholder="@username"
            value={formDetails?.username}
            className={`${usernameExists === true ? "border border-[red] focus:border-[red] focus:ring-[red] outline-[red]" : ""}`}
            onChange={handleCheckUsername}
            disabled
          />
          {usernameExists ? <div className="bg-[white] w-[100%] mb-4 mt-[-.7rem] rounded-xl">
            <span className="text-[red]">Username already exists</span>
          </div> : null}

          <InputBox
            label="Display Name"
            type="text"
            placeholder="Display Name"
            name="display_name"
            onChange={handleChange}
            value={formDetails?.display_name}
          />
          <InputBox
            label="Bio"
            type="text"
            placeholder="Bio"
            onChange={handleChange}
            name="bio"
            value={formDetails?.bio}
          />
          <InputBox
            label="Location"
            type="text"
            placeholder="Location"
            onChange={handleChange}
            name="location"
            value={formDetails?.location}
          />
          <InputBox
            label="Website URL"
            type="website_url"
            placeholder="Website URL"
            onChange={handleChange}
            name="website_url"
            value={formDetails?.website_url}
          />
          <InputBox
            label="Amazon wishlist"
            type="text"
            placeholder="Amazon wishlist"
          />
        </form>
      </div>
      <div>
        <SettingsMainHeader text="Subscription" />
        <SettingsHeader
          onClick={() => { }}
          text="Subscription price and bundles"
        />
      </div>
      <div>
        <SettingsMainHeader text="Related Settings" />
        <SettingsHeader onClick={() => { }} text="Privacy and safety" />
      </div>
    </div>
  )
}

export default EditUserProfile
