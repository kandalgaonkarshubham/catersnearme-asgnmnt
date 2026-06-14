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
          <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 h-20 bg-background/90 backdrop-blur-sm border-b border-border/50">
            <Link href="/" className="flex items-center gap-2 text-xl font-serif font-black text-primary no-underline tracking-tight">
              CaterersNearMe
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/caterers" className="text-sm font-semibold text-foreground no-underline transition-colors duration-200 hover:text-primary">
                Explore Caterers
              </Link>
              <Link href="/caterers" className="hidden sm:block text-xs font-bold uppercase tracking-widest bg-foreground text-background px-5 py-2.5 rounded-sm no-underline transition-all duration-200 hover:bg-primary hover:text-white">
                Book Now
              </Link>
            </div>
          </nav>
          {children}
        </NuqsAdapter>
      </body>
    </html>
  )
}
