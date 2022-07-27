import { ProfileHeader, ProfileMedia } from './index'

const PersonalProfile = ({myProfile}) => {
  return (
    <div className="col-span-10 border-x sm:col-span-9 md:col-span-8 lg:col-span-5">
      <ProfileHeader myProfile={myProfile}  />
      <ProfileMedia myProfile={myProfile} />
    </div>
  )
}

export default PersonalProfile
