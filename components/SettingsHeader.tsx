import { SVGProps } from 'react'
import { ChevronRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'

interface Props {
  // Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  text: string
  small?: string
  onClick?: () => void
  clas?: string
}

const SettingsHeader = ({ clas, text, onClick = () => {}, small }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-1 cursor-pointer items-center justify-between border-b py-3 px-4 hover:bg-leviplatte hover:text-white dark:hover:bg-white dark:hover:text-black ${clas}`}
    >
      <div>
        {/* <Icon className="h-6 w-6" /> */}
        <span className="font-normal">{text}</span>

        <small className="block">{small}</small>
      </div>
      <ChevronRightIcon className="h-6 w-6" />
    </div>
  )
}

interface PropsList {
  Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
  text: string
  slug: string
  small?: string
  onClick: () => void
}
export const SettingsHeaderList = ({
  text,
  slug,
  onClick = () => {},
  small,
  Icon,
}: PropsList) => {
  return (
    <Link href="/lists/[slug]" as={`/lists/${slug}`}>
      <div
        onClick={onClick}
        className="flex cursor-pointer items-center justify-between border-b py-3 px-4 hover:bg-leviplatte hover:text-white dark:hover:bg-white dark:hover:text-black"
      >
        <div>
          {/* <Icon className="h-6 w-6" /> */}
          <span className="font-normal">{text}</span>

          <small className="block">{small}</small>
        </div>
        <ChevronRightIcon className="h-6 w-6" />
      </div>
    </Link>
  )
}

export default SettingsHeader
