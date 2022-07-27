import {
  SettingsHeader,
  SettingsMainHeader,
  ThemeSwitcher,
  Toggler,
} from './index'

const UserDisplaySettings = () => {
  return (
    <div className="max-h-screen border-r">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-xl font-bold">DISPLAY</span>
      </div>

      <SettingsMainHeader text="Customize your view" />

      <SettingsHeader onClick={() => {}} text="Language" small="English" />

      <div className="flex items-center justify-between border-b p-4">
        <span> Dark mode </span>
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export default UserDisplaySettings
