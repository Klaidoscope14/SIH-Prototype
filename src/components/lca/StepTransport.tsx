"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import type { Phase1Inputs, TransportLeg, TransportMode } from "@/lib/types"

interface StepTransportProps {
  inputs: Phase1Inputs
  onUpdate: (updates: Partial<Phase1Inputs>) => void
}

const transportModes = [
  { value: "truck", label: "Truck", description: "Road transport" },
  { value: "rail", label: "Rail", description: "Railway transport" },
  { value: "sea", label: "Sea", description: "Maritime transport" },
  { value: "air", label: "Air", description: "Air transport" }
]

export default function StepTransport({ inputs, onUpdate }: StepTransportProps) {
  const [transportLegs, setTransportLegs] = useState<TransportLeg[]>(inputs.route.transport_inbound || [])

  const addTransportLeg = () => {
    const newLeg: TransportLeg = {
      mode: "truck",
      distance_km: 0
    }
    const newLegs = [...transportLegs, newLeg]
    setTransportLegs(newLegs)
    onUpdate({
      route: {
        ...inputs.route,
        transport_inbound: newLegs
      }
    })
  }

  const removeTransportLeg = (index: number) => {
    const newLegs = transportLegs.filter((_, i) => i !== index)
    setTransportLegs(newLegs)
    onUpdate({
      route: {
        ...inputs.route,
        transport_inbound: newLegs
      }
    })
  }

  const updateTransportLeg = (index: number, field: keyof TransportLeg, value: any) => {
    const newLegs = transportLegs.map((leg, i) =>
      i === index ? { ...leg, [field]: value } : leg
    )
    setTransportLegs(newLegs)
    onUpdate({
      route: {
        ...inputs.route,
        transport_inbound: newLegs
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Transport Legs</h3>
          <p className="text-sm text-gray-600">
            Add transportation legs for inbound materials
          </p>
        </div>
        <Button variant="outline" onClick={addTransportLeg}>
          <Plus className="w-4 h-4 mr-2" />
          Add Leg
        </Button>
      </div>

      {transportLegs.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">No transport legs added yet</p>
            <Button variant="outline" onClick={addTransportLeg}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Transport Leg
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {transportLegs.map((leg, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Transport Leg {index + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeTransportLeg(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Transport Mode</Label>
                    <Select
                      value={leg.mode}
                      onValueChange={(value) => updateTransportLeg(index, "mode", value as TransportMode)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {transportModes.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value}>
                            <div>
                              <div className="font-medium">{mode.label}</div>
                              <div className="text-sm text-gray-500">{mode.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Distance (km)</Label>
                    <Input
                      type="number"
                      value={leg.distance_km}
                      onChange={(e) => updateTransportLeg(index, "distance_km", parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label>Mass (tonnes)</Label>
                    <Input
                      type="number"
                      value={leg.mass_tonnes || ""}
                      onChange={(e) => updateTransportLeg(index, "mass_tonnes", parseFloat(e.target.value) || undefined)}
                      placeholder="Auto"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty to use functional unit mass
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Transport Information</h4>
        <p className="text-sm text-blue-800">
          Add all transportation legs for raw materials and inputs. The system will calculate
          CO2 emissions based on transport mode, distance, and mass. If mass is not specified,
          the functional unit mass will be used automatically.
        </p>
      </div>
    </div>
  )
}
