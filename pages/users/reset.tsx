import Link from 'next/link'
import { Button, InputBox } from '../../components'

const AuthPage = () => {
  return (
    <main className="grid h-screen grid-cols-2">
      <div className="hidden bg-leviplatte sm:inline-flex">
        <h1>Leviplatte</h1>
        <h2>Sign up to support your favorite creators</h2>
      </div>
      <div className="col-span-2 bg-black p-4 sm:col-span-1">
        <div className="mx-auto mt-28 max-w-lg">
          <h1 className="font-bold text-white">Restore Access</h1>
          <small className="mb-10 text-white">
            If you have an Leviplatte account, you will receive a password reset
            link to this e-mail.
          </small>
          <InputBox placeholder="Email" type="email" color="white" />
          {/* <span className="mb-4 text-center text-leviplatte"> */}
          <Link href="/users/auth/signin">
            <span className="mb-4 cursor-pointer text-center text-leviplatte">
              Back to Sign in
            </span>
          </Link>
          {/* </span> */}
          <Button
            text="Reset Password"
            bgColor="leviplatte"
            textColor="white"
          />
        </div>
      </div>
    </main>
  )
}

export default AuthPage
