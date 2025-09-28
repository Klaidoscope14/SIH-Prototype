"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle, AlertCircle, Bot } from "lucide-react"
import type { Phase1Inputs, Metal, RouteType, TransportMode, CompositionPart, TransportLeg } from "@/lib/types"
import { estimateMissing, validatePercentSum } from "@/lib/calculators"

interface Phase1PageProps {
  params: {
    metal: string
  }
}
const metalData: Record<string, { name: string; icon: string }> = {
  aluminium: { name: "Aluminium", icon: "Al" },
  aluminum: { name: "Aluminum", icon: "Al" },
  copper: { name: "Copper", icon: "Cu" },
  steel: { name: "Steel", icon: "Fe" },
  calcium: { name: "Calcium", icon: "Ca" },
  lithium: { name: "Lithium", icon: "Li" }
}

const stepTitles = [
  "Product & Composition",
  "Production Route", 
  "Energy Profile",
  "Transport",
  "Review",
  "Run"
]

const demoResultsData = {
  aluminium: { 
    gwp: 890, 
    energy: 11000, 
    water: 3.1, 
    hotspots: [
      { name: 'Electricity', share: 62 },
      { name: 'Fuels', share: 24 },
      { name: 'Transport', share: 14 }
    ]
  },
  aluminum: { 
    gwp: 890, 
    energy: 11000, 
    water: 3.1, 
    hotspots: [
      { name: 'Electricity', share: 62 },
      { name: 'Fuels', share: 24 },
      { name: 'Transport', share: 14 }
    ]
  },
  copper: { 
    gwp: 1250, 
    energy: 9200, 
    water: 4.8, 
    hotspots: [
      { name: 'Electricity', share: 45 },
      { name: 'Fuels', share: 35 },
      { name: 'Transport', share: 20 }
    ]
  },
  steel: { 
    gwp: 1750, 
    energy: 14500, 
    water: 6.2, 
    hotspots: [
      { name: 'Electricity', share: 30 },
      { name: 'Fuels', share: 55 },
      { name: 'Transport', share: 15 }
    ]
  },
  calcium: { 
    gwp: 420, 
    energy: 5800, 
    water: 2.1, 
    hotspots: [
      { name: 'Electricity', share: 40 },
      { name: 'Fuels', share: 45 },
      { name: 'Transport', share: 15 }
    ]
  },
  lithium: { 
    gwp: 2100, 
    energy: 18500, 
    water: 8.5, 
    hotspots: [
      { name: 'Electricity', share: 70 },
      { name: 'Fuels', share: 15 },
      { name: 'Transport', share: 15 }
    ]
  }
}

const getDemoData = (metal: Metal): Phase1Inputs => {
  const baseData = {
    functional_unit_kg: 1000,
    route: {
      route: "secondary" as RouteType,
      plant_yield_pct: 92,
      energy: {
        electricity_kwh_per_t: 1200,
        fuel_mix_pct: {
          natural_gas: 50,
          coal: 30,
          oil: 10,
          lpg: 5,
          other: 5
        },
        grid_region: "IN" as const,
        onsite_renewables_pct: 0
      },
      transport_inbound: [
        {
          mode: "truck" as TransportMode,
          distance_km: 1200
        }
      ]
    }
  }

  switch (metal) {
    case 'aluminium':
    case 'aluminum':
      return {
        ...baseData,
        product_name: "Al Cable",
        metal: metal,
        composition: [
          { component: "Aluminium", percent: 98 },
          { component: "Magnesium", percent: 2 }
        ],
        route: {
          ...baseData.route,
          recycled_content_pct: 60
        }
      }
    
    case 'calcium':
      return {
        ...baseData,
        product_name: "Calcium Carbonate Powder",
        metal: metal,
        composition: [
          { component: "Calcium Carbonate", percent: 95 },
          { component: "Magnesium Carbonate", percent: 3 },
          { component: "Other Impurities", percent: 2 }
        ],
        route: {
          ...baseData.route,
          recycled_content_pct: 25,
          plant_yield_pct: 81,
          energy: {
            ...baseData.route.energy,
            electricity_kwh_per_t: 500,
            fuel_mix_pct: {
              natural_gas: 40,
              coal: 30,
              oil: 20,
              lpg: 5,
              other: 5
            }
          }
        }
      }
    
    case 'lithium':
      return {
        ...baseData,
        product_name: "Lithium Carbonate Battery Grade",
        metal: metal,
        composition: [
          { component: "Lithium Carbonate", percent: 99.5 },
          { component: "Sodium", percent: 0.3 },
          { component: "Potassium", percent: 0.2 }
        ],
        route: {
          ...baseData.route,
          recycled_content_pct: 35,
          plant_yield_pct: 77,
          energy: {
            ...baseData.route.energy,
            electricity_kwh_per_t: 1050,
            fuel_mix_pct: {
              natural_gas: 25,
              coal: 7.5,
              oil: 7.5,
              lpg: 5,
              other: 55
            },
            onsite_renewables_pct: 30
          }
        }
      }
    
    default:
      return {
        ...baseData,
        product_name: "Metal Product",
        metal: metal,
        composition: [
          { component: metalData[metal]?.name || "Metal", percent: 100 }
        ],
        route: {
          ...baseData.route,
          recycled_content_pct: 0
        }
      }
  }
}

