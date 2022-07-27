import React, {useContext} from 'react'
import { SettingsHeader, SettingsMainHeader } from './index'
import { useDispatch, useSelector } from 'react-redux'
import { updateSettings } from './../redux/features/settings.slice'
import userContext from './../context/user/userContext';

const UserAccountSettings = () => {
  const dispatch = useDispatch()
  const {getUser, user} = useContext(userContext)

  return (
    <div className="max-h-screen border-r">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-xl font-bold">ACCOUNT</span>
      </div>

      <SettingsMainHeader text="Account Info" />
      <SettingsHeader onClick={() => {}} text="Username" small={`@${user?.username}`} />
      <SettingsHeader
        onClick={() => {}}
        text="Email"
        small={`${user?.email}`}
      />
      <SettingsHeader onClick={() => {}} text="Phone Number" />

      {/* <SettingsMainHeader text="Connected Account" />
      <SettingsHeader
        onClick={() => {}}
        text="Connect another Leviplatte account"
      /> */}

      <SettingsMainHeader text="Security" />
      <SettingsHeader
            onClick={() => dispatch(updateSettings('password'))}
            text="Password"
          />
      {/* <SettingsHeader onClick={() => {}} text="Login session" />
      <SettingsHeader onClick={() => {}} text="Two step verification" /> */}

      <SettingsMainHeader text="Account Management" />
      <SettingsHeader onClick={() => {}} text="Delete Account" />
    </div>
  )
}

export default UserAccountSettings
