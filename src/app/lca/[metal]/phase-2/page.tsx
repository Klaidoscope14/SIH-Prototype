"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Construction, BarChart3, GitCompare, Brain, Lightbulb, FileText, Zap } from "lucide-react"

interface Phase2PageProps {
  params: {
    metal: string
  }
}

const metalData: Record<string, { name: string; icon: string }> = {
  aluminium: { name: "Aluminium", icon: "Al" },
  copper: { name: "Copper", icon: "Cu" },
  steel: { name: "Steel", icon: "Fe" }
}

const upcomingFeatures = [
  {
    icon: BarChart3,
    title: "Sankey Flow Diagrams",
    description: "Interactive flow visualization showing material and energy flows through the production process"
  },
  {
    icon: GitCompare,
    title: "Scenario Comparison",
    description: "Compare different production scenarios and their environmental impacts side-by-side"
  },
  {
    icon: Brain,
    title: "AI Data Imputation",
    description: "Intelligent filling of missing data points using machine learning algorithms"
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description: "AI-powered suggestions for reducing environmental impact and improving efficiency"
  },
  {
    icon: FileText,
    title: "Automated Report PDF",
    description: "Generate comprehensive LCA reports in PDF format with charts and analysis"
  }
]

export default function Phase2Page({ params }: Phase2PageProps) {
  const { metal } = params

  return (
    <div className="min-h-screen bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-slate-500">
            <li><Link href="/lca" className="hover:text-slate-700">LCA</Link></li>
            <li>/</li>
            <li><Link href={`/lca/${metal}`} className="hover:text-slate-700">{metalData[metal]?.name}</Link></li>
            <li>/</li>
            <li className="text-slate-900 font-medium">Phase 2 - Analytics & ML</li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Header Card */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-orange-900 flex items-center gap-3">
                    <Zap className="w-8 h-8" />
                    Phase 2: Analytics & ML
                  </CardTitle>
                  <CardDescription className="text-orange-800 mt-2">
                    Advanced analytics and machine learning capabilities for comprehensive LCA insights
                  </CardDescription>
                </div>
                <Badge variant="destructive" className="text-sm px-3 py-1">
                  <Construction className="w-4 h-4 mr-1" />
                  Under Construction
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Upcoming Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Features</CardTitle>
              <CardDescription>
                We're working hard to bring you these powerful analytics tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Development Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Development Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    <strong>In Progress:</strong> Core analytics engine and data processing pipeline
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    <strong>Next:</strong> Sankey diagram visualization and scenario comparison tools
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    <strong>Planned:</strong> AI recommendations and automated reporting
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-gray-900 mb-1">
                Ready to get started?
              </h3>
              <p className="text-sm text-gray-600">
                Complete your Phase 1 assessment to prepare for advanced analytics
              </p>
            </div>
            <Link href={`/lca/${metal}/phase-1`}>
              <Button className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Phase 1
              </Button>
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Questions about Phase 2?</h3>
          <p className="text-blue-800 text-sm mb-4">
            We're excited to share more details about our upcoming analytics features. 
            Contact us to learn more about the development timeline and early access opportunities.
          </p>
          <Link
            href="/contact"
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            Contact Our Team →
          </Link>
        </div>
      </div>
    </div>
  )
}