import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Database, Brain, CheckCircle, Clock } from "lucide-react"

interface MetalPageProps {
  params: {
    metal: string
  }
}

const validMetals = ["aluminium", "aluminum", "copper", "steel", "calcium", "lithium"]

const metalData: Record<string, { name: string; description: string; icon: string }> = {
  aluminium: {
    name: "Aluminium",
    description: "Lightweight, corrosion-resistant metal with excellent recyclability",
    icon: "Al"
  },
  aluminum: {
    name: "Aluminum",
    description: "Lightweight, corrosion-resistant metal with excellent recyclability",
    icon: "Al"
  },
  copper: {
    name: "Copper", 
    description: "High conductivity metal essential for electrical applications",
    icon: "Cu"
  },
  steel: {
    name: "Steel",
    description: "Strong, versatile alloy with wide industrial applications",
    icon: "Fe"
  },
  calcium: {
    name: "Calcium",
    description: "Essential mineral for construction and chemical industries",
    icon: "Ca"
  },
  lithium: {
    name: "Lithium",
    description: "Critical battery metal for energy storage and electric vehicles",
    icon: "Li"
  }
}

export default function MetalPage({ params }: MetalPageProps) {
  const { metal } = params
  
  // Validate metal parameter
  if (!validMetals.includes(metal)) {
    redirect("/lca")
  }

  const metalInfo = metalData[metal]

  return (
    <div className="min-h-screen bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-slate-500">
            <li><Link href="/lca" className="hover:text-slate-700">LCA</Link></li>
            <li>/</li>
            <li className="text-slate-900 font-medium">{metalInfo.name}</li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-slate-600">{metalInfo.icon}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {metalInfo.name} Assessment
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {metalInfo.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-500">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Database className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Phase 1: Inputs & Baseline Outputs</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">Available Now</span>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base">
                  Collect and analyze your production data to establish baseline environmental impacts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-slate-900">Phase 1 captures:</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>Product:</strong> Specifications, dimensions, and material composition</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>Route:</strong> Manufacturing processes and production pathways</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>Energy:</strong> Electricity, fuel consumption, and energy sources</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>Transport:</strong> Logistics, distances, and transportation modes</span>
                    </li>
                  </ul>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/lca/${metal}/phase-1`}>Start Phase 1</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-500 border-orange-200">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Phase 2: Analytics & ML</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-orange-600 font-medium">Under Construction</span>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base">
                  Advanced AI-powered analysis with intelligent insights and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-slate-900">Phase 2 will add:</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      <span><strong>AI Analysis:</strong> Machine learning-powered impact predictions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      <span><strong>Sankey Diagrams:</strong> Visual material and energy flow analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      <span><strong>Recommendations:</strong> AI-driven optimization suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      <span><strong>Scenario Modeling:</strong> What-if analysis and comparisons</span>
                    </li>
                  </ul>
                </div>
                <Button asChild variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                  <Link href={`/lca/${metal}/phase-2`}>View Status</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Button asChild variant="ghost" className="text-slate-600 hover:text-slate-900">
            <Link href="/lca">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Metal Selection
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
