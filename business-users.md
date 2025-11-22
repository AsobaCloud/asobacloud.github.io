---
title: "Data Governance"
layout: default
nav_order: 2
parent: "Data Governance"
---

# Data Governance

## From Manual Processing to Automated Intelligence

The core need for large DER asset owners is an automated pipeline that eliminates manual data processing for analytics usage, ensures model freshness, and provides production-grade APIs—all while maintaining audit compliance and minimizing storage costs.

In today’s energy landscape, data is the most valuable asset. However, it’s often trapped in disparate systems, requiring manual, error-prone processes to make it usable. This manual effort is not only a drain on resources but also a significant barrier to realizing the full potential of AI. A robust, automated data platform is the foundation upon which true AI-driven insights are built. It allows businesses to move from reactive analysis to proactive, automated decision-making, enabling them to efficiently implement the advice the AI provides and unlock new revenue opportunities.

<div id="architecture-diagram-container"></div>

{% raw %}
<script type="text/babel">
// SVG Icon Components (matching Lucide icons)
const BatteryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2"/>
    <line x1="22" y1="11" x2="22" y2="13"/>
    <line x1="6" y1="11" x2="6" y2="13"/>
    <line x1="10" y1="11" x2="10" y2="13"/>
    <line x1="14" y1="11" x2="14" y2="13"/>
  </svg>
);

const WindIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/>
    <path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/>
    <path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/>
    <path d="m19.07 4.93-1.41 1.41"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
    <path d="M3 12a9 3 0 0 0 18 0"/>
  </svg>
);

const GitBranchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M18 9a9 9 0 0 1-9 9"/>
  </svg>
);

const WorkflowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="6" height="6" rx="1"/>
    <rect x="15" y="3" width="6" height="6" rx="1"/>
    <rect x="9" y="15" width="6" height="6" rx="1"/>
    <path d="M6 9v3a1 1 0 0 0 1 1h4"/>
    <path d="M18 9v3a1 1 0 0 1-1 1h-4"/>
    <path d="M12 13v2"/>
  </svg>
);

const CpuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <path d="M9 1v3"/>
    <path d="M15 1v3"/>
    <path d="M9 20v3"/>
    <path d="M15 20v3"/>
    <path d="M20 9h3"/>
    <path d="M20 14h3"/>
    <path d="M1 9h3"/>
    <path d="M1 14h3"/>
  </svg>
);

const BrainCircuitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"/>
    <path d="M16 8V5c0-1.1.9-2 2-2"/>
    <path d="M12 13h4"/>
    <path d="M12 18h6a2 2 0 0 1 2 2v1"/>
    <path d="M12 8h8"/>
    <path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
    <path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
    <path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
    <path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
  </svg>
);

const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="6" rx="1"/>
    <rect x="16" y="16" width="6" height="6" rx="1"/>
    <rect x="2" y="16" width="6" height="6" rx="1"/>
    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
    <path d="M12 12V8"/>
  </svg>
);

const DiagramNode = ({ icon: Icon, title, subtitle, color, description }) => {
  return (
    <div className="diagram-node" style={{ borderTop: `4px solid ${color}` }}>
      <div className="diagram-node-header">
        {Icon && (
          <div className="diagram-node-icon" style={{ color: color }}>
            <Icon />
          </div>
        )}
        <h3 className="diagram-node-title">{title}</h3>
        <p className="diagram-node-subtitle">{subtitle}</p>
      </div>
      <p className="diagram-node-description">{description}</p>
    </div>
  );
};

const ConnectionLine = ({ color = "#64748b", animated = false }) => (
  <div className={`connection-line-container ${animated ? 'animated' : ''}`}>
    <div className="connection-line-arrow" style={{ backgroundColor: color }}>
      <div className="connection-arrow-head" style={{ borderTopColor: color }}></div>
    </div>
    {animated && <div className="connection-flow-dot"></div>}
  </div>
);

