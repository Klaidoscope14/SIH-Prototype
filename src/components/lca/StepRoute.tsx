"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import type { Phase1Inputs, RouteType } from "@/lib/types"

interface StepRouteProps {
  inputs: Phase1Inputs
  onUpdate: (updates: Partial<Phase1Inputs>) => void
}

const routeOptions = [
  { value: "primary", label: "Primary (Mined)", description: "Raw materials from mining operations" },
  { value: "secondary", label: "Secondary (Recycled)", description: "Materials from recycling processes" },
  { value: "hybrid", label: "Hybrid (Mixed)", description: "Combination of primary and secondary materials" }
]

export default function StepRoute({ inputs, onUpdate }: StepRouteProps) {
  const [route, setRoute] = useState<RouteType>(inputs.route.route)
  const [plantYield, setPlantYield] = useState(inputs.route.plant_yield_pct)
  const [recycledContent, setRecycledContent] = useState(inputs.route.recycled_content_pct || 0)
  const [byproductCredit, setByproductCredit] = useState(inputs.route.byproduct_credit_pct || 0)

  const handleRouteChange = (value: string) => {
    const newRoute = value as RouteType
    setRoute(newRoute)
    onUpdate({
      route: {
        ...inputs.route,
        route: newRoute,
        recycled_content_pct: newRoute === "primary" ? 0 : recycledContent
      }
    })
  }

  const handlePlantYieldChange = (value: number) => {
    setPlantYield(value)
    onUpdate({
      route: {
        ...inputs.route,
        plant_yield_pct: value
      }
    })
  }

  const handleRecycledContentChange = (value: number) => {
    setRecycledContent(value)
    onUpdate({
      route: {
        ...inputs.route,
        recycled_content_pct: value
      }
    })
  }

  const handleByproductCreditChange = (value: number) => {
    setByproductCredit(value)
    onUpdate({
      route: {
        ...inputs.route,
        byproduct_credit_pct: value
      }
    })
  }

  const showRecycledContent = route === "secondary" || route === "hybrid"

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Production Route</Label>
        <RadioGroup value={route} onValueChange={handleRouteChange} className="mt-3">
          {routeOptions.map((option) => (
            <div key={option.value} className="flex items-start space-x-3">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={option.value} className="font-medium">
                  {option.label}
                </Label>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Production Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="plant_yield">Plant Yield (%)</Label>
            <Input
              id="plant_yield"
              type="number"
              value={plantYield}
              onChange={(e) => handlePlantYieldChange(parseFloat(e.target.value) || 0)}
              placeholder="85"
              min="0"
              max="100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Percentage of input material that becomes final product
            </p>
          </div>

          {showRecycledContent && (
            <div>
              <Label>Recycled Content (%)</Label>
              <div className="space-y-3">
                <Slider
                  value={[recycledContent]}
                  onValueChange={([value]) => handleRecycledContentChange(value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">0%</span>
                  <Input
                    type="number"
                    value={recycledContent}
                    onChange={(e) => handleRecycledContentChange(parseFloat(e.target.value) || 0)}
                    className="w-20 text-center"
                    min="0"
                    max="100"
                  />
                  <span className="text-sm text-gray-500">100%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Percentage of recycled material used in production
              </p>
            </div>
          )}

          <div>
            <Label>Byproduct Credit (%)</Label>
            <div className="space-y-3">
              <Slider
                value={[byproductCredit]}
                onValueChange={([value]) => handleByproductCreditChange(value)}
                max={20}
                step={0.1}
                className="w-full"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">0%</span>
                <Input
                  type="number"
                  value={byproductCredit}
                  onChange={(e) => handleByproductCreditChange(parseFloat(e.target.value) || 0)}
                  className="w-20 text-center"
                  min="0"
                  max="20"
                  step="0.1"
                />
                <span className="text-sm text-gray-500">20%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Optional credit for valuable byproducts (e.g., slag in steel production)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
