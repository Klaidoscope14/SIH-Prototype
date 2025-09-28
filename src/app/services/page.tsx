import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Construction } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            AI-driven Life Cycle Assessment and Circularity Analytics for metal manufacturing
          </p>
        </div>

        {/* Services List */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* LCA Service */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Life Cycle Assessment (LCA) for Metals</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Comprehensive environmental impact assessment for metal production processes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>AI-powered data collection and analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Multi-metal support (Steel, Aluminum, Copper, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Real-time impact calculations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Automated report generation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Compliance with ISO 14040/14044 standards</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Circularity Analytics Service */}
            <Card className="hover:shadow-lg transition-shadow border-orange-200">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Construction className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl">Circularity Analytics</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Advanced circular economy insights and optimization recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Construction className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-orange-800">Phase 2 - Under Construction</span>
                  </div>
                  <p className="text-orange-700 text-sm">
                    Coming soon: Advanced circularity metrics, material flow optimization, and waste reduction strategies.
                  </p>
                </div>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">⏳</span>
                    <span>Material flow analysis and optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">⏳</span>
                    <span>Circular economy scoring and benchmarking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">⏳</span>
                    <span>Waste reduction recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">⏳</span>
                    <span>Recycling and reuse optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Launch LCA CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Launch Your LCA?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your AI-driven Life Cycle Assessment today and discover opportunities to optimize your metal manufacturing processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-xl px-12 py-6 bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/lca">Launch LCA</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-xl px-12 py-6 bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/lca/aluminium/phase-1?demo=1">Try Sample Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
