import type { Metadata } from "next"
import Link from "next/link"
import { Menu } from "lucide-react"
import "./globals.css"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ToastProvider } from "@/components/ui/toast"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: {
    template: "%s | Team WatchMen",
    default: "Team WatchMen - AI-Driven Life Cycle Assessment Platform"
  },
  description: "Comprehensive Life Cycle Assessment tools for sustainable manufacturing. AI-powered analytics for metals production with circularity insights and environmental impact optimization.",
  keywords: ["LCA", "Life Cycle Assessment", "sustainability", "manufacturing", "metals", "environmental impact", "AI", "circularity"],
  authors: [{ name: "Team WatchMen" }],
  creator: "Team WatchMen",
  publisher: "Team WatchMen",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://teamwatchmen.com",
    title: "Team WatchMen - AI-Driven Life Cycle Assessment Platform",
    description: "Comprehensive Life Cycle Assessment tools for sustainable manufacturing with AI-powered analytics.",
    siteName: "Team WatchMen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team WatchMen - AI-Driven Life Cycle Assessment Platform",
    description: "Comprehensive Life Cycle Assessment tools for sustainable manufacturing with AI-powered analytics.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <ToastProvider>
          <Navbar />
          <main className="min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {children}
              <Analytics/>
            </div>
          </main>
        </ToastProvider>
        <Footer />
      </body>
    </html>
  )
}

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-foreground">
              Team WatchMen
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Button asChild>
              <Link href="/lca">Start Assessment</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <Link
                    href="/about"
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/services"
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Services
                  </Link>
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                  <Button asChild className="w-full mt-4">
                    <Link href="/lca">Start Assessment</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Team WatchMen</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive Life Cycle Assessment tools for sustainable manufacturing.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/services" className="block text-sm text-muted-foreground hover:text-foreground">
                Services
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">LCA Tools</h4>
            <div className="space-y-2">
              <Link href="/lca" className="block text-sm text-muted-foreground hover:text-foreground">
                Start Assessment
              </Link>
              <Link href="/lca/steel" className="block text-sm text-muted-foreground hover:text-foreground">
                Steel Assessment
              </Link>
              <Link href="/lca/aluminum" className="block text-sm text-muted-foreground hover:text-foreground">
                Aluminum Assessment
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Resources</h4>
            <div className="space-y-2">
              <Link href="/api/health" className="block text-sm text-muted-foreground hover:text-foreground">
                API Status
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground">
                Support
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground">
                Documentation
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Team WatchMen. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}