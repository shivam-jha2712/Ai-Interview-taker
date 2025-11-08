import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'
// What is being done here is that the children prop is being passed to the AuthLayout component. This children prop contains the content of the specific page that is being rendered within this layout. By including {children} in the JSX, we ensure that the content of the page is displayed within the layout structure defined by AuthLayout.
const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect('/');
  return (
    <div className="auth-layout">{children}</div>
  )
}

export default AuthLayout