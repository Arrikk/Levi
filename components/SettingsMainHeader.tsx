import React from 'react'

interface Prop {
    text: string
}

const SettingsMainHeader = ({ text }: Prop) => {
  return (
    <div className="border-t-8 border-b py-3 px-4">
      <span className="font-bold">{text}</span>
    </div>
  )
}

export default SettingsMainHeader
