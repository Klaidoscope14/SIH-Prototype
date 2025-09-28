"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, AlertCircle } from "lucide-react"
import type { Phase1Inputs, CompositionPart, Metal } from "@/lib/types"
import { validatePercentSum } from "@/lib/calculators"

interface StepProductCompositionProps {
  inputs: Phase1Inputs
  onUpdate: (updates: Partial<Phase1Inputs>) => void
  metal: Metal
}

const metalData: Record<Metal, { name: string; icon: string }> = {
  aluminium: { name: "Aluminium", icon: "Al" },
  copper: { name: "Copper", icon: "Cu" },
  steel: { name: "Steel", icon: "Fe" }
}

export default function StepProductComposition({ inputs, onUpdate, metal }: StepProductCompositionProps) {
  const [composition, setComposition] = useState<CompositionPart[]>(inputs.composition)

  const handleProductNameChange = (value: string) => {
    onUpdate({ product_name: value })
  }

  const handleFunctionalUnitChange = (value: number) => {
    onUpdate({ functional_unit_kg: value })
  }

  const handleCompositionChange = <K extends keyof CompositionPart>(index: number, field: K, value: CompositionPart[K]) => {
    const newComposition = composition.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    )
    setComposition(newComposition)
    onUpdate({ composition: newComposition })
  }

  const addCompositionPart = () => {
    const newComposition = [...composition, { component: "", percent: 0 }]
    setComposition(newComposition)
    onUpdate({ composition: newComposition })
  }

  const removeCompositionPart = (index: number) => {
    if (composition.length > 1) {
      const newComposition = composition.filter((_, i) => i !== index)
      setComposition(newComposition)
      onUpdate({ composition: newComposition })
    }
  }

  const validation = validatePercentSum(composition.map(c => ({ label: c.component, value: c.percent })))
  const total = validation.total

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="product_name">Product Name</Label>
        <Input
          id="product_name"
          value={inputs.product_name}
          onChange={(e) => handleProductNameChange(e.target.value)}
          placeholder="Enter product name"
        />
      </div>

      <div>
        <Label htmlFor="functional_unit">Functional Unit (kg)</Label>
        <Input
          id="functional_unit"
          type="number"
          value={inputs.functional_unit_kg}
          onChange={(e) => handleFunctionalUnitChange(parseFloat(e.target.value) || 0)}
          placeholder="1000"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <Label>Composition</Label>
          <div className="flex items-center gap-2">
            <Badge variant={validation.ok ? "default" : "destructive"}>
              Total: {total}%
            </Badge>
            <Button variant="outline" size="sm" onClick={addCompositionPart}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              {metalData[metal]?.name} ({metalData[metal]?.icon}) - Composition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {composition.map((part, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="flex-1">
                    <Input
                      value={part.component}
                      onChange={(e) => handleCompositionChange(index, "component", e.target.value)}
                      placeholder="Component name"
                    />
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      value={part.percent}
                      onChange={(e) => handleCompositionChange(index, "percent", parseFloat(e.target.value) || 0)}
                      placeholder="%"
                    />
                  </div>
                  {composition.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCompositionPart(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {!validation.ok && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Composition percentages must sum to 100%
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
