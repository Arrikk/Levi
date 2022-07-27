import { useState } from 'react'
import { SettingsMainHeader } from './index'
import Toggler from './Toggler'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

const PrivacySettings = () => {
  const { user } = useSelector((state: any) => ({
    ...state.auth,
  }))

  const userProfile: any = JSON.parse(
    localStorage?.getItem('userProfile') || ''
  )

  const [activityStatus, setActivityStatus]: any = useState(
    userProfile?.data.show_activity
  )

  const handleShowActivity = () => {
    const user_id = userProfile.data.userId

    let profileToken: any = JSON.parse(localStorage?.getItem('profile') || '')
    profileToken = profileToken.token

    axios
      .post(
        `settings/privacy`,
        {
          id: user_id,
          name: 'show_activity',
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token || profileToken}}`,
          },
        }
      )
      .then((data) => {
        setActivityStatus(data.data.privacy)
        userProfile.data.show_activity = activityStatus

        localStorage?.setItem('userProfile', JSON.stringify(userProfile))
      })
      .catch((err) => console.log('An error occured', err.response.data))
  }

  return (
    <div className="max-h-screen border-r">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-xl font-bold">PRIVACY AND SAFETY</span>
      </div>

      <SettingsMainHeader text="Privacy" />
      <div className="flex items-center justify-between border-b p-4">
        <span> Show activity status </span>

        <input
          type="checkbox"
          className="toggle toggle-secondary"
          name="show_activity"
          onChange={handleShowActivity}
          checked={activityStatus}
        />
      </div>
    </div>
  )
}

export default PrivacySettings
