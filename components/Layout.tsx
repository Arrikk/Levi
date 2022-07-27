import { Sidebar, MobileMenu } from './index'
import { ToastContainer } from 'react-toastify'

interface ChildProps {
  children: JSX.Element[]
}

const Layout = ({ children }: ChildProps) => {
  return (
    <div className="mx-auto font-roboto lg:max-w-7xl">
      <main className="grid grid-cols-10">
        <Sidebar />
        {/* <ToastContainer /> */}

        {/* OTHER COMPOENETS */}
        {children}
        {/* OTHER COMPOENETS */}
<div className="h-16 w-full" />
        <MobileMenu />
      </main>
    </div>
  )
}

export default Layout
