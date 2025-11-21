document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  // Define comprehensive search data covering all site content
  const searchData = [
    {
      title: "Home",
      url: "/",
      content: "The grid is changing faster than the tools built to manage it. We turn energy data chaos into revenue opportunities, giving power producers, utilities, traders, and policymakers the real-time intelligence needed to make distributed power generation profitable and reliable. DER Management, AI + Infrastructure Policy, Research. Ona Energy Management Platform, EnergyAnalyst. Industry Use Cases including O&M Optimization and Insurance & Risk Management.",
      sections: [
        { title: "Choose Your Path", id: "choose-your-path" },
        { title: "Products & Services", id: "products-services" },
        { title: "Industry Use Cases", id: "industry-use-cases" }
      ]
    },
    {
      title: "DER Management",
      url: "/business-users",
      content: "Solutions designed for managing distributed energy resources and optimizing grid integration. Asset Performance Monitoring, Predictive Maintenance, Financial Impact Analysis. Real-time dashboards, performance metrics, alerts and notifications. AI-powered insights, maintenance scheduling, cost optimization.",
      sections: [
        { title: "Asset Performance Monitoring", id: "asset-performance-monitoring" },
        { title: "Predictive Maintenance", id: "predictive-maintenance" },
        { title: "Financial Impact Analysis", id: "financial-impact-analysis" },
        { title: "Getting Started for Business Users", id: "getting-started-for-business-users" },
        { title: "Success Stories", id: "success-stories" }
      ]
    },
    {
      title: "DER Use Cases",
      url: "/use-cases",
      content: "Industry-specific solutions designed to address the unique challenges of distributed energy resource management. O&M Optimization, Insurance & Risk Management, predictive maintenance, work order management, vendor coordination, live monitoring, automated document review, instant parametric payouts.",
      sections: [
        { title: "O&M Optimization", id: "om-optimization" },
        { title: "Insurance & Risk Management", id: "insurance-risk-management" },
        { title: "Implementation Roadmap", id: "implementation-roadmap" },
        { title: "Getting Started", id: "getting-started" }
      ]
    },
    {
      title: "National Policy",
      url: "/national-policy",
      content: "National Policy. Doctrine for local data sovereignty and national security. AI infrastructure policy, regulatory compliance, policy framework.",
      sections: [
        { title: "Overview", id: "overview" }
      ]
    },
    {
      title: "Data Sovereignty",
      url: "/data-sovereignty",
      content: "Data Sovereignty. Local data sovereignty and national security. Data governance, local infrastructure, policy framework.",
      sections: [
        { title: "Overview", id: "overview" }
      ]
    },
    {
      title: "AI & Social Equity",
      url: "/ai-social-equity",
      content: "AI & Social Equity. Social equity in AI infrastructure, policy framework, local infrastructure.",
      sections: [
        { title: "Overview", id: "overview" }
      ]
    },
    {
      title: "Research",
      url: "/research",
      content: "Presentations, papers and open data resources. Research papers, open data datasets, GitHub repositories, academic publications.",
      sections: [
        { title: "Papers", id: "papers" },
        { title: "Open Data", id: "open-data" },
        { title: "GitHub Repos", id: "github-repos" }
      ]
    },
    {
      title: "Media Kit",
      url: "/media",
      content: "Media kit and resources. Webinar recordings, case studies, news articles, press releases, media resources.",
      sections: [
        { title: "In the News", id: "in-the-news" },
        { title: "Webinar Recordings", id: "webinar-recordings" },
        { title: "Case Studies", id: "case-studies" }
      ]
    },
    {
      title: "Legal",
      url: "/legal",
      content: "Legal documentation. Terms of Service, End User License Agreement, Privacy Policy, legal information.",
      sections: []
    },
    {
      title: "Contact",
      url: "/support",
      content: "Get in touch with us for support, sales, or general inquiries. Technical Support, Sales & Business, Emergency Support. Email support, Discord community, phone support.",
      sections: [
        { title: "Contact Information", id: "contact-information" }
      ]
    },
    {
      title: "O&M Optimization",
      url: "/use-cases/oam",
      content: "AI-powered operations and maintenance optimization using the OODA loop methodology. Predictive Maintenance, Performance Optimization, Cost Reduction, Asset Analytics. OODA workflow, automated decision-making, real-time monitoring.",
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
      content: "AI-driven insurance platform with live monitoring and instant parametric payouts. Risk Monitoring, Instant Payouts, Compliance Management, Document Automation. Automated document review, parametric insurance, real-time risk assessment.",
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
      title: "Ona Energy Management Platform",
      url: "https://code.asoba.co",
      content: "AI-powered energy asset management. Command-line interface, automation, OODA workflow. Solar inverter control, battery management, grid integration, load forecasting. Real-time monitoring, performance analytics, predictive maintenance.",
      sections: []
    },
    {
      title: "EnergyAnalyst",
      url: "/products/analyst",
      content: "Regulatory compliance and policy analysis. AI-powered regulatory compliance, policy analysis for energy markets. Compliance checklists, implementation plans, documentation support, audit preparation.",
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
    },
    {
      title: "Products & Services",
      url: "/products",
      content: "Comprehensive energy management solutions. Ona Energy Management Platform, EnergyAnalyst, Distributed Compute. Platform capabilities, integration options, API integration, SDK documentation.",
      sections: [
        { title: "Our Platform", id: "our-platform" },
        { title: "Platform Capabilities", id: "platform-capabilities" },
        { title: "Choose Your Interface", id: "choose-your-interface" },
        { title: "Integration Options", id: "integration-options" }
      ]
    },
    {
      title: "FAQ",
      url: "/faq",
      content: "Frequently asked questions about Ona's energy management platform. Technical questions, business questions, system requirements, pricing, support.",
      sections: [
        { title: "Technical Questions", id: "technical-questions" },
        { title: "Business Questions", id: "business-questions" }
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
      let resultsHtml = '<ul class="search-results-list">';
      results.forEach(result => {
        const titleHtml = result.sectionMatch 
          ? `<strong>${result.title}</strong> <span class="search-section">? ${result.sectionTitle}</span>`
          : `<strong>${result.title}</strong>`;
        resultsHtml += `<li class="search-result-item"><a href="${result.url}">${titleHtml}</a><p class="search-preview">${result.preview}</p></li>`;
      });
      resultsHtml += '</ul>';
      searchResults.innerHTML = resultsHtml;
      searchResults.style.display = 'block';
    } else {
      searchResults.innerHTML = '<p class="no-results">No results found</p>';
      searchResults.style.display = 'block';
    }
  });

  // Enhanced search function that includes sections
  function performSearch(query, data) {
    const results = [];
    const queryWords = query.split(/\s+/).filter(w => w.length > 0);
    
    // Search through each page and its sections
    data.forEach(page => {
      const title = page.title.toLowerCase();
      const content = page.content.toLowerCase();
      
      // Calculate relevance score
      let relevanceScore = 0;
      let sectionMatch = false;
      let matchedSection = null;
      
      // Check title match (highest weight)
      queryWords.forEach(word => {
        if (title.includes(word)) {
          relevanceScore += 10;
        }
        if (content.includes(word)) {
          relevanceScore += 1;
        }
      });
      
      // Check if any section titles match the query
      if (page.sections && page.sections.length > 0) {
        for (const section of page.sections) {
          const sectionTitle = section.title.toLowerCase();
          queryWords.forEach(word => {
            if (sectionTitle.includes(word)) {
              sectionMatch = true;
              matchedSection = section;
              relevanceScore += 5; // Section title match gets bonus
              break;
            }
          });
          if (sectionMatch) break;
        }
      }
      
      // Only include pages with some relevance
      if (relevanceScore > 0) {
        let preview = '';
        let url = page.url;
        
        if (sectionMatch && matchedSection) {
          // If a section matched, use its title and link to the section
          preview = `Found in section: ${matchedSection.title}`;
          url = page.url.startsWith('http') 
            ? page.url 
            : `${page.url}#${matchedSection.id}`;
        } else {
          // Find the best matching content snippet
          let bestMatchIndex = -1;
          let bestMatchLength = 0;
          
          queryWords.forEach(word => {
            const index = content.indexOf(word);
            if (index !== -1) {
              const matchLength = word.length;
              if (matchLength > bestMatchLength) {
                bestMatchIndex = index;
                bestMatchLength = matchLength;
              }
            }
          });
          
          if (bestMatchIndex !== -1) {
            // Get a snippet around the query
            const start = Math.max(0, bestMatchIndex - 50);
            const end = Math.min(content.length, bestMatchIndex + bestMatchLength + 50);
            preview = '...' + content.substring(start, end).replace(/\s+/g, ' ') + '...';
          } else {
            // Use the beginning of the content
            preview = content.substring(0, 120).replace(/\s+/g, ' ') + '...';
          }
        }
        
        results.push({
          title: page.title,
          url: url,
          preview: preview,
          sectionMatch: sectionMatch,
          sectionTitle: sectionMatch ? matchedSection.title : null,
          relevance: relevanceScore
        });
      }
    });
    
    // Sort by relevance (highest first)
    results.sort((a, b) => b.relevance - a.relevance);
    
    // Limit to top 10 results
    return results.slice(0, 10);
  }

  // Close search results when clicking elsewhere
  document.addEventListener('click', function(event) {
    if (!searchResults.contains(event.target) && event.target !== searchInput) {
      searchResults.style.display = 'none';
    }
  });
  
  // Handle keyboard navigation
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      searchResults.style.display = 'none';
      searchInput.blur();
    }
  });
});
