document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  // Define comprehensive search data covering all site content
  const searchData = [
    {
      title: "Energy Forecasting Made Simple",
      url: "/",
      content: "See how Ona's platform transforms solar asset management in just 2 minutes. Welcome to the Ona API Platform! Here's how you can get started with onboarding and integrating our powerful API into your systems. You have the option of accessing Ona's capabilities via our On-Demand web app, or by embedding the API directly within your own technology stack.",
      sections: [
        { title: "Watch the Demo", id: "watch-the-demo" },
        { title: "Choose Your Path", id: "choose-your-path" },
        { title: "Products & Services", id: "products-services" },
        { title: "Industry Use Cases", id: "industry-use-cases" },
        { title: "Quick Start Options", id: "quick-start-options" },
        { title: "Python Quickstart", id: "python-quickstart" },
        { title: "SDK Quickstart", id: "sdk-quickstart" },
        { title: "REST API Quickstart", id: "api-quickstart" }
      ]
    },
    {
      title: "Business Users",
      url: "/business-users",
      content: "Solutions designed for solar asset owners, O&M teams, and energy managers who need to optimize performance and maximize returns. Asset Performance Monitoring, Predictive Maintenance, Financial Impact Analysis.",
      sections: [
        { title: "Asset Performance Monitoring", id: "asset-performance-monitoring" },
        { title: "Predictive Maintenance", id: "predictive-maintenance" },
        { title: "Financial Impact Analysis", id: "financial-impact-analysis" },
        { title: "Getting Started for Business Users", id: "getting-started-business-users" },
        { title: "Success Stories", id: "success-stories" }
      ]
    },
    {
      title: "FAQ",
      url: "/faq",
      content: "Find answers to the most common questions about Ona's energy management platform. Technical Questions, Business Questions, Distributed Compute Questions, Support Information.",
      sections: [
        { title: "Technical Questions", id: "technical-questions" },
        { title: "Business Questions", id: "business-questions" },
        { title: "Distributed Compute Questions", id: "distributed-compute-questions" },
        { title: "Support Information", id: "support-information" }
      ]
    },
    {
      title: "Help & Support",
      url: "/support",
      content: "Get the help you need to make the most of Ona's energy management platform. Quick Help, Contact Support, Documentation & Resources, System Status, Training & Education.",
      sections: [
        { title: "Quick Help", id: "quick-help" },
        { title: "Contact Support", id: "contact-support" },
        { title: "Documentation & Resources", id: "documentation-resources" },
        { title: "System Status", id: "system-status" },
        { title: "Training & Education", id: "training-education" },
        { title: "Feedback & Feature Requests", id: "feedback-feature-requests" }
      ]
    },
    {
      title: "Use Cases",
      url: "/use-cases",
      content: "Industry-specific solutions designed to address the unique challenges of solar energy management. O&M Optimization, Insurance & Risk Management, Implementation Roadmap.",
      sections: [
        { title: "O&M Optimization", id: "om-optimization" },
        { title: "Insurance & Risk Management", id: "insurance-risk-management" },
        { title: "Implementation Roadmap", id: "implementation-roadmap" },
        { title: "Getting Started", id: "getting-started" }
      ]
    },
    {
      title: "O&M Optimization",
      url: "/use-cases/oam",
      content: "AI-powered operations and maintenance optimization for solar assets using the OODA loop methodology. The OODA Loop Methodology, Asset Management, AI-Assisted Analysis, Economic Optimization.",
      sections: [
        { title: "The OODA Loop Methodology", id: "ooda-loop-methodology" },
        { title: "Key Use Case Scenarios", id: "key-use-case-scenarios" },
        { title: "Asset Management", id: "asset-management" },
        { title: "AI-Assisted Analysis", id: "ai-assisted-analysis" },
        { title: "Economic Optimization", id: "economic-optimization" },
        { title: "Integration Capabilities", id: "integration-capabilities" },
        { title: "Performance Metrics", id: "performance-metrics" }
      ]
    },
    {
      title: "Insurance & Risk Management",
      url: "/use-cases/insurance",
      content: "AI-driven insurance platform for solar assets with live monitoring, automated document review, and instant parametric payouts. Business Problem, How the System Works, Business Impact & ROI.",
      sections: [
        { title: "Business Problem", id: "business-problem" },
        { title: "How the System Works", id: "how-system-works" },
        { title: "Business Impact & ROI", id: "business-impact-roi" },
        { title: "Key Features", id: "key-features" },
        { title: "Integration Capabilities", id: "integration-capabilities" },
        { title: "Use Case Scenarios", id: "use-case-scenarios" }
      ]
    },
    {
      title: "Products & Services",
      url: "/products",
      content: "Comprehensive energy management solutions designed for different user types and use cases. Our Platform, Platform Capabilities, Choose Your Interface, Integration Options.",
      sections: [
        { title: "Our Platform", id: "our-platform" },
        { title: "Platform Capabilities", id: "platform-capabilities" },
        { title: "Choose Your Interface", id: "choose-your-interface" },
        { title: "Integration Options", id: "integration-options" },
        { title: "Getting Started", id: "getting-started" },
        { title: "Pricing & Plans", id: "pricing-plans" }
      ]
    },
    {
      title: "Ona Terminal",
      url: "/products/terminal",
      content: "AI-powered command-line interface for energy asset management with OODA workflow capabilities. Overview, Key Features, Getting Started, Core Commands, Configuration, Use Cases, Advanced Features.",
      sections: [
        { title: "Overview", id: "overview" },
        { title: "Key Features", id: "key-features" },
        { title: "Getting Started", id: "getting-started" },
        { title: "Core Commands", id: "core-commands" },
        { title: "Configuration", id: "configuration" },
        { title: "Use Cases", id: "use-cases" },
        { title: "Advanced Features", id: "advanced-features" }
      ]
    },
    {
      title: "EnergyAnalyst",
      url: "/products/analyst",
      content: "AI-powered regulatory compliance and policy analysis for energy markets. Overview, Key Capabilities, Model Architecture, Performance Metrics, Getting Started, Use Cases, Example Analysis.",
      sections: [
        { title: "Overview", id: "overview" },
        { title: "Key Capabilities", id: "key-capabilities" },
        { title: "Model Architecture", id: "model-architecture" },
        { title: "Performance Metrics", id: "performance-metrics" },
        { title: "Getting Started", id: "getting-started" },
        { title: "Use Cases", id: "use-cases" },
        { title: "Example Analysis", id: "example-analysis" },
        { title: "Limitations", id: "limitations" }
      ]
    }
  ];

  // Handle search input
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    
    // Clear results if query is empty
    if (!query) {
      searchResults.innerHTML = '';
      searchResults.style.display = 'none';
      return;
    }

    // Perform search
    const results = performSearch(query, searchData);
    
    // Display results
    if (results.length > 0) {
      let resultsHtml = '<ul>';
      results.forEach(result => {
        resultsHtml += `<li><a href="${result.url}">${result.title}</a>: ${result.preview}</li>`;
      });
      resultsHtml += '</ul>';
      searchResults.innerHTML = resultsHtml;
      searchResults.style.display = 'block';
    } else {
      searchResults.innerHTML = '<p>No results found</p>';
      searchResults.style.display = 'block';
    }
  });

  // Enhanced search function that includes sections
  function performSearch(query, data) {
    const results = [];
    
    // Search through each page and its sections
    data.forEach(page => {
      const title = page.title.toLowerCase();
      const content = page.content.toLowerCase();
      const pageMatch = title.includes(query) || content.includes(query);
      let sectionMatch = false;
      let matchedSection = null;
      
      // Check if any section titles match the query
      if (page.sections) {
        for (const section of page.sections) {
          if (section.title.toLowerCase().includes(query)) {
            sectionMatch = true;
            matchedSection = section;
            break;
          }
        }
      }
      
      if (pageMatch || sectionMatch) {
        let preview = '...';
        let url = page.url;
        
        if (sectionMatch && matchedSection) {
          // If a section matched, use its title and link to the section
          preview = `Found in section: ${matchedSection.title}`;
          url = `${page.url}#${matchedSection.id}`;
        } else if (pageMatch) {
          // If main content matched, find the relevant snippet
          let previewIndex = content.indexOf(query);
          
          if (previewIndex !== -1) {
            // Get a snippet around the query
            const start = Math.max(0, previewIndex - 40);
            const end = Math.min(content.length, previewIndex + query.length + 40);
            preview += content.substring(start, end) + '...';
          } else {
            // If query is not found in content but title matched, use the beginning
            preview += content.substring(0, 80) + '...';
          }
        }
        
        results.push({
          title: page.title + (sectionMatch ? ` > ${matchedSection.title}` : ''),
          url: url,
          preview: preview
        });
      }
    });
    
    return results;
  }

  // Close search results when clicking elsewhere
  document.addEventListener('click', function(event) {
    if (!searchResults.contains(event.target) && event.target !== searchInput) {
      searchResults.style.display = 'none';
    }
  });
}); 