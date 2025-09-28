# CircuLCA - AI-Driven Life Cycle Assessment Platform

A comprehensive Life Cycle Assessment (LCA) platform designed for sustainable manufacturing, with a focus on metals production and circularity analytics.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Key Dependencies
```json
{
  "next": "^14.2.25",
  "react": "^18.3.1",
  "typescript": "^5.5.4",
  "tailwindcss": "^3.4.15",
  "recharts": "^2.15.4",
  "lucide-react": "^0.468.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.5"
}
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SIH-Prototype
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📋 Platform Overview

### Phase 1: Life Cycle Assessment
**Status: ✅ Production Ready**

Comprehensive cradle-to-gate LCA assessment covering:

#### Core Features
- **Product & Composition Management**
  - Product name and functional unit specification
  - Dynamic composition table with percentage validation
  - Real-time total validation (must sum to 100%)

- **Production Route Configuration**
  - Primary, Secondary, and Hybrid route types
  - Recycled content percentage (for secondary/hybrid routes)
  - Plant yield and byproduct credit settings

- **Energy Profile Analysis**
  - Electricity consumption (kWh per tonne)
  - Grid region selection (IN, EU, US, CN, OTHER)
  - Fuel mix configuration with live validation
  - Onsite renewables and efficiency bonus settings

- **Transportation Modeling**
  - Multiple transport legs with mode selection
  - Distance and mass specifications
  - Support for truck, rail, sea, and air transport

- **AI-Powered Data Completion**
  - Intelligent filling of missing data points
  - Industry-standard defaults and emission factors
  - Smart recommendations based on metal type and route

#### Impact Categories
- **Global Warming Potential (GWP)** - kg CO2e
- **Energy Consumption** - MJ
- **Water Use** - m³

#### Supported Metals
- Aluminium
- Copper  
- Steel

### Phase 2: Circularity Analytics
**Status: 🚧 Under Development**

Advanced analytics and machine learning capabilities:

#### Planned Features
- **Sankey Flow Diagrams** - Interactive material and energy flow visualization
- **Scenario Comparison** - Side-by-side impact analysis
- **AI Data Imputation** - Machine learning for missing data
- **Smart Recommendations** - AI-powered optimization suggestions
- **Circularity Scoring** - Comprehensive circularity metrics
- **Automated Reporting** - PDF report generation

## 🏗️ Architecture

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   ├── lca/               # LCA application
│   │   ├── page.tsx       # Metal selection
│   │   └── [metal]/       # Dynamic metal routes
│   │       ├── page.tsx   # Phase selection
│   │       ├── phase-1/   # Phase 1 assessment
│   │       └── phase-2/   # Phase 2 analytics
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── lca/              # LCA-specific components
└── lib/                  # Utilities and types
    ├── types.ts          # TypeScript definitions
    ├── defaults.ts       # Default values
    ├── calculators.ts    # LCA calculation logic
    └── format.ts         # Formatting utilities
```

### Key Components

#### LCA Step Components
- `StepProductComposition` - Product and material composition
- `StepRoute` - Production route configuration
- `StepEnergy` - Energy profile and fuel mix
- `StepTransport` - Transportation modeling
- `StepReview` - Input validation and review
- `StepRun` - Assessment execution and results
- `ResultsPreview` - Results visualization

#### UI Components
- Modern shadcn/ui component library
- Responsive design with Tailwind CSS
- Accessibility-first approach
- Dark/light mode support

## 🔧 Development

### Code Organization
- **Type Safety** - Full TypeScript implementation
- **Component Architecture** - Modular, reusable components
- **State Management** - React hooks and context
- **Validation** - Real-time form validation
- **Error Handling** - Comprehensive error boundaries

### LCA Calculation Engine
Located in `src/lib/calculators.ts`:

```typescript
// Core calculation functions
validatePercentSum(parts)     // Validate percentage sums
estimateMissing(inputs)       // AI data completion
calcPhase1(inputs)           // Main LCA calculation
```

### Data Models
Located in `src/lib/types.ts`:

```typescript
interface Phase1Inputs {
  product_name: string
  metal: Metal
  functional_unit_kg: number
  composition: CompositionPart[]
  route: ProductionRoute
}

interface Phase1Results {
  gwp_kgco2e: number
  energy_mj: number
  water_m3: number
  hotspots: Hotspot[]
}
```

## 🤖 Machine Learning Integration Points

### Phase 2 ML Features (Future Implementation)

#### 1. Data Imputation
**Location:** `src/lib/calculators.ts`
```typescript
// Current: Basic defaults
export function estimateMissing(inputs: Phase1Inputs): Phase1Inputs

// Future: ML-powered imputation
export function mlEstimateMissing(inputs: Phase1Inputs, model: MLModel): Phase1Inputs
```

#### 2. Scenario Optimization
**Location:** `src/components/lca/StepScenarioCompare.tsx` (to be created)
```typescript
// ML-powered scenario generation
export function generateOptimizedScenarios(
  baseInputs: Phase1Inputs,
  constraints: OptimizationConstraints
): Scenario[]
```

#### 3. Circularity Scoring
**Location:** `src/lib/circularity.ts` (to be created)
```typescript
// AI-powered circularity analysis
export function calculateCircularityScore(
  inputs: Phase1Inputs,
  results: Phase1Results,
  mlModel: CircularityModel
): CircularityScore
```

#### 4. Recommendation Engine
**Location:** `src/lib/recommendations.ts` (to be created)
```typescript
// AI-powered improvement recommendations
export function generateRecommendations(
  inputs: Phase1Inputs,
  results: Phase1Results,
  industryData: IndustryBenchmark[]
): Recommendation[]
```

### ML Model Integration Strategy

#### 1. Model Serving
- **Option A:** REST API integration with external ML service
- **Option B:** Edge functions with ONNX models
- **Option C:** Serverless functions with model inference

#### 2. Data Pipeline
```typescript
// Data preparation for ML models
export function prepareMLData(inputs: Phase1Inputs): MLInput {
  return {
    features: extractFeatures(inputs),
    metadata: {
      metal: inputs.metal,
      route: inputs.route.route,
      region: inputs.route.energy.grid_region
    }
  }
}
```

#### 3. Model Endpoints
```typescript
// API routes for ML services
src/app/api/ml/
├── impute/route.ts          # Data imputation
├── optimize/route.ts        # Scenario optimization
├── circularity/route.ts     # Circularity scoring
└── recommend/route.ts       # Recommendations
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.circulca.com
ML_SERVICE_URL=https://ml.circulca.com
DATABASE_URL=postgresql://...
```

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Demo Mode

The platform includes a comprehensive demo mode accessible via `?demo=1` parameter:

### Demo Data
- **Product:** Al Cable
- **Composition:** 98% Aluminium, 2% Magnesium
- **Route:** Secondary (60% recycled content)
- **Energy:** 1200 kWh/t, India grid
- **Transport:** Truck, 1200 km

### Access Demo
- Landing page: "Try a Sample Project" button
- Services page: "Try Sample Project" button
- Direct URL: `/lca/aluminium/phase-1?demo=1`

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Component documentation
- Test coverage for critical functions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation:** [docs.circulca.com](https://docs.circulca.com)
- **Contact:** [contact@circulca.com](mailto:contact@circulca.com)
- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions

---

**CircuLCA** - Empowering sustainable manufacturing through AI-driven Life Cycle Assessment.