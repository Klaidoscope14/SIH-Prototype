import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Bot, 
  RotateCcw, 
  BarChart3, 
  FileText, 
  Target, 
  Calculator, 
  CheckCircle,
  TrendingUp,
  PieChart
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 -mx-4 sm:-mx-6 lg:-mx-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              AI-Driven LCA for Metals
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Transform your metal manufacturing with intelligent Life Cycle Assessment. 
              Get instant insights, optimize circularity, and make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/lca">Start an Assessment</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
                <Link href="/lca/aluminium/phase-1?demo=1">Try a Sample Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-20 -mx-4 sm:-mx-6 lg:-mx-8 bg-slate-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful AI-driven tools that make LCA accessible and actionable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Automated LCA</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  AI-powered analysis that reduces assessment time from weeks to hours
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Circularity Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Identify opportunities to close material loops and reduce waste
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Scenario Compare</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Compare different production scenarios and optimize for sustainability
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">One-click Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Generate professional reports and compliance documentation instantly
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 -mx-4 sm:-mx-6 lg:-mx-8 bg-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to transform your metal manufacturing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">1. Define</h3>
              <p className="text-slate-600 text-lg">
                Input your metal type, production volume, and key parameters. Our AI guides you through the process.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">2. Estimate</h3>
              <p className="text-slate-600 text-lg">
                Our AI engine calculates environmental impacts across all lifecycle stages using industry databases.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">3. Decide</h3>
              <p className="text-slate-600 text-lg">
                Get actionable insights and recommendations to optimize your processes and reduce environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Visualization Section */}
      <section className="py-20 -mx-4 sm:-mx-6 lg:-mx-8 bg-slate-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Visualize Your Impact
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Interactive dashboards and visualizations to understand your environmental footprint
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <CardTitle>Sankey Diagram (Mock)</CardTitle>
                </div>
                <CardDescription>
                  Material flow visualization showing inputs, processes, and outputs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-16 h-16 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500">Interactive Sankey visualization will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  <CardTitle>Impact Compare (Mock)</CardTitle>
                </div>
                <CardDescription>
                  Compare environmental impacts across different scenarios and materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500">Comparison charts will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-20 -mx-4 sm:-mx-6 lg:-mx-8 bg-slate-900">
        <div className="px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to explore?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join leading manufacturers who are already using AI-driven LCA to optimize their metal production
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/lca">Start Your Assessment</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}