export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Team WatchMen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re dedicated to helping manufacturers create more sustainable products 
            through comprehensive Life Cycle Assessment tools and methodologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              To democratize access to professional-grade Life Cycle Assessment tools, 
              enabling manufacturers of all sizes to make data-driven decisions about 
              their environmental impact.
            </p>
            <p className="text-lg text-gray-600">
              We believe that sustainable manufacturing isn&apos;t just good for the planet—it&apos;s 
              good for business, driving innovation, reducing costs, and building 
              competitive advantage.
            </p>
          </div>
          <div className="bg-blue-100 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Statistics</h3>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600">Manufacturers Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">10,000+</div>
                <div className="text-gray-600">Assessments Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">25%</div>
                <div className="text-gray-600">Average Impact Reduction</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Scientific Rigor</h3>
              <p className="text-gray-600">
                Our assessments are based on established LCA methodologies and peer-reviewed research
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">User-Friendly</h3>
              <p className="text-gray-600">
                Complex LCA concepts made accessible through intuitive interfaces and guided workflows
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Actionable Insights</h3>
              <p className="text-gray-600">
                We don&apos;t just measure impact—we provide clear recommendations for improvement
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Method & Scope</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">1</span>
                Phase 1: Life Cycle Assessment
              </h3>
              <p className="text-gray-600 mb-4">
                Our Phase 1 LCA covers the complete cradle-to-gate assessment of metal production, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Raw material extraction and processing</li>
                <li>Energy consumption (electricity and fuels)</li>
                <li>Transportation of materials and products</li>
                <li>Manufacturing processes and plant operations</li>
                <li>Waste generation and byproduct management</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                <strong>Impact Categories:</strong> Global Warming Potential (GWP), Energy Consumption, Water Use
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">2</span>
                Phase 2: Circularity Analytics
              </h3>
              <p className="text-gray-600 mb-4">
                Phase 2 extends our analysis with advanced circularity insights:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Sankey flow diagrams for material and energy flows</li>
                <li>Scenario comparison and optimization modeling</li>
                <li>AI-powered data imputation and recommendations</li>
                <li>Circularity scoring and improvement pathways</li>
                <li>Automated report generation and visualization</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                <strong>Status:</strong> Currently under development
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Assumptions & Limitations</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> Our LCA calculations are based on industry-standard emission factors, 
                process data, and regional grid mixes. Results should be considered estimates and may vary based on 
                specific operational conditions, regional variations, and data quality. Users are encouraged to 
                validate critical assumptions and consult with LCA professionals for compliance reporting.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Team</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Team WatchMen is built by a team of environmental scientists, software engineers, 
            and sustainability experts with decades of combined experience in Life Cycle 
            Assessment and sustainable manufacturing. We&apos;re passionate about using 
            technology to solve environmental challenges and help businesses thrive 
            sustainably.
          </p>
        </div>
      </div>
    </div>
  )
}