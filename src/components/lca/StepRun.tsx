"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Loader2, AlertCircle, BarChart3 } from "lucide-react"
import type { Phase1Inputs, Phase1Results } from "@/lib/types"
import { calcPhase1 } from "@/lib/calculators"
import { formatCO2e, formatEnergy, formatVolume, formatNumber } from "@/lib/format"
import ResultsPreview from "./ResultsPreview"

interface StepRunProps {
  inputs: Phase1Inputs
  onResults: (results: Phase1Results) => void
}

export default function StepRun({ inputs, onResults }: StepRunProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<Phase1Results | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runAssessment = async () => {
    setIsRunning(true)
    setError(null)
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const calculatedResults = calcPhase1(inputs)
      setResults(calculatedResults)
      onResults(calculatedResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during calculation")
    } finally {
      setIsRunning(false)
    }
  }

  // Auto-run on mount
  useEffect(() => {
    runAssessment()
  }, [])

  if (isRunning) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-medium mb-2">Running Assessment</h3>
            <p className="text-gray-600">
              Calculating your LCA results based on the provided inputs...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-medium text-red-900">Assessment Failed</h3>
            </div>
            <p className="text-red-800 mb-4">{error}</p>
            <Button onClick={runAssessment} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Ready to Run Assessment</h3>
            <p className="text-gray-600 mb-4">
              Click the button below to calculate your LCA results
            </p>
            <Button onClick={runAssessment} size="lg">
              <BarChart3 className="w-5 h-5 mr-2" />
              Run Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-medium text-green-900">Assessment Complete</h3>
          </div>
          <p className="text-green-800">
            Your Phase 1 LCA assessment has been completed successfully. 
            The results are displayed below.
          </p>
        </CardContent>
      </Card>

      <ResultsPreview results={results} />
    </div>
  )
}
