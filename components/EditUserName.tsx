import { InputBox, SettingsHeader, SettingsMainHeader } from './index'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/outline'

const EditUserProfile = () => {
  return (
    <div className="max-h-screen border-r">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center">
          <Link href="/profile">
            <span className="md:hidden">
              <ArrowLeftIcon className="mr-4 inline-flex h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-leviplatte hover:text-white" />{' '}
            </span>
          </Link>
          <span className="text-xl font-bold">CHANGE USERNAME</span>
        </div>
      </div>
      <div className="p-4">
        <InputBox label="Username" type="text" placeholder="@username" />
      </div>
      <div>
        <SettingsMainHeader text="Subscription" />
        <SettingsHeader
          onClick={() => {}}
          text="Subscription price and bundles"
        />
      </div>
      <button className="rounded-full bg-leviplatte p-2 px-5 font-bold text-white">
        {' '}
        SAVE
      </button>
    </div>
  )
}

export default EditUserProfile
