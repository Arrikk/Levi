import { useTheme } from 'next-themes'
import { useState, useEffect, useContext } from 'react'
import { SunIcon } from '@heroicons/react/outline'
import { MoonIcon } from '@heroicons/react/solid'
import userContext from './../context/user/userContext';

const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const {user, switchTheme} = useContext(userContext)

  useEffect(() => {
    setTheme(user?.display)
  }, [theme, user?.display])
  
  // changing the theme
  const handleThemeChange = () => {
    switchTheme()
  }
  
  const renderThemeChanger = () => {
    
    const currentTheme = theme === 'system' ? systemTheme : theme

    if (currentTheme === 'dark') {
      return (
        <SunIcon
          className="h-8 w-8 text-yellow-500"
          role="button"
          onClick={handleThemeChange}
        />
      )
    } else {
      return (
        <MoonIcon
          className="h-8 w-8 text-leviplatte"
          role="button"
          onClick={handleThemeChange}
        />
      )
    }
  }

  return <span className="pl-4">{renderThemeChanger()}</span>
}

export default ThemeSwitcher
