import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

// CHANGING THE FONT
const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepGPT",
  description: "An Ai powered Mock Interview Prepration Platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // This classname convention of putting it to the dark mode makes sure that it stays in dark thus when we use it in light mode as well. Other Components of ShadCN is not going to affect the design of the app. 
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
