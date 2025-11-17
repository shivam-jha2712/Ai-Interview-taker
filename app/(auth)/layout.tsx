import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'
// What is being done here is that the children prop is being passed to the AuthLayout component. This children prop contains the content of the specific page that is being rendered within this layout. By including {children} in the JSX, we ensure that the content of the page is displayed within the layout structure defined by AuthLayout.
const AuthLayout = async ({ children }: { children: ReactNode }) => {
  // const isUserAuthenticated = await isAuthenticated();

  // if (!isUserAuthenticated) redirect('/');

  // Due to the above logic of having the authentication check in the root layout itself, we do not need to have it here again. And thus this code is commented out. Also it was leading to too many calls in my sign in now it is fixed.
  return (
    <div className="auth-layout">{children}</div>
  )
}

export default AuthLayout