"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Phase1Inputs, EnergyProfile } from "@/lib/types"

interface StepEnergyProps {
  inputs: Phase1Inputs
  onUpdate: (updates: Partial<Phase1Inputs>) => void
}

const gridRegions = [
  { value: "EU", label: "European Union" },
  { value: "US", label: "United States" },
  { value: "CN", label: "China" },
  { value: "IN", label: "India" },
  { value: "OTHER", label: "Other" }
]

const fuelTypes = [
  { key: "natural_gas", label: "Natural Gas", color: "bg-blue-500" },
  { key: "coal", label: "Coal", color: "bg-gray-600" },
  { key: "oil", label: "Oil", color: "bg-black" },
  { key: "lpg", label: "LPG", color: "bg-orange-500" },
  { key: "other", label: "Other", color: "bg-purple-500" }
]

export default function StepEnergy({ inputs, onUpdate }: StepEnergyProps) {
  const [electricity, setElectricity] = useState(inputs.route.energy.electricity_kwh_per_t)
  const [gridRegion, setGridRegion] = useState(inputs.route.energy.grid_region)
  const [fuelMix, setFuelMix] = useState(inputs.route.energy.fuel_mix_pct)
  const [renewables, setRenewables] = useState(inputs.route.energy.onsite_renewables_pct)
  const [efficiency, setEfficiency] = useState(inputs.route.energy.efficiency_bonus_pct || 0)

  const handleElectricityChange = (value: number | null) => {
    setElectricity(value)
    onUpdate({
      route: {
        ...inputs.route,
        energy: {
          ...inputs.route.energy,
          electricity_kwh_per_t: value
        }
      }
    })
  }

  const handleGridRegionChange = (value: string) => {
    setGridRegion(value as EnergyProfile['grid_region'])
    onUpdate({
      route: {
        ...inputs.route,
        energy: {
          ...inputs.route.energy,
          grid_region: value as EnergyProfile['grid_region']
        }
      }
    })
  }

  const handleFuelMixChange = (fuelType: string, value: number) => {
    const newFuelMix = { ...fuelMix, [fuelType]: value }
    setFuelMix(newFuelMix)
    onUpdate({
      route: {
        ...inputs.route,
        energy: {
          ...inputs.route.energy,
          fuel_mix_pct: newFuelMix
        }
      }
    })
  }

  const handleRenewablesChange = (value: number) => {
    setRenewables(value)
    onUpdate({
      route: {
        ...inputs.route,
        energy: {
          ...inputs.route.energy,
          onsite_renewables_pct: value
        }
      }
    })
  }

  const handleEfficiencyChange = (value: number) => {
    setEfficiency(value)
    onUpdate({
      route: {
        ...inputs.route,
        energy: {
          ...inputs.route.energy,
          efficiency_bonus_pct: value
        }
      }
    })
  }

  const fuelTotal = Object.values(fuelMix).reduce((sum, value) => sum + value, 0)
  const isFuelTotalValid = Math.abs(fuelTotal - 100) < 0.1

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="electricity">Electricity Consumption (kWh per tonne)</Label>
        <Input
          id="electricity"
          type="number"
          value={electricity || ""}
          onChange={(e) => handleElectricityChange(parseFloat(e.target.value) || null)}
          placeholder="Leave empty for AI estimation"
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave empty to use AI-estimated values based on metal type and route
        </p>
      </div>

      <div>
        <Label htmlFor="grid_region">Grid Region</Label>
        <Select value={gridRegion} onValueChange={handleGridRegionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select grid region" />
          </SelectTrigger>
          <SelectContent>
            {gridRegions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">
          Used for grid electricity emission factors
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center justify-between">
            Fuel Mix (%)
            <Badge variant={isFuelTotalValid ? "default" : "destructive"}>
              Total: {fuelTotal.toFixed(1)}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fuelTypes.map((fuel) => (
            <div key={fuel.key}>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm">{fuel.label}</Label>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${fuel.color}`}></div>
                  <Input
                    type="number"
                    value={fuelMix[fuel.key as keyof typeof fuelMix]}
                    onChange={(e) => handleFuelMixChange(fuel.key, parseFloat(e.target.value) || 0)}
                    className="w-20 text-center"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              </div>
              <Slider
                value={[fuelMix[fuel.key as keyof typeof fuelMix]]}
                onValueChange={([value]) => handleFuelMixChange(fuel.key, value)}
                max={100}
                step={0.1}
                className="w-full"
              />
            </div>
          ))}
          {!isFuelTotalValid && (
            <p className="text-sm text-red-600">
              Fuel mix percentages must sum to 100%
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Renewable Energy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Onsite Renewables (%)</Label>
            <div className="space-y-3">
              <Slider
                value={[renewables]}
                onValueChange={([value]) => handleRenewablesChange(value)}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">0%</span>
                <Input
                  type="number"
                  value={renewables}
                  onChange={(e) => handleRenewablesChange(parseFloat(e.target.value) || 0)}
                  className="w-20 text-center"
                  min="0"
                  max="100"
                />
                <span className="text-sm text-gray-500">100%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Percentage of electricity from onsite renewable sources
            </p>
          </div>

          <div>
            <Label>Efficiency Bonus (%)</Label>
            <div className="space-y-3">
              <Slider
                value={[efficiency]}
                onValueChange={([value]) => handleEfficiencyChange(value)}
                max={20}
                step={0.1}
                className="w-full"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">0%</span>
                <Input
                  type="number"
                  value={efficiency}
                  onChange={(e) => handleEfficiencyChange(parseFloat(e.target.value) || 0)}
                  className="w-20 text-center"
                  min="0"
                  max="20"
                  step="0.1"
                />
                <span className="text-sm text-gray-500">20%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Optional efficiency improvement bonus
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
