import React, { SVGProps } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
}

const SidebarRow = ({ Icon, title }: Props) => {
  return (
    <div className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3 font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-leviplatte">
      <Icon className="h-6 w-6 group-hover:text-leviplatte dark:group-hover:text-black" />
      <p className="hidden text-base font-light group-hover:text-leviplatte dark:group-hover:text-black md:inline-flex lg:text-xl">
        {title}
      </p>
    </div>
  )
}

export default SidebarRow
