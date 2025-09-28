import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, HelpCircle } from "lucide-react"

export default function LCAPage() {
  const metals = [
    { 
      id: "aluminum", 
      name: "Aluminium", 
      description: "Lightweight, corrosion-resistant metal with excellent recyclability",
      icon: "Al" 
    },
    { 
      id: "copper", 
      name: "Copper", 
      description: "High conductivity metal essential for electrical applications",
      icon: "Cu"
    },
    { 
      id: "steel", 
      name: "Steel", 
      description: "Strong, versatile alloy with wide industrial applications",
      icon: "Fe"
    },
    { 
      id: "calcium", 
      name: "Calcium", 
      description: "Essential mineral for construction and chemical industries",
      icon: "Ca"
    },
    { 
      id: "lithium", 
      name: "Lithium", 
      description: "Critical battery metal for energy storage and electric vehicles",
      icon: "Li"
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Start an Assessment
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Select the metal type you want to assess to begin your AI-driven Life Cycle Assessment journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            {metals.map((metal) => (
              <Card key={metal.id} className="hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500">
                <CardHeader className="text-center">
                  <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-slate-600">{metal.icon}</span>
                  </div>
                  <CardTitle className="text-2xl">{metal.name}</CardTitle>
                  <CardDescription className="text-base">
                    {metal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button asChild className="w-full">
                    <Link href={`/lca/${metal.id}`}>Select</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Settings className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Project Settings</h3>
                <p className="text-blue-800 text-sm">
                  You can change metal later in Project Settings.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-slate-600 mb-4">
            <HelpCircle className="w-5 h-5" />
            <span>Need help choosing the right metal type?</span>
          </div>
          <div className="space-x-4">
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Contact our experts →
            </Link>
            <span className="text-slate-400">|</span>
            <Link
              href="/services"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View our services →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}