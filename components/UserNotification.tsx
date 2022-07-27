import React from 'react'
import { SettingsHeader, SettingsMainHeader } from './index'

const UserNotification = () => {
  return (
    <div className="max-h-screen border-r">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-xl font-bold">NOTIFICATION</span>
      </div>

      <SettingsMainHeader text="Preferences" />
      <SettingsHeader onClick={() => {}} text="Push notifications" />
      <SettingsHeader onClick={() => {}} text="Email notifications" />
      <SettingsHeader onClick={() => {}} text="Site notifications" />
      <SettingsHeader onClick={() => {}} text="Toast notifications" />
      <SettingsHeader onClick={() => {}} text="SMS notifications" />

      <SettingsMainHeader text="Other" />
      <SettingsHeader onClick={() => {}} text="Telegram bot" />
    </div>
  )
}

export default UserNotification
