import React, { ReactNode } from 'react'

// What is being done here is that the children prop is being passed to the RootLayout component. This children prop contains the content of the specific page that is being rendered within this layout. By including {children} in the JSX, we ensure that the content of the page is displayed within the layout structure defined by RootLayout.
const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>{children}</div>
    )
}

export default RootLayout