import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

// What is being done here is that the children prop is being passed to the RootLayout component. This children prop contains the content of the specific page that is being rendered within this layout. By including {children} in the JSX, we ensure that the content of the page is displayed within the layout structure defined by RootLayout.
const RootLayout = async ({ children }: { children: ReactNode }) => {
    // const isUserAuthenticated = await isAuthenticated();

    // if (!isUserAuthenticated) redirect('/sign-in');
    return (
        <div className='root-layout'>
            <nav>
                <Link href='/' className='flex items-center gap-2'>
                    <Image src="/logo.svg" height={32} width={38} alt='logo' />
                    <h2 className='text-primary-100'>PrepareGPT</h2>
                </Link>
            </nav>

            {children}
        </div>
    )
}

export default RootLayout