export default function Phase1Page({ params }: Phase1PageProps) {
  const { metal } = params
  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === '1'
  
  const [currentStep, setCurrentStep] = useState(1)
  const [showDemoResults, setShowDemoResults] = useState(false)
  const [inputs, setInputs] = useState<Phase1Inputs>(() => {
    if (isDemo) {
      return getDemoData(metal as Metal)
    }
    return {
      product_name: "",
      metal: metal as Metal,
      functional_unit_kg: 1000,
      composition: [
        { component: metalData[metal]?.name || "Metal", percent: 100 }
      ],
      route: {
        route: "primary" as RouteType,
        plant_yield_pct: 85,
        energy: {
          electricity_kwh_per_t: null,
          fuel_mix_pct: {
            natural_gas: 0,
            coal: 0,
            oil: 0,
            lpg: 0,
            other: 0
          },
          grid_region: "EU",
          onsite_renewables_pct: 0
        },
        transport_inbound: []
      }
    }
  })

  const totalSteps = 6

  useEffect(() => {
    if (currentStep === 6) {
      setShowDemoResults(true)
    }
  }, [currentStep])

  const handleInputChange = (field: string, value: unknown) => {
    setInputs(prev => {
      const newInputs = { ...prev }
      const keys = field.split('.')
      let current: unknown = newInputs
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (typeof current === 'object' && current !== null) {
          current = (current as Record<string, unknown>)[keys[i]]
        }
      }
      if (typeof current === 'object' && current !== null) {
        (current as Record<string, unknown>)[keys[keys.length - 1]] = value as unknown as never
      }
      
      return newInputs
    })
  }

  const handleCompositionChange = <K extends keyof CompositionPart>(index: number, field: K, value: CompositionPart[K]) => {
    setInputs(prev => ({
      ...prev,
      composition: prev.composition.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const addCompositionPart = () => {
    setInputs(prev => ({
      ...prev,
      composition: [...prev.composition, { component: "", percent: 0 }]
    }))
  }

  const removeCompositionPart = (index: number) => {
    setInputs(prev => ({
      ...prev,
      composition: prev.composition.filter((_, i) => i !== index)
    }))
  }

  const addTransportLeg = () => {
    setInputs(prev => ({
      ...prev,
      route: {
        ...prev.route,
        transport_inbound: [
          ...(prev.route.transport_inbound || []),
          { mode: "truck" as TransportMode, distance_km: 0 }
        ]
      }
    }))
  }

  const handleTransportChange = <K extends keyof TransportLeg>(index: number, field: K, value: TransportLeg[K]) => {
    setInputs(prev => ({
      ...prev,
      route: {
        ...prev.route,
        transport_inbound: (prev.route.transport_inbound || []).map((leg, i) =>
          i === index ? { ...leg, [field]: value } : leg
        )
      }
    }))
  }

  const removeTransportLeg = (index: number) => {
    setInputs(prev => ({
      ...prev,
      route: {
        ...prev.route,
        transport_inbound: (prev.route.transport_inbound || []).filter((_, i) => i !== index)
      }
    }))
  }

  const handleAIFill = () => {
    const estimated = estimateMissing(inputs)
    setInputs(estimated)
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return inputs.product_name.trim() !== "" && 
               inputs.composition.length > 0 &&
               inputs.composition.every(c => c.component.trim() !== "" && c.percent > 0)
      case 2:
        return inputs.route.plant_yield_pct > 0 && inputs.route.plant_yield_pct <= 100
      case 3:
        return Object.values(inputs.route.energy.fuel_mix_pct).some(v => v > 0)
      case 4:
        return true // Transport is optional
      case 5:
        return validatePercentSum(inputs.composition.map(c => ({ label: c.component, value: c.percent }))).ok
      default:
        return true
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetAssessment = () => {
    setCurrentStep(1)
    setShowDemoResults(false)
    // Reset inputs to initial state
    setInputs(() => {
      if (isDemo) {
        return getDemoData(metal as Metal)
      }
      return {
        product_name: "",
        metal: metal as Metal,
        functional_unit_kg: 1000,
        composition: [
          { component: metalData[metal]?.name || "Metal", percent: 100 }
        ],
        route: {
          route: "primary" as RouteType,
          plant_yield_pct: 85,
          energy: {
            electricity_kwh_per_t: null,
            fuel_mix_pct: {
              natural_gas: 0,
              coal: 0,
              oil: 0,
              lpg: 0,
              other: 0
            },
            grid_region: "EU",
            onsite_renewables_pct: 0
          },
          transport_inbound: []
        }
      }
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        const compositionTotal = validatePercentSum(inputs.composition.map(c => ({ label: c.component, value: c.percent })))
        return (
          <div className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="product_name" className="text-base font-semibold text-slate-800">Product Name</Label>
              <Input
                id="product_name"
                value={inputs.product_name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("product_name", e.target.value)}
                placeholder="Enter product name"
                className="h-12 text-base rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-slate-800">Composition</Label>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  compositionTotal.ok 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {compositionTotal.total.toFixed(1)}%
                </div>
              </div>
              <div className="space-y-4">
                {inputs.composition.map((part, index) => (
                  <div key={index} className="flex gap-4 items-end p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex-1">
                      <Input
                        value={part.component}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCompositionChange(index, "component", e.target.value)}
                        placeholder="Component name"
                        className="h-11 rounded-lg border-2 focus:border-blue-500"
                      />
                    </div>
                    <div className="w-28">
                      <Input
                        type="number"
                        value={part.percent}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCompositionChange(index, "percent", parseFloat(e.target.value) || 0)}
                        placeholder="%"
                        className="h-11 rounded-lg border-2 focus:border-blue-500"
                      />
                    </div>
                    {inputs.composition.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCompositionPart(index)}
                        className="h-11 px-4 rounded-lg border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  onClick={addCompositionPart}
                  className="w-full h-12 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-600"
                >
                  + Add Component
                </Button>
              </div>
              {!compositionTotal.ok && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-700 font-medium">
                    Composition percentages must sum to exactly 100%
                  </p>
                </div>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="route">Production Route</Label>
              <select
                id="route"
                value={inputs.route.route}
                onChange={(e) => handleInputChange("route.route", e.target.value as RouteType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="primary">Primary (Mined)</option>
                <option value="secondary">Secondary (Recycled)</option>
                <option value="hybrid">Hybrid (Mixed)</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="yield">Plant Yield (%)</Label>
              <Input
                id="yield"
                type="number"
                value={inputs.route.plant_yield_pct}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("route.plant_yield_pct", parseFloat(e.target.value) || 0)}
                placeholder="85"
              />
            </div>

            <div>
              <Label htmlFor="recycled_content">Recycled Content (%)</Label>
              <Input
                id="recycled_content"
                type="number"
                value={inputs.route.recycled_content_pct || 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("route.recycled_content_pct", parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>
        )

      case 3:
        const fuelTotal = Object.values(inputs.route.energy.fuel_mix_pct).reduce((sum, val) => sum + val, 0)
        const fuelMixValid = Math.abs(fuelTotal - 100) < 0.1
        return (
          <div className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="electricity" className="text-base font-semibold text-slate-800">Electricity (kWh per tonne)</Label>
              <Input
                id="electricity"
                type="number"
                value={inputs.route.energy.electricity_kwh_per_t || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("route.energy.electricity_kwh_per_t", parseFloat(e.target.value) || null)}
                placeholder="Leave empty for AI estimation"
                className="h-12 text-base rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="grid_region" className="text-base font-semibold text-slate-800">Grid Region</Label>
              <select
                id="grid_region"
                value={inputs.route.energy.grid_region}
                onChange={(e) => handleInputChange(
                  "route.energy.grid_region",
                  e.target.value as Phase1Inputs['route']['energy']['grid_region']
                )}
                className="w-full h-12 px-4 text-base border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option value="EU">European Union</option>
                <option value="US">United States</option>
                <option value="CN">China</option>
                <option value="IN">India</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-slate-800">Fuel Mix (%)</Label>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  fuelMixValid 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {fuelTotal.toFixed(1)}%
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(inputs.route.energy.fuel_mix_pct).map(([fuel, value]) => (
                  <div key={fuel} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <Label htmlFor={fuel} className="text-sm font-medium text-slate-700 capitalize mb-2 block">
                      {fuel.replace('_', ' ')}
                    </Label>
                    <Input
                      id={fuel}
                      type="number"
                      value={value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(`route.energy.fuel_mix_pct.${fuel}`, parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="h-11 rounded-lg border-2 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
              {!fuelMixValid && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-700 font-medium">
                    Fuel mix percentages must sum to exactly 100%
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="renewables" className="text-base font-semibold text-slate-800">Onsite Renewables (%)</Label>
              <Input
                id="renewables"
                type="number"
                value={inputs.route.energy.onsite_renewables_pct}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("route.energy.onsite_renewables_pct", parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="h-12 text-base rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Label>Transport Legs</Label>
              <Button variant="outline" onClick={addTransportLeg}>
                Add Transport Leg
              </Button>
            </div>
            
            <div className="space-y-3">
              {(inputs.route.transport_inbound || []).map((leg, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Mode</Label>
                        <select
                          value={leg.mode}
                          onChange={(e) => handleTransportChange(index, "mode", e.target.value as TransportMode)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="truck">Truck</option>
                          <option value="rail">Rail</option>
                          <option value="sea">Sea</option>
                          <option value="air">Air</option>
                        </select>
                      </div>
                      <div>
                        <Label>Distance (km)</Label>
                        <Input
                          type="number"
                          value={leg.distance_km}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTransportChange(index, "distance_km", parseFloat(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label>Mass (tonnes)</Label>
                        <Input
                          type="number"
                          value={leg.mass_tonnes || ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTransportChange(index, "mass_tonnes", parseFloat(e.target.value) || undefined)}
                          placeholder="Auto"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeTransportLeg(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Your Inputs</CardTitle>
                <CardDescription>
                  Please review all the information before running the assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <strong>Product:</strong> {inputs.product_name}
                </div>
                <div>
                  <strong>Metal:</strong> {metalData[metal]?.name}
                </div>
                <div>
                  <strong>Functional Unit:</strong> {inputs.functional_unit_kg} kg
                </div>
                <div>
                  <strong>Composition:</strong>
                  <ul className="ml-4">
                    {inputs.composition.map((part, i) => (
                      <li key={i}>{part.component}: {part.percent}%</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Route:</strong> {inputs.route.route}
                </div>
                <div>
                  <strong>Yield:</strong> {inputs.route.plant_yield_pct}%
                </div>
                <div>
                  <strong>Grid Region:</strong> {inputs.route.energy.grid_region}
                </div>
                <div>
                  <strong>Transport Legs:</strong> {inputs.route.transport_inbound?.length || 0}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 6:
        const demoData = demoResultsData[metal as keyof typeof demoResultsData] || demoResultsData.aluminium
        
        return (
          <div className="space-y-6">
            {!showDemoResults ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Assessment Complete
                  </CardTitle>
                  <CardDescription>
                    Your Phase 1 assessment has been completed successfully
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The assessment results are now available. You can proceed to Phase 2 for advanced analytics and AI-powered insights.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      Phase-1 Results
                    </CardTitle>
                    <CardDescription>
                      Environmental impact assessment for {metalData[metal]?.name || metal}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <div className="text-sm font-medium text-blue-700 mb-1">
                            Global Warming Potential
                          </div>
                          <div className="text-2xl font-bold text-blue-900">
                            {demoData.gwp.toLocaleString()} kg CO₂e
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-orange-50 border-orange-200">
                        <CardContent className="p-4">
                          <div className="text-sm font-medium text-orange-700 mb-1">
                            Energy Consumption
                          </div>
                          <div className="text-2xl font-bold text-orange-900">
                            {demoData.energy.toLocaleString()} MJ
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-cyan-50 border-cyan-200">
                        <CardContent className="p-4">
                          <div className="text-sm font-medium text-cyan-700 mb-1">
                            Water Usage
                          </div>
                          <div className="text-2xl font-bold text-cyan-900">
                            {demoData.water} m³
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-slate-800">Impact Hotspots</h4>
                      <div className="space-y-2">
                        {demoData.hotspots.map((hotspot, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="font-medium text-slate-700">{hotspot.name}</span>
                            <div className="flex items-center gap-3">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${hotspot.share}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold text-slate-600 min-w-[50px] text-right">
                                {hotspot.share}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild
                    className="h-12 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  >
                    <Link href={`/lca/${metal}/phase-2`}>
                      Proceed to Phase-2
                    </Link>
                  </Button>
                  
                  <Button 
                    onClick={resetAssessment}
                    variant="outline"
                    className="h-12 px-8 rounded-xl border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Run Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-slate-600">
            <li><Link href="/lca" className="hover:text-slate-900 transition-colors">LCA</Link></li>
            <li>/</li>
            <li><Link href={`/lca/${metal}`} className="hover:text-slate-900 transition-colors">{metalData[metal]?.name}</Link></li>
            <li>/</li>
            <li className="text-slate-900 font-semibold">Phase 1 - Data Collection</li>
          </ol>
        </nav>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {isDemo && (
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-900">
                  Demo Mode: Sample data loaded for &quot;Al Cable&quot; project
                </span>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                This is a pre-filled example to help you understand the LCA process. You can modify any values.
              </p>
            </div>
          )}

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-base font-semibold text-slate-800">
                Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
              </span>
              <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {currentStep < 5 && (
            <div className="mb-8">
              <Button 
                variant="outline" 
                onClick={handleAIFill} 
                className="flex items-center gap-2 h-12 px-6 rounded-xl border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
              >
                <Bot className="w-5 h-5" />
                AI-Fill Missing Data
              </Button>
            </div>
          )}

          <div className="mb-8">
            {renderStep()}
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-slate-200">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="h-12 px-6 rounded-xl border-2 border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            {currentStep < 5 ? (
              <Button
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className="h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            ) : currentStep === 5 ? (
              <Button 
                onClick={nextStep}
                className="h-12 px-8 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                Run Assessment
              </Button>
            ) : (
              <Link href={`/lca/${metal}/phase-2`}>
                <Button className="h-12 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  Proceed to Phase 2
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-sm">
          <h3 className="text-xl font-semibold text-blue-900 mb-3">Need Help?</h3>
          <p className="text-blue-800 mb-6 leading-relaxed">
            If you&#39;re unsure about any of the information requested, our experts can help you gather the necessary data. 
            We also provide industry benchmarks and best practices to guide your assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Contact Support →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 transition-colors font-medium"
            >
              Learn More About LCA
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}