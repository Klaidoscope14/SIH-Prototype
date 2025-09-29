"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-slate-200 mb-4">404</div>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900 mb-2">
                Page Not Found
              </CardTitle>
              <CardDescription className="text-lg">
                The page you're looking for doesn't exist or has been moved.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6">
                Don't worry, it happens to the best of us. Let's get you back on track with your 
                Life Cycle Assessment journey.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="flex items-center gap-2">
                  <Link href="/">
                    <Home className="w-5 h-5" />
                    Go Home
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex items-center gap-2">
                  <Link href="/lca">
                    <Search className="w-5 h-5" />
                    Start LCA
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Helpful Links */}
          <div className="grid md:grid-cols-3 gap-4 text-left">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Get Started</h3>
                <p className="text-sm text-slate-600 mb-3">
                  New to LCA? Start with our guided assessment process.
                </p>
                <Link href="/lca" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Start Assessment →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Try Demo</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Explore our platform with sample data and examples.
                </p>
                <Link href="/lca/aluminium/phase-1?demo=1" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Try Sample Project →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Get Help</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Need assistance? Our team is here to help.
                </p>
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Contact Support →
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
