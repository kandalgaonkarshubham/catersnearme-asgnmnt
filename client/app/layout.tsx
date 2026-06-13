import { Inter } from "next/font/google"
import Link from "next/link"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <NuqsAdapter>
          <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-bg-base/80 backdrop-blur-md border-b border-border-custom">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-text-primary no-underline tracking-tight">
              <span className="w-2 h-2 rounded-full bg-accent-custom inline-block" />
              CaterersNearMe
            </Link>
            <Link href="/caterers" className="text-sm font-medium text-text-secondary no-underline px-3.5 py-1.5 rounded-sm transition-colors duration-150 hover:text-text-primary hover:bg-bg-elevated">
              Browse Caterers
            </Link>
          </nav>
          {children}
        </NuqsAdapter>
      </body>
    </html>
  )
}
