const DiagramNode = ({ icon: Icon, title, subtitle, color, description }) => {
  // In a real app, you'd use the Icon component. Here, we'll just show the title.
  return (
    <div className="diagram-node" style={{ borderTop: `4px solid ${color}` }}>
      <div className="diagram-node-header">
        <h3 className="diagram-node-title">{title}</h3>
        <p className="diagram-node-subtitle">{subtitle}</p>
      </div>
      <p className="diagram-node-description">{description}</p>
    </div>
  );
};

const ConnectionLine = () => <div className="connection-line"></div>;

function ArchitectureDiagram() {
  return (
    <div className="architecture-diagram-container">
      <div className="text-center mb-12">
        <h2 className="text-gray-900 mb-3">Distributed Energy Management Platform</h2>
        <p className="text-gray-600">End-to-End Architecture: From Asset Ingestion to AI-Powered API</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-4">
          <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full mb-6">
            Data Sources
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 mb-2">
          <DiagramNode
            title="Battery Systems"
            subtitle="Real-time metrics"
            color="#10b981"
            description="Monitors battery charge/discharge cycles, state of charge, temperature, and capacity from distributed energy storage systems."
          />
          <DiagramNode
            title="Wind Arrays"
            subtitle="Turbine data"
            color="#3b82f6"
            description="Collects wind speed, turbine RPM, power output, and maintenance status from wind farms across multiple locations."
          />
          <DiagramNode
            title="Solar Arrays"
            subtitle="Panel telemetry"
            color="#f59e0b"
            description="Aggregates solar irradiance, panel voltage/current, efficiency metrics, and inverter performance data."
          />
        </div>

        <ConnectionLine />

        <div className="mb-4">
          <div className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full mb-6">
            Ingestion & ETL Layer
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 mb-2">
          <DiagramNode
            title="Raw Data Extraction"
            subtitle="SQL/API queries"
            color="#8b5cf6"
            description="Directly queries targeted data elements from energy assets via SQL or API calls—no duplicate storage of source data."
          />
          <DiagramNode
            title="ETL Pipeline"
            subtitle="Data transformation"
            color="#6366f1"
            description="Cleanses, validates, and transforms extracted data in real-time without intermediate storage."
          />
          <DiagramNode
            title="Feature Engineering"
            subtitle="ML preparation"
            color="#7c3aed"
            description="Generates statistical features and derived metrics directly from transformed data, feeding the modeling pipeline."
          />
        </div>

        <ConnectionLine />

        <div className="mb-4">
          <div className="inline-block bg-rose-600 text-white px-6 py-2 rounded-full mb-6">
            AI & Modeling
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 mb-2">
          <DiagramNode
            title="ML Models"
            subtitle="Forecasting & optimization"
            color="#dc2626"
            description="Predictive models for energy demand forecasting, renewable generation prediction, and grid optimization."
          />
          <DiagramNode
            title="AI Agents"
            subtitle="Autonomous decision-making"
            color="#e11d48"
            description="Intelligent agents that make real-time decisions on energy routing, storage, and trading based on model outputs."
          />
        </div>

        <ConnectionLine />

        <div className="mb-4">
          <div className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-full mb-6">
            Storage Layer
          </div>
        </div>
        
        <div className="mb-2">
          <DiagramNode
            title="Model Output Store"
            subtitle="Predictions & insights only"
            color="#059669"
            description="Stores only AI model outputs, predictions, and agent decisions—this is the sole data warehouse in the system."
          />
        </div>

        <ConnectionLine />

        <div className="mb-4">
          <div className="inline-block bg-amber-600 text-white px-6 py-2 rounded-full mb-6">
            Access Layer
          </div>
        </div>
        
        <div className="mb-8">
          <DiagramNode
            title="API Gateway"
            subtitle="RESTful & GraphQL endpoints"
            color="#d97706"
            description="Secure, rate-limited API providing access to AI agent insights, predictions, and control commands for external applications."
          />
        </div>
      </div>
    </div>
  );
}