function ArchitectureDiagram() {
  return (
    <div className="architecture-diagram-container">
      <div className="text-center mb-12">
        <h2 className="text-gray-900 mb-3">Distributed Energy Management Platform</h2>
        <p className="text-gray-600">End-to-End Architecture: From Asset Ingestion to AI-Powered API</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-4">
          <div className="layer-badge bg-blue-600 text-white px-6 py-2 rounded-full mb-6">
            Data Sources
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-2">
          <DiagramNode icon={BatteryIcon} title="Battery Systems" subtitle="Real-time metrics" color="#10b981" description="Monitors battery charge/discharge cycles, state of charge, temperature, and capacity from distributed energy storage systems." />
          <DiagramNode icon={WindIcon} title="Wind Arrays" subtitle="Turbine data" color="#3b82f6" description="Collects wind speed, turbine RPM, power output, and maintenance status from wind farms across multiple locations." />
          <DiagramNode icon={SunIcon} title="Solar Arrays" subtitle="Panel telemetry" color="#f59e0b" description="Aggregates solar irradiance, panel voltage/current, efficiency metrics, and inverter performance data." />
        </div>

        <ConnectionLine color="#64748b" animated={true} />

        <div className="mb-4">
          <div className="layer-badge bg-purple-600 text-white px-6 py-2 rounded-full mb-6">
            Ingestion & ETL Layer
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-2">
          <DiagramNode icon={DatabaseIcon} title="Raw Data Extraction" subtitle="SQL/API queries" color="#8b5cf6" description="Directly queries targeted data elements from energy assets via SQL or API calls—no duplicate storage of source data." />
          <DiagramNode icon={GitBranchIcon} title="ETL Pipeline" subtitle="Data transformation" color="#6366f1" description="Cleanses, validates, and transforms extracted data in real-time without intermediate storage." />
          <DiagramNode icon={WorkflowIcon} title="Feature Engineering" subtitle="ML preparation" color="#7c3aed" description="Generates statistical features and derived metrics directly from transformed data, feeding the modeling pipeline." />
        </div>

        <ConnectionLine color="#64748b" animated={true} />

        <div className="mb-4">
          <div className="layer-badge bg-rose-600 text-white px-6 py-2 rounded-full mb-6">
            AI & Modeling
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-2">
          <DiagramNode icon={CpuIcon} title="ML Models" subtitle="Forecasting & optimization" color="#dc2626" description="Predictive models for energy demand forecasting, renewable generation prediction, and grid optimization." />
          <DiagramNode icon={BrainCircuitIcon} title="AI Agents" subtitle="Autonomous decision-making" color="#e11d48" description="Intelligent agents that make real-time decisions on energy routing, storage, and trading based on model outputs." />
        </div>

        <ConnectionLine color="#64748b" animated={true} />

        <div className="mb-4">
          <div className="layer-badge bg-emerald-600 text-white px-6 py-2 rounded-full mb-6">
            Storage Layer
          </div>
        </div>

        <div className="mb-2">
          <DiagramNode icon={ServerIcon} title="Model Output Store" subtitle="Predictions & insights only" color="#059669" description="Stores only AI model outputs, predictions, and agent decisions—this is the sole data warehouse in the system." />
        </div>

        <ConnectionLine color="#64748b" animated={true} />

        <div className="mb-4">
          <div className="layer-badge bg-amber-600 text-white px-6 py-2 rounded-full mb-6">
            Access Layer
          </div>
        </div>

        <div className="mb-8">
          <DiagramNode icon={NetworkIcon} title="API Gateway" subtitle="RESTful & GraphQL endpoints" color="#d97706" description="Secure, rate-limited API providing access to AI agent insights, predictions, and control commands for external applications." />
        </div>

        <div className="data-flow-indicator">
          <div className="flow-pulse-dot"></div>
          <span className="flow-text">Data extracted on-demand, transformed in pipeline, modeled, and only outputs stored</span>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(
  <ArchitectureDiagram />,
  document.getElementById('architecture-diagram-container')
);
</script>
{% endraw %}

---

## Clean & Model Platform Foundation

Our platform is built on two core pillars that provide a solid foundation for your data and AI strategy.

<div class="foundation-cards">
  <div class="foundation-card">
    <h3>Zero-Duplication Data Pipeline</h3>
    <div class="card-section">
      <h4>The Challenge</h4>
      <p>Traditional data pipelines often create multiple copies of the same data, leading to increased storage costs, data consistency issues, and a complex, difficult-to-manage data landscape.</p>
    </div>
    <div class="card-section">
      <h4>Our Solution</h4>
      <p>We've engineered a "zero-duplication" data pipeline that is both efficient and cost-effective. A nightly cleaner lambda function pulls only the 24-hour delta from your inverters or company data lake. This new data is then processed using an adaptive, CPU-only interpolation method and appended to a single, versioned Parquet dataset. The raw historian is never copied, and the cleaned data is up to 8 times smaller than the original, significantly reducing storage costs and simplifying data management.</p>
    </div>
  </div>
  <div class="foundation-card">
    <h3>Model Registry & Feature API</h3>
    <div class="card-section">
      <h4>The Challenge</h4>
      <p>Deploying and managing machine learning models in a production environment is a complex task. Models can become stale, and there's often a disconnect between the data used for training and the data used for inference.</p>
    </div>
    <div class="card-section">
      <h4>Our Solution</h4>
      <p>Our platform includes a comprehensive model registry and feature API to streamline the entire MLOps lifecycle. When model drift exceeds a predefined threshold, models are automatically retrained, and the new artifacts are pushed to storage. All model training metrics are recorded, and metadata is saved to a records table, providing a complete audit trail. The feature API then serves these feature streams to both AI agents and user-facing front-end applications, ensuring that your models are always fresh and your applications are always powered by the latest insights.</p>
    </div>
  </div>
</div>

---

## Platform Position in Your Data Flow

<div class="pipeline-container">
  <div class="pipeline-row">
    <div class="pipeline-step">
      <div class="step-number">01</div>
      <div class="step-content">
        <h4>Raw SCADA → PI-Historian → Extract via SQL or JSON</h4>
        <p>Existing data collection infrastructure remains unchanged, ingest is agnostic to format</p>
      </div>
    </div>
    <div class="pipeline-arrow">→</div>
    <div class="pipeline-step">
      <div class="step-number">02</div>
      <div class="step-content">
        <h4>Clean & Model Service Landing Zone</h4>
        <p>Delta extraction point where the new platform integrates, missing data backfilled via interpolation models</p>
      </div>
    </div>
    <div class="pipeline-arrow">→</div>
    <div class="pipeline-step">
      <div class="step-number">03</div>
      <div class="step-content">
        <h4>Cleaned Parquet → On-Demand Training</h4>
        <p>Versioned, partitioned dataset feeds automated retraining workflows</p>
      </div>
    </div>
  </div>
  <div class="pipeline-row">
    <div class="pipeline-step">
      <div class="step-number">04</div>
      <div class="step-content">
        <h4>Model Artifacts → Flat File Registry</h4>
        <p>Centralized model versioning and storage with full lineage</p>
      </div>
    </div>
    <div class="pipeline-arrow">→</div>
    <div class="pipeline-step">
      <div class="step-number">05</div>
      <div class="step-content">
        <h4>Insights Surfaced via API to User Interface</h4>
        <p>Production functions pull latest models at cold-start for live predictions</p>
      </div>
    </div>
  </div>
</div>